import { cookies } from "next/headers";
import {Toaster} from "react-hot-toast"
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import ReactQueryClientProvider from "@/components/providers/query-client-provider";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/providers/theme-provider";
// import { ActiveThemeProvider } from "@/components/active-theme";

export const metadata: Metadata = {
  title: "Grappine Dashboard | AI Farm Management",
  description:
    "A smart dashboard powered by Grappine AI to monitor, automate, and manage your poultry farm. Real time insights, digital record keeping, and better decision making in one place.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : ""
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          {/* <ActiveThemeProvider initialTheme={activeThemeValue}> */}
          <ReactQueryClientProvider>
            <Toaster/>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "calc(var(--spacing) * 72)",
                  "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
              }
            >
              <AppSidebar variant="inset" />
              <SidebarInset>
                <SiteHeader />
                {children}
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </ReactQueryClientProvider>
          {/* </ActiveThemeProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
