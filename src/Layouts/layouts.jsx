import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/Layouts/app-sidebar";
import { SiteHeader } from "@/Layouts/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layouts() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "calc(var(--spacing) * 80)",
                "--header-height": "calc(var(--spacing) * 12)",
            }}
        >
            
            <AppSidebar variant="inset" />

            
            <SidebarInset>
                <SiteHeader /> 
                <main className="flex flex-1 flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
                    <Outlet /> 
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
