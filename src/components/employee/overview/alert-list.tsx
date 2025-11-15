"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, DollarSign, Repeat } from "lucide-react";

type AlertStatus = "ACTIVE" | "RESOLVED";

export interface AlertItem {
  id: string;
  type: "ABSENCE" | "PAYROLL" | "CONTRACT" | "SHIFT";
  message: string;
  date: Date;
  status: AlertStatus;
}

interface AlertListProps {
  alerts: AlertItem[];
  onResolve?: (id: string) => void;
  onAction?: (id: string, type: AlertItem["type"]) => void;
}

export const AlertList = ({ alerts, onResolve, onAction }: AlertListProps) => {
  const filter = alerts[0].status || "ACTIVE";

  const getIcon = (type: AlertItem["type"]) => {
    switch (type) {
      case "ABSENCE":
        return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
      case "PAYROLL":
        return <DollarSign className="text-green-500 w-5 h-5" />;
      case "CONTRACT":
        return <Clock className="text-blue-500 w-5 h-5" />;
      case "SHIFT":
        return <Repeat className="text-purple-500 w-5 h-5" />;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-3 pt-3">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No alerts found.</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between border rounded-xl p-3 hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-3">
                {getIcon(alert.type)}
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {alert.date.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    alert.status === "ACTIVE" ? "destructive" : "secondary"
                  }
                >
                  {alert.status === "ACTIVE" ? "ACTIVE" : "RESOLVED"}
                </Badge>

                {alert.status === "ACTIVE" && (
                  <>
                    {alert.type === "PAYROLL" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAction?.(alert.id, alert.type)}
                      >
                        Pay Now
                      </Button>
                    )}
                    {alert.type === "SHIFT" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAction?.(alert.id, alert.type)}
                      >
                        Reassign
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => onResolve?.(alert.id)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Resolve
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
