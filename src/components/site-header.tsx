"use client";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
// import { ThemeSelector } from "./theme-selector"

const headerConfig: Record<string, { buttonText: string; url: string }> = {
  "/batch-management": {
    buttonText: "Add new Batch",
    url: "/batch-management/new",
  },
  "/stock-management": {
    buttonText: "Add new Stock",
    url: "/stock-management/new",
  },
  "/doctors": {
    buttonText: "Add new Doctor",
    url: "/doctors/new",
  },
  "/customers": {
    buttonText: "Add new Customer",
    url: "/customers/new",
  },
  "/suppliers": {
    buttonText: "Add new Supplier",
    url: "/suppliers/new",
  },
  "/employee": {
    buttonText: "Add new Employee",
    url: "/employee/new",
  },
  "/inventory-and-resources": {
    buttonText: "Add new Item",
    url: "/inventory-and-resources/new",
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const config = headerConfig[pathname] || {};
  return (
    <header className=" sticky top-0 z-40 bg-background rounded-tl-2xl flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-2">
          {config.buttonText && config.url && (
            <Link href={config.url} className="inline-block">
              <Button className="cursor-pointer" variant={"outline"}>
                Add New
              </Button>
            </Link>
          )}
          {/* <ThemeSelector/> */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
