import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layouts from "@/Layouts/layouts"
import Dashboard from "@/Pages/Dashboard"
import Items from "@/Pages/Items/Items"
import ItemsGroups from "@/Pages/Items/ItemsGroups"
import ItemsUnits from "@/Pages/Items/ItemsUnits"
import ItemsColors from "@/Pages/Items/ItemsColors"
import ItemsDesign from "@/Pages/Items/ItemDesign"
import Years  from "@/Pages/Years/Years"
import Sales from "@/Pages/Vouchers/Sales"
import SalesReturn from "@/Pages/Vouchers/SalesReturn"
import Purchase from "@/Pages/Vouchers/Purchase"
import PurchaseReturn from "@/Pages/Vouchers/PurchaseReturn"
import CreditsNote from "@/Pages/Vouchers/CreditsNote"
import DebitsNote from "@/Pages/Vouchers/DebitsNote"
import ReceiptNote from "@/Pages/Vouchers/ReceiptNote"
import DeliveryChallans from "@/Pages/Vouchers/DeliveryChallans"
import Opening from "@/Pages/Vouchers/Opening"
import OrderTypes from "@/Pages/Order/OrderTypes"
import OrderCustomer from "@/Pages/Order/OrderCustomer"
import OrderSupplier from "@/Pages/Order/OrderSupplier"
import Payments from "@/Pages/Payments/Payments"
import Receipts from "@/Pages/Receipts/Receipts"
import RateCut from "@/Pages/RateCut/ratecut"
import Ledgers from "@/Pages/Ledgers/Ledgers"
import LedgerGroups from "@/Pages/Ledgers/LedgerGroups"
import Transfers from "@/Pages/Transfers/Transfers"
import LedgerReport from "@/Pages/Reports/LedgerReport"
import BalanceSheet from "@/Pages/Reports/BalanceSheet"
import CashFlow from "@/Pages/Reports/CashFlow"
import DayBook from "@/Pages/Reports/DayBook"
import ProfitLoss from "@/Pages/Reports/ProfitLoss"
import TrialBalance from "@/Pages/Reports/TrialBalance"
import Stock from "@/Pages/Reports/Stock"
import Voucher from "@/Pages/Reports/Voucher"
import OrderSummary from "@/Pages/Reports/OrderSummary"
import TagReport from "@/Pages/Reports/TagReport"
import TagVerify from "@/Pages/Reports/TagVerify"
import DailyRegister from "@/Pages/Reports/DailyRegister"
import Ageing from "@/Pages/Reports/Ageing"
import TDSReport from "@/Pages/Reports/TDSReport"
import RateCutReport from "@/Pages/Reports/RateCutReport"
import Teams from "@/Pages/Team/Teams"
import Tasks from "@/Pages/Task/Tasks"
import Stores from "@/Pages/Store/Stores";


export function Router() {
  return (
    <Routes>
      <Route element={<Layouts />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        //Dashboard Routes
        <Route path="/dashboard" element={<Dashboard />} />
        
        //Items Routes
        <Route path="/items" element={<Items />} />
        <Route path="/items-Groups" element={<ItemsGroups />} />
        <Route path="/items-units" element={<ItemsUnits />} />
        <Route path="/items-colors" element={<ItemsColors />} />
        <Route path="/items-designs" element={<ItemsDesign />} />

        //years Routes
        <Route path="/years" element={<Years />} />


        //Vouchers Routes
          <Route path="/sales" element={<Sales />} />
          <Route path="/salesreturn" element={<SalesReturn />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchasereturn" element={<PurchaseReturn />} />
          <Route path="/creditnote" element={<CreditsNote />} />
          <Route path="/debitnote" element={<DebitsNote />} />
          <Route path="/receiptnote" element={<ReceiptNote />} />
          <Route path="/deliverychallans" element={<DeliveryChallans />} />
          <Route path="/opening" element={<Opening />} />


        //Order Routes
        <Route path="/ordertypes" element={<OrderTypes />} />
        <Route path="/ordercustomer" element={<OrderCustomer />} />
        <Route path="/ordersupplier" element={<OrderSupplier />} />

        //Payments Routes
        <Route path="/payments" element={<Payments />} />

        //Receipts Routes
        <Route path="/receipts" element={<Receipts />} />

        //Rate Cut Routes
        <Route path="/ratecut" element={<RateCut />} />

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
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/tagreport" element={<TagReport />} />
        <Route path="/tagverify" element={<TagVerify />} />
        <Route path="/dailyregister" element={<DailyRegister />} />
        <Route path="/ageing" element={<Ageing />} />
        <Route path="/tdsreport" element={<TDSReport />} />
        <Route path="/ratecutreport" element={<RateCutReport />} />


        //Team Routes
        <Route path="/teams" element={<Teams />} />

        //Task Routes
        <Route path = "/tasks" element={<Tasks />} />

      </Route>
      <Route>
        <Route path="/store" element={<Stores />} />
      </Route>
    </Routes>
  )
}

export default Router
