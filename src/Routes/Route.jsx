import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layouts from "@/Layouts/layouts"
import Dashboard from "@/Pages/Dashboard"
import Items from "@/Pages/Items/Items"
import ItemsGroups from "@/Pages/Items/ItemsGroups"
import ItemsUnits from "@/Pages/Items/ItemsUnits"
import Years  from "@/Pages/Years/Years"
import Estimate from "@/Pages/Vouchers/Estimate" 
import Sales from "@/Pages/Vouchers/Sales"
import SalesReturn from "@/Pages/Vouchers/SalesReturn"
import Purchase from "@/Pages/Vouchers/Purchase"
import PurchaseReturn from "@/Pages/Vouchers/PurchaseReturn"
import CreditsNote from "@/Pages/Vouchers/CreditsNote"
import DebitsNote from "@/Pages/Vouchers/DebitsNote"
import ReceiptNote from "@/Pages/Vouchers/ReceiptNote"
import DeliveryChallans from "@/Pages/Vouchers/DeliveryChallans"
import Opening from "@/Pages/Vouchers/Opening"
import MaterialIn from "@/Pages/Jobwork/MaterialIn"
import MaterialOut from "@/Pages/Jobwork/MaterialOut"
import OrderPurchase from "../Pages/Order/OrderPurchase"
import OrderSales from "../Pages/Order/OrderSales"
import Quotations from "../Pages/Quotations/Quotations"

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
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/salesreturn" element={<SalesReturn />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchasereturn" element={<PurchaseReturn />} />
          <Route path="/creditnote" element={<CreditsNote />} />
          <Route path="/debitnote" element={<DebitsNote />} />
          <Route path="/receiptnote" element={<ReceiptNote />} />
          <Route path="/deliverychallans" element={<DeliveryChallans />} />
          <Route path="/opening" element={<Opening />} />


        //Jobwork Routes
        <Route path="/materialin" element={<MaterialIn />} />
        <Route path="/materialout" element={<MaterialOut/>} />

        //Order Routes
        <Route path="/orderpurchase" element={<OrderPurchase />} />
        <Route path="/ordersales" element={<OrderSales />} />

        //Quotations Routes
        <Route path="/quotations" element={<Quotations />} />

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
