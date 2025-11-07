"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";
import clsx from "clsx";

interface NavProps {
  items: { title: string; url: string; icon?: IconType }[];
}

export function NavMain({ items }: NavProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === `/${item.url}` ||
              pathname.startsWith(`/${item.url}/`);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => router.push(`/${item.url}`)}
                  className={clsx(
                    "flex hover:cursor-pointer items-center gap-2 px-3 py-2 rounded-md transition-all duration-150",
                    isActive
                      ? " shadow-md"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
