"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Clock, FileText, UserPlus, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function EmployeeQuickActions() {
  const [open, setOpen] = React.useState(false);

  const actions = [
    {
      label: "Add Employee",
      icon: UserPlus,
      onClick: () => console.log("Open Add Employee Modal"),
    },
    {
      label: "Run Payroll",
      icon: CreditCard,
      href: "/payroll",
    },
    {
      label: "Manage Shifts",
      icon: Clock,
      href: "/employees/shifts",
    },
    {
      label: "Generate Report",
      icon: FileText,
      onClick: () => console.log("Open Generate Report Modal"),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Floating Action Buttons */}
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-300",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const delay = `${(actions.length - idx) * 75}ms`;

          const ButtonEl = (
            <Button
              key={action.label}
              size="sm"
              variant="secondary"
              className="shadow-md flex items-center gap-2"
              style={{ animationDelay: delay }}
              onClick={() => {
                setOpen(false);
                action.onClick?.();
              }}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Button>
          );

          return action.href ? (
            <Link
              key={action.label}
              href={action.href}
              onClick={() => setOpen(false)}
            >
              {ButtonEl}
            </Link>
          ) : (
            ButtonEl
          );
        })}
      </div>

      {/* Main FAB */}
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-transform duration-300",
          open
            ? "rotate-45 bg-destructive hover:bg-destructive/90"
            : "bg-primary hover:bg-primary/90"
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <Plus className="h-6 w-6 text-black" />
        )}
      </Button>
    </div>
  );
}
