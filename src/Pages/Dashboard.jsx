import React from "react";
import { SectionCards } from "@/Layouts/section-cards";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <SectionCards />
        </div>
    );
}
