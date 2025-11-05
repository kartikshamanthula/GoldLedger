import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FileBarChart,
  Keyboard,
  Search,
  UserCircle2,
  IndianRupee,
  FileText,
  CreditCard,
  ShoppingCart,
  Briefcase,
  Banknote,
  Wallet,
  BookCheck,
  ArrowRight,
  LayoutGrid,
  Package,
  Layers,
  Ruler,
  Calendar,
  Undo2,
  FileMinus,
  FilePlus,
  ClipboardList,
  Truck,
  FolderOpen,
  Receipt,
  Users,
  Repeat,
  BarChart,
  Percent,
  FileSpreadsheet,
  PieChart,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



export function SiteHeader() {
  const [year, setYear] = useState("2025–26")
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {

      if (e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.altKey && e.key.toLowerCase() === "A") {
        e.preventDefault();
        setOpen(true);
      }


      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const routes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Items", path: "Items" },
    { name: "Items groups", path: "/items-groups" },
    { name: "Items units", path: "/Items-Units" },
    { name: "Years", path: "/years" },
    { name: "Estimate", path: "/estimate" },
    { name: "Jobwork", path: "/jobwork" },
    { name: "Order", path: "/order" },
    { name: "Quotations", path: "/quotations" },
    { name: "Payments", path: "/payments" },
    { name: "Receipts", path: "/receipts" },
    { name: "Ledgers", path: "/ledgers" },
    { name: "Ledger Groups", path: "/ledger-groups" },
    { name: "Transfers", path: "/transfers" },
    { name: "Reports", path: "/reports" },
  ];
  const filteredRoutes = routes.filter(
    (r) => r.name && r.name.toLowerCase().includes(query.toLowerCase())
  );

  const pageInfo = {
    "/dashboard": {
      icon: LayoutDashboard,
      title: "Dashboard",
      subtitle: "Overview of your business metrics and activities",
    },
    "/items": {
      icon: Package,
      title: "Items",
      subtitle: "Manage and view all available items",
    },
    "/items-groups": {
      icon: Layers,
      title: "Item Groups",
      subtitle: "Organize your items into logical groups",
    },
    "/items-units": {
      icon: Ruler,
      title: "Item Units",
      subtitle: "Define measurement units for your items",
    },
    "/years": {
      icon: Calendar,
      title: "Years",
      subtitle: "Manage fiscal years and reports",
    },
    "/estimate": {
      icon: FileText,
      title: "Estimate",
      subtitle: "Create and manage estimates",
    },
    "/sales": {
      icon: ShoppingCart,
      title: "Sales",
      subtitle: "Record and manage sales Vouchers",
    },
    "/salesreturn": {
      icon: CreditCard,
      title: "SalesReturn",
      subtitle: "Record and manage sales return Vouchers",
    },
    "/purchase": {
      icon: ShoppingCart,
      title: "Purchase",
      subtitle: "Record and manage purchase vouchers",
    },
    "/purchasereturn": {
      icon: CreditCard,
      title: "PurchaseReturn",
      subtitle: "Record and manage purchase return vouchers",
    },
    "/creditnote": {
      icon: FileText,
      title: "Creditnote",
      subtitle: "Record and manage credit notes",
    },
    "/debitnote": {
      icon: FileText,
      title: "DebiteNote",
      subtitle: "Record and manage debit notes",
    },
    "/receiptnote": {
      icon: FileText,
      title: "ReceiptNote",
      subtitle: "Record and manage receipt notes",
    },
    "/deliverychallans": {
      icon: FileText,
      title: "DeliveryChallans",
      subtitle: "Record and manage delivery challans",
    },
    "/opening": {
      icon: FileSpreadsheet,
      title: "Opening Balance",
      subtitle: "Record and manage opening balances",
    },

    "/materialin": {
      icon: FileText,
      title: "Material In",
      subtitle: "Record and manage materialin vouchers",
    },
    "/materialout": {
      icon: FileText,
      title: "Material Out",
      subtitle: "Record and manage materialout vouchers",
    },
    "/orderpurchase": {
      icon: ShoppingCart,
      title: "Order Purchase",
      subtitle: "Record and manage order purchase vouchers",
    },
    "/ordersales": {
      icon: ShoppingCart,
      title: "Order Sales",
      subtitle: "Record and manage order sales vouchers",
    },
    "/quotations": {
      icon: FileText,
      title: "Quotations",
      subtitle: "Manage and view all quotations",
    },
    "/payments": {
      icon: CreditCard,
      title: "Payments",
      subtitle: "Manage all payments and transactions",
    },
    "/receipts": {
      icon: Receipt,
      title: "Receipts",
      subtitle: "Track customer receipts and incoming payments",
    },
    "/ledgers": {
      icon: Users,
      title: "Ledgers",
      subtitle: "Manage and view all ledgers",
    },
    "/ledgergroups": {
      icon: FileText,
      title: "Ledger Groups",
      subtitle: "Manage and view all ledger groups",
    },
    "/transfers": {
      icon: PieChart,
      title: "Transfers",
      subtitle: "Manage and view all transfers",
    },
    "/ledgerreport": {
      icon: FileText,
      title: "Ledger Report",
      subtitle: "Generate and view ledger reports",
    },
    "/balancesheet": {
      icon: FileSpreadsheet,
      title: "Balance Sheet",
      subtitle: "Generate and view balance sheet reports",
    },
    "/cashflow": {
      icon: PieChart,
      title: "Cash Flow",
      subtitle: "Generate and view cash flow reports",
    },
    "/daybook": {
      icon: Calendar,
      title: "Day Book",
      subtitle: "Generate and view day book reports",
    },
    "/profitloss": {
      icon: FileText,
      title: "Profit & Loss",
      subtitle: "Generate and view profit and loss reports",
    },
    "/trialbalance": {
      icon: FileText,
      title: "Trial Balance",
      subtitle: "Generate and view trial balance reports",
    },
    "/stock": {
      icon: Package,
      title: "Stock",
      subtitle: "Manage and view stock reports",
    },
    "/voucher": {
      icon: Receipt,
      title: "Voucher",
      subtitle: "Manage and view voucher reports",
    },
    "/dailyregister": {
      icon: FileText,
      title: "Daily Register",
      subtitle: "Generate and view daily register reports",
    },
    "/ageing": {
      icon: Calendar,
      title: "Ageing",
      subtitle: "Generate and view ageing reports",
    },
    "/tdsreport": {
      icon: FileSpreadsheet,
      title: "TDS Report",
      subtitle: "Generate and view tds reports",
    },
    "/teams": {
      icon: Users,
      title: "Teams",
      subtitle: "Manage and view all teams",
    },
    "/tasks": {
      icon: FileText,
      title: "Tasks",
      subtitle: "Manage and view all tasks",
    },
    "/gstr1": {
      icon: FileText,
      title: "GSTR-1",
      subtitle: "Generate and view gstr-1 reports",
    },
    "/gst2b": {
      icon: FileText,
      title: "GST2B",
      subtitle: "Generate and view gst2b reports",
    },
  };


  const currentPage =
    pageInfo[location.pathname] || {
      icon: LayoutGrid,
      title: "SocioLedger",
      subtitle: "Welcome to your workspace",
    };

  const Icon = currentPage.icon;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">

      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-6" />
        <div>
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <currentPage.icon className="w-5 h-5 text-purple-600" />
            {currentPage.title}
          </h1>
          <p className="text-sm text-gray-500">{currentPage.subtitle}</p>
        </div>
      </div>



      <div className="flex items-center gap-4">

        <select
          className=" rounded px-3 py-2 text-md font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 me-4"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2025–26">2025–26</option>
          <option value="2024–25">2024–25</option>
          <option value="2023–24">2023–24</option>
        </select>

        <div className="flex items-center gap-4 text-gray-700">
          <button onClick={() => navigate("/tasks")}> 
            <FileBarChart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Keyboard className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-2">
              <DropdownMenuLabel className="font-semibold text-gray-800">
                Keyboard Shortcuts
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="space-y-2">
                {[
                  { action: "Open search", keys: "Alt + F" },
                  { action: "Save form", keys: "Alt + S" },
                  { action: "Update form", keys: "Alt + U" },
                  { action: "Print", keys: "Alt + P" },
                  { action: "Create form", keys: "Alt + A" },
                  { action: "Cancel/Close form", keys: "Alt + C" },
                  { action: "Close dialog/form", keys: "Escape" },
                  { action: "Navigate search results", keys: "↑ / ↓" },
                  { action: "Select search result", keys: "Enter" },
                ].map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-1 text-sm text-gray-700"
                  >
                    <span>{shortcut.action}</span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 font-medium text-xs">
                      {shortcut.keys}
                    </span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Search
            onClick={() => setSearchOpen(true)}
            className="w-5 h-5 cursor-pointer hover:text-blue-600 text-gray-700 transition-colors me-2" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserCircle2 className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 p-2">
              <DropdownMenuLabel className="font-semibold text-gray-800">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => alert("Logging out...")}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <button
            onClick={() => setOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-tr from-pink-500 via-purple-500 to-yellow-400 shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <div className="absolute inset-0 rounded-full blur-md bg-linear-to-tr from-pink-500 via-purple-500 to-yellow-400 opacity-70 animate-pulse"></div>
            <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white">
              <motion.div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 text-white shadow-md cursor-pointer"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0px 0px 20px rgba(147, 51, 234, 0.6)", // purple glow
                }}
                whileTap={{ scale: 0.9 }}
              >
                <LayoutDashboard className="w-5 h-5" />
              </motion.div>

            </div>
          </button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-semibold">
                  What would you like to process?
                </DialogTitle>
                <p className="text-center text-gray-500 mt-1 text-sm">
                  Select the type of document you want to analyze
                </p>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  {
                    title: "Direct Payment",
                    desc: "Process payment transactions",
                    icon: IndianRupee,
                  },
                  {
                    title: "Receipt Payment",
                    desc: "Process receipt documents",
                    icon: Wallet,
                  },
                  {
                    title: "Purchase",
                    desc: "Process purchase invoices",
                    icon: ShoppingCart,
                  },
                  {
                    title: "Business Card",
                    desc: "Add new business contact",
                    icon: Briefcase,
                  },
                  {
                    title: "Bank Statement",
                    desc: "Reconcile bank statements",
                    icon: Banknote,
                  },
                  {
                    title: "Credit Card Statement",
                    desc: "Process credit card statements",
                    icon: CreditCard,
                  },
                  {
                    title: "Verify Ledger",
                    desc: "Verify ledger entries",
                    icon: BookCheck,
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group"
                  >
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-tr from-pink-500 via-purple-500 to-yellow-400">
                      <div className="absolute inset-0 rounded-full blur-md bg-linear-to-tr from-pink-500 via-purple-500 to-yellow-400 opacity-60 group-hover:opacity-80 transition-all"></div>

                      <motion.div
                        className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white text-purple-600"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>


      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg p-6 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Search className="w-5 h-5 text-gray-600" />
              Search Routes
            </DialogTitle>
          </DialogHeader>


          <div className="relative mt-4">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search routes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-1">
            {filteredRoutes.map((route, i) => (
              <div
                key={i}
                onClick={() => {
                  navigate(route.path);
                  setSearchOpen(false);
                }}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <span className="text-gray-800 text-sm">{route.name}</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </div>
            ))}
            {filteredRoutes.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-2">
                No routes found
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </header>
  )
}

export default SiteHeader
