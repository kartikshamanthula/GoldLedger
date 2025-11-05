import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layouts from "@/Layouts/layouts"
import Dashboard from "@/Pages/Dashboard"
import Items from "@/Pages/Items/Items"
import ItemsGroups from "@/Pages/Items/ItemsGroups"
import ItemsUnits from "@/Pages/Items/ItemsUnits"
import Years  from "@/Pages/Years/Years"

export function Router() {
  return (
    <Routes>
      <Route element={<Layouts />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        //Dashboard Routes
        <Route path="/dashboard" element={<Dashboard />} />
        
        //Items Routes
        <Route path="/items" element={<Items />} />
        <Route path="/items-groups" element={<ItemsGroups />} />
        <Route path="/items-units" element={<ItemsUnits />} />

        //years Routes
        <Route path="/years" element={<Years />} />


        //Vouchers Routes



        //Jobwork Routes


        //Order Routes


        //Quotations Routes


        //Payments Routes


        //Receipts Routes



        //Ledgers Routes


        //Transfers Routes


        //Reports Routes


        //Gst Routes


        //Team Routes




      </Route>
    </Routes>
  )
}

export default Router
