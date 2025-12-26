"use client";

import { useState, useEffect } from "react";
import { getAuditLogsAction } from "@/actions/admin";
import { AuditLog } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Badge from "@/components/ui/Badge";
import { Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function AuditLogsPage() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    const result = await getAuditLogsAction();

    if (result.success && result.data) {
      setLogs(result.data.content || []);
    } else {
      showToast(result.error || "Failed to load audit logs", "error");
    }

    setLoading(false);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">
          Monitor system activity and changes
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!loading && logs.length === 0 && (
        <div className="card-base p-12 text-center">
          <Shield className="h-12 w-12 mx-auto mb-3 text-neutral-400" />
          <p className="text-muted-foreground">No audit logs found</p>
        </div>
      )}

      {!loading && logs.length > 0 && (
        <div className="card-base">
          <div className="divide-y divide-neutral-200">
            {logs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-neutral-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">{log.action}</Badge>
                      <span className="text-sm text-muted-foreground">
                        by {log.userName || `User #${log.userId}`}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 mb-2">
                      {log.details || "No details available"}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
