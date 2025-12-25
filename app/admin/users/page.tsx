import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getAllUsersAction } from "@/actions/admin";
import { User as UserIcon, Shield, ShoppingBag } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    redirect("/");
  }

  const result = await getAllUsersAction();
  const users = result.data || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          User Management
        </h1>

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="p-6 font-semibold text-neutral-600">User</th>
                <th className="p-6 font-semibold text-neutral-600">Email</th>
                <th className="p-6 font-semibold text-neutral-600">Roles</th>
                <th className="p-6 font-semibold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="p-6 font-medium text-neutral-900">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {u.fullName.charAt(0)}
                      </div>
                      {u.fullName}
                    </div>
                  </td>
                  <td className="p-6 text-neutral-600">{u.email}</td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      {u.roles.map((role) => (
                        <Badge
                          key={role}
                          variant={
                            role === "ROLE_ADMIN"
                              ? "error"
                              : role === "ROLE_SELLER"
                              ? "warning"
                              : "info"
                          }
                        >
                          {role.replace("ROLE_", "")}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-6">
                    {/* Add edit/delete actions if API supports it */}
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-12 text-center text-neutral-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
