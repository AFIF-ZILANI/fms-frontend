"use client";

import * as React from "react";
import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  MdDashboard, // Overview
  MdAnalytics, // Production & Growth Analytics
  MdOutlineAttachMoney, // Financial Overview
  MdHealthAndSafety, // Alerts & Health Monitoring
  MdOutlineBatchPrediction, // Batch Management
  MdInventory2, // Inventory & Resource Tracking
  MdOutlineFileDownload, // Reports & Data Export
  MdLocalHospital,
  MdPeopleOutline,
  MdStoreMallDirectory,
} from "react-icons/md";
import { FaUserTie } from "react-icons/fa"; // professional-looking employee
import { HiOutlineUserGroup } from "react-icons/hi2";

const data = {
  user: {
    name: "AFIF ZILANI",
    email: "afifzilani4566@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: MdDashboard,
    },
    {
      title: "Performance Analytics",
      url: "/performance-analytics",
      icon: MdAnalytics,
    },
    {
      title: "Financial Summary",
      url: "/financial-summary",
      icon: MdOutlineAttachMoney,
    },
    {
      title: "Farm Health",
      url: "farm-health",
      icon: MdHealthAndSafety,
    },
    {
      title: "Batch Management",
      url: "batch-management",
      icon: MdOutlineBatchPrediction,
    },
    {
      title: "Inventory & Resources",
      url: "inventory-and-resources",
      icon: MdInventory2,
    },
    {
    title: "Employee",
    url: "employee",
    icon: FaUserTie,
  },
    {
    title: "Doctors",
    url: "doctors",
    icon: MdLocalHospital,
  },
  {
    title: "Suppliers",
    url: "suppliers",
    icon: MdStoreMallDirectory,
  },
  {
    title: "Customers",
    url: "customers",
    icon: HiOutlineUserGroup,
  },
    {
      title: "Reports",
      url: "reports",
      icon: MdOutlineFileDownload,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
