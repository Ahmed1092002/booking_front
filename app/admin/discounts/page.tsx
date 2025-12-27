"use client";

import { useState, useEffect, useCallback } from "react";
import { Tag, Plus, Trash2, Edit, Power, Search } from "lucide-react";
import {
  getAllDiscountCodesAction,
  createDiscountCodeAction,
  updateDiscountCodeAction,
  deleteDiscountCodeAction,
  toggleDiscountCodeStatusAction,
} from "@/actions/admin";
import { useToast } from "@/hooks/useToast";
import Button from "@/components/ui/Button";
import { DiscountCode, CreateDiscountCodeDto } from "@/types";
import { format, isPast, addDays } from "date-fns";

export default function AdminDiscountsPage() {
  const { showToast } = useToast();
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [filteredCodes, setFilteredCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const loadCodes = useCallback(async () => {
    setLoading(true);
    const result = await getAllDiscountCodesAction();

    if (result.success && result.data) {
      setCodes(result.data);
      setFilteredCodes(result.data);
    } else {
      showToast(result.error || "Failed to load discount codes", "error");
    }

    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    loadCodes();
  }, [loadCodes]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = codes.filter(
        (code) =>
          code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (code.description?.toLowerCase() || "").includes(
            searchQuery.toLowerCase()
          )
      );
      setFilteredCodes(filtered);
    } else {
      setFilteredCodes(codes);
    }
  }, [searchQuery, codes]);

  const handleCreate = async (data: CreateDiscountCodeDto) => {
    const result = await createDiscountCodeAction(data);

    if (result.success) {
      showToast("Discount code created!", "success");
      setShowModal(false);
      loadCodes();
    } else {

      showToast(result.error || "Failed to create code", "error");
    }
  };

  const handleUpdate = async (id: number, data: CreateDiscountCodeDto) => {
    const result = await updateDiscountCodeAction(id, data);

    if (result.success) {
      showToast("Discount code updated!", "success");
      setShowModal(false);
      setEditingCode(null);
      loadCodes();
    } else {
      showToast(result.error || "Failed to update code", "error");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deleteDiscountCodeAction(id);

    if (result.success) {
      showToast("Discount code deleted!", "success");
      setDeleteConfirm(null);
      loadCodes();
    } else {
      showToast(result.error || "Failed to delete code", "error");
    }
  };

  const handleToggleStatus = async (id: number) => {
    const result = await toggleDiscountCodeStatusAction(id);

    if (result.success) {
      showToast("Status updated!", "success");
      loadCodes();
    } else {
      showToast(result.error || "Failed to toggle status", "error");
    }
  };

  const getCodeStatus = (code: DiscountCode) => {
    if (!code.active) return { label: "Inactive", color: "text-neutral-500" };
    if (isPast(new Date(code.validUntil)))
      return { label: "Expired", color: "text-red-600" };
    if (code.maxUses > 0 && code.currentUses >= code.maxUses)
      return { label: "Used Up", color: "text-orange-600" };
    return { label: "Active", color: "text-green-600" };
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discount Codes</h1>
            <p className="text-muted-foreground">
              Manage promotional discount codes
            </p>
          </div>
          <Button
            icon={<Plus className="h-5 w-5" />}
            onClick={() => {
              setEditingCode(null);
              setShowModal(true);
            }}
          >
            Create Code
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code or description..."
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : filteredCodes.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No codes found" : "No discount codes yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="p-4 text-left font-semibold">Code</th>
                    <th className="p-4 text-left font-semibold">Description</th>
                    <th className="p-4 text-left font-semibold">Type</th>
                    <th className="p-4 text-left font-semibold">Value</th>
                    <th className="p-4 text-left font-semibold">
                      Valid Period
                    </th>
                    <th className="p-4 text-left font-semibold">Usage</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCodes.map((code) => {
                    const status = getCodeStatus(code);
                    const remainingUses =
                      code.maxUses > 0
                        ? code.maxUses - code.currentUses
                        : "Unlimited";

                    return (
                      <tr
                        key={code.id}
                        className="border-t hover:bg-neutral-50"
                      >
                        <td className="p-4">
                          <span className="font-mono font-semibold text-primary-600">
                            {code.code}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-neutral-600 max-w-xs truncate">
                          {code.description || "—"}
                        </td>
                        <td className="p-4">
                          <span className="text-sm px-2 py-1 bg-neutral-100 rounded">
                            {code.type === "PERCENTAGE" ? "%" : "$"}
                          </span>
                        </td>
                        <td className="p-4 font-semibold">
                          {code.type === "PERCENTAGE"
                            ? `${code.discountValue}%`
                            : `$${code.discountValue}`}
                        </td>
                        <td className="p-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-neutral-600">
                              {format(new Date(code.validFrom), "MMM dd, yyyy")}
                            </div>
                            <div
                              className={
                                isPast(new Date(code.validUntil))
                                  ? "text-red-600"
                                  : "text-neutral-600"
                              }
                            >
                              {format(
                                new Date(code.validUntil),
                                "MMM dd, yyyy"
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-neutral-900 font-medium">
                              {code.currentUses} used
                            </div>
                            <div className="text-neutral-500">
                              {remainingUses} left
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-sm font-medium ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleStatus(code.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                code.active
                                  ? "text-green-600 hover:bg-green-50"
                                  : "text-neutral-400 hover:bg-neutral-100"
                              }`}
                              title={code.active ? "Deactivate" : "Activate"}
                            >
                              <Power className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingCode(code);
                                setShowModal(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(code.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showModal && (
          <CodeModal
            code={editingCode}
            onClose={() => {
              setShowModal(false);
              setEditingCode(null);
            }}
            onSubmit={(data) => {
              if (editingCode) {
                handleUpdate(editingCode.id, data);
              } else {
                handleCreate(data);
              }
            }}
          />
        )}

        {deleteConfirm && (
          <DeleteConfirmModal
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </div>
    </div>
  );
}

function CodeModal({
  code,
  onClose,
  onSubmit,
}: {
  code: DiscountCode | null;
  onClose: () => void;
  onSubmit: (data: CreateDiscountCodeDto) => void;
}) {
  const [formData, setFormData] = useState<CreateDiscountCodeDto>({
    code: code?.code || "",
    description: code?.description || "",
    type: code?.type || "PERCENTAGE",
    value: code?.discountValue || 10,
    validFrom: code?.validFrom || format(new Date(), "yyyy-MM-dd"),
    validUntil:
      code?.validUntil || format(addDays(new Date(), 30), "yyyy-MM-dd"),
    maxUses: code?.maxUses || 0,
    minBookingAmount: code?.minBookingAmount || 0,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {code ? "Edit Discount Code" : "Create Discount Code"}
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="SUMMER2024"
                className="w-full px-4 py-2 border rounded-lg font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "PERCENTAGE" | "FIXED_AMOUNT",
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED_AMOUNT">Fixed Amount</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Summer sale discount"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Value * ({formData.type === "PERCENTAGE" ? "%" : "$"})
              </label>
              <input
                type="number"
                value={formData.value || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    value: Number(e.target.value),
                  })
                }
                min="0"
                max={formData.type === "PERCENTAGE" ? "100" : undefined}
                step={formData.type === "PERCENTAGE" ? "1" : "0.01"}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Min Booking Amount ($)
              </label>
              <input
                type="number"
                value={formData.minBookingAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minBookingAmount: Number(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                placeholder="0 (no minimum)"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Valid From *
              </label>
              <input
                type="date"
                value={formData.validFrom}
                onChange={(e) =>
                  setFormData({ ...formData, validFrom: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Valid Until *
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({ ...formData, validUntil: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Max Uses (0 = unlimited)
            </label>
            <input
              type="number"
              value={formData.maxUses || ""}
              onChange={(e) =>
                setFormData({ ...formData, maxUses: Number(e.target.value) })
              }
              min="0"
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={() => onSubmit(formData)} className="flex-1">
              {code ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-2">Delete Discount Code?</h3>
        <p className="text-neutral-600 mb-6">
          This action cannot be undone. The discount code will be permanently
          deleted.
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
