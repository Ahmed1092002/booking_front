"use client";

import { useState, useEffect } from "react";
import {
  getAllDiscountCodesAction,
  createDiscountCodeAction,
} from "@/actions/admin";
import { DiscountCode, CreateDiscountCodeDto } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Badge from "@/components/ui/Badge";
import { Tag, Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function DiscountsPage() {
  const { showToast } = useToast();
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateDiscountCodeDto>({
    code: "",
    discountPercent: 0,
    expiryDate: "",
  });

  useEffect(() => {
    loadDiscounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDiscounts = async () => {
    setLoading(true);
    const result = await getAllDiscountCodesAction();

    if (result.success && result.data) {
      setDiscounts(result.data);
    } else {
      showToast(result.error || "Failed to load discount codes", "error");
    }

    setLoading(false);
  };

  const handleCreate = async () => {
    if (!formData.code || formData.discountPercent <= 0) {
      showToast("Please fill all fields correctly", "error");
      return;
    }

    setCreating(true);
    const result = await createDiscountCodeAction(formData);

    if (result.success) {
      showToast("Discount code created successfully!", "success");
      setShowForm(false);
      setFormData({ code: "", discountPercent: 0, expiryDate: "" });
      loadDiscounts();
    } else {
      showToast(result.error || "Failed to create discount code", "error");
    }

    setCreating(false);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discount Codes</h1>
          <p className="text-muted-foreground">
            Manage promotional discount codes
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          icon={<Plus className="h-5 w-5" />}
        >
          {showForm ? "Cancel" : "Create Code"}
        </Button>
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Discount Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                placeholder="e.g., SUMMER2024"
                value={formData.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="percentage">Discount %</Label>
              <Input
                id="percentage"
                type="number"
                placeholder="10"
                value={formData.discountPercent || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercent: Number(e.target.value),
                  })
                }
                min="1"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>
          </div>
          <Button
            onClick={handleCreate}
            disabled={creating}
            icon={<Plus className="h-5 w-5" />}
          >
            {creating ? "Creating..." : "Create Code"}
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!loading && discounts.length === 0 && (
        <div className="card-base p-12 text-center">
          <Tag className="h-12 w-12 mx-auto mb-3 text-neutral-400" />
          <p className="text-muted-foreground">No discount codes yet</p>
        </div>
      )}

      {!loading && discounts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discounts.map((discount) => (
            <div key={discount.id} className="card-base p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{discount.code}</h3>
                  <Badge variant="success">
                    {discount.discountPercent}% OFF
                  </Badge>
                </div>
                <Tag className="h-6 w-6 text-primary-600" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Expires:{" "}
                    {new Date(discount.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
