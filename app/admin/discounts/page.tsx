"use client";

import { useState, useEffect } from "react";
import {
  getAllDiscountCodesAction,
  createDiscountCodeAction,
} from "@/actions/admin";
import { DiscountCode, CreateDiscountCodeDto } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { Plus, Tag } from "lucide-react";
import { format } from "date-fns";

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadDiscounts = async () => {
    setLoading(true);
    const result = await getAllDiscountCodesAction();
    if (result.success && result.data) {
      setDiscounts(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const formData = new FormData(e.currentTarget);
    const data: CreateDiscountCodeDto = {
      code: formData.get("code") as string,
      discountPercent: Number(formData.get("discountPercent")),
      expiryDate: formData.get("expiryDate") as string,
    };

    const result = await createDiscountCodeAction(data);
    if (result.success) {
      setShowForm(false);
      loadDiscounts();
    } else {
      alert(result.error);
    }
    setCreating(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Discount Codes
          </h1>
          <Button icon={<Plus />} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Create New"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-soft mb-8 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create Discount Code</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input name="code" label="Code (e.g. SUMMER2025)" required />
              <Input
                name="discountPercent"
                type="number"
                label="Discount %"
                min="1"
                max="100"
                required
              />
              <Input
                name="expiryDate"
                type="date"
                label="Expiry Date"
                required
              />
              <Button type="submit" loading={creating} className="w-full">
                Create Code
              </Button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="p-6 text-sm font-semibold text-neutral-600">
                  Code
                </th>
                <th className="p-6 text-sm font-semibold text-neutral-600">
                  Discount
                </th>
                <th className="p-6 text-sm font-semibold text-neutral-600">
                  Expiry
                </th>
                <th className="p-6 text-sm font-semibold text-neutral-600">
                  Status
                </th>
                <th className="p-6 text-sm font-semibold text-neutral-600">
                  Usage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {discounts.map((d) => (
                <tr key={d.id} className="hover:bg-neutral-50">
                  <td className="p-6 font-mono font-bold text-primary-600">
                    {d.code}
                  </td>
                  <td className="p-6 font-medium">{d.discountPercent}% OFF</td>
                  <td className="p-6 text-neutral-600">
                    {format(new Date(d.expiryDate), "MMM dd, yyyy")}
                  </td>
                  <td className="p-6">
                    <Badge variant={d.isActive ? "success" : "error"}>
                      {d.isActive ? "Active" : "Expired"}
                    </Badge>
                  </td>
                  <td className="p-6 text-neutral-600">{d.usageCount} uses</td>
                </tr>
              ))}
              {discounts.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-neutral-500">
                    No discount codes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
