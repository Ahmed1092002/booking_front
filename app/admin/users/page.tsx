"use client";

import { useState, useEffect } from "react";
import { getAllUsersAction } from "@/actions/admin";
import { User } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Badge from "@/components/ui/Badge";
import {
  Users as UsersIcon,
  Shield,
  ShoppingBag,
  User as UserIcon,
} from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function UsersPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const result = await getAllUsersAction();

    if (result.success && result.data) {
      setUsers(result.data);
    } else {
      showToast(result.error || "Failed to load users", "error");
    }

    setLoading(false);
  };

  const getRoleBadge = (roles: string[]) => {
    if (roles.includes("ROLE_ADMIN")) {
      return (
        <Badge variant="error">
          <Shield className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    }
    if (roles.includes("ROLE_SELLER")) {
      return (
        <Badge variant="secondary">
          <ShoppingBag className="h-3 w-3 mr-1" />
          Seller
        </Badge>
      );
    }
    return (
      <Badge variant="success">
        <UserIcon className="h-3 w-3 mr-1" />
        Customer
      </Badge>
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">
          View and manage all system users
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className="card-base p-12 text-center">
          <UsersIcon className="h-12 w-12 mx-auto mb-3 text-neutral-400" />
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-neutral-900">
                        {user.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.roles)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
