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
import OrderPurchase from "@/Pages/Order/OrderPurchase"
import OrderSales from "@/Pages/Order/OrderSales"
import Quotations from "@/Pages/Quotations/Quotations"
import Payments from "@/Pages/Payments/Payments"
import Receipts from "@/Pages/Receipts/Receipts"
import Ledgers from "../Pages/Ledgers/Ledgers"
import LedgerGroups from "../Pages/Ledgers/LedgerGroups"
import Transfers from "../Pages/Transfers/Transfers"
import LedgerReport from "../Pages/Reports/LedgerReport"
import BalanceSheet from "../Pages/Reports/BalanceSheet"
import CashFlow from "../Pages/Reports/CashFlow"
import DayBook from "../Pages/Reports/DayBook"
import ProfitLoss from "../Pages/Reports/ProfitLoss"
import TrialBalance from "../Pages/Reports/TrialBalance"
import Stock from "../Pages/Reports/Stock"
import Voucher from "../Pages/Reports/Voucher"
import DailyRegister from "../Pages/Reports/DailyRegister"
import Ageing from "../Pages/Reports/Ageing"
import TDSReport from "../Pages/Reports/TDSReport"
// import GSTR1 from "../Pages/GST/GSTR1"
// import GST2B from "../Pages/GST/GST2B"
import Teams from "@/Pages/Team/Teams"


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
        <Route path="/payments" element={<Payments />} />

        //Receipts Routes
        <Route path="/receipts" element={<Receipts />} />


        //Ledgers Routes
        <Route path="/ledgers" element={<Ledgers />} />
        <Route path="/ledgergroups" element={<LedgerGroups />} />

        //Transfers Routes
        <Route path="/transfers" element={<Transfers />} />

        //Reports Routes
        <Route path="/ledgerreport" element={<LedgerReport />} />
        <Route path="/balancesheet" element={<BalanceSheet />} />
        <Route path="/cashflow" element={<CashFlow />} />
        <Route path="/daybook" element={<DayBook />} />
        <Route path="/profitloss" element={<ProfitLoss />} />
        <Route path="/trialbalance" element={<TrialBalance />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/dailyregister" element={<DailyRegister />} />
        <Route path="/ageing" element={<Ageing />} />
        <Route path="/tdsreport" element={<TDSReport />} />


        {/* //Gst Routes
        <Route path="/gstr1" element={<GSTR1 />} />
        <Route path="/gst2b" element={<GST2B />} /> */}


        //Team Routes
        <Route path="/teams" element={<Teams />} />




      </Route>
    </Routes>
  )
}

export default Router
