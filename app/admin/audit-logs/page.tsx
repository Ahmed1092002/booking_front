import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getAuditLogsAction } from "@/actions/admin";
import { format } from "date-fns";

export default async function AuditLogsPage() {
  const user = await getCurrentUser();
  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    redirect("/");
  }

  const result = await getAuditLogsAction();
  const logs = result.data?.content || [];

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          System Audit Logs
        </h1>

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-neutral-600">
                  Timestamp
                </th>
                <th className="p-4 text-sm font-semibold text-neutral-600">
                  User
                </th>
                <th className="p-4 text-sm font-semibold text-neutral-600">
                  Action
                </th>
                <th className="p-4 text-sm font-semibold text-neutral-600">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50 text-sm">
                  <td className="p-4 text-neutral-500 font-mono">
                    {format(new Date(log.timestamp), "MMM dd HH:mm:ss")}
                  </td>
                  <td className="p-4 font-medium text-neutral-900">
                    {log.userName}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-neutral-100 rounded text-neutral-700 font-medium">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600 max-w-md truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-neutral-500">
                    No audit logs available.
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
