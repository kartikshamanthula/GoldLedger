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
      // Alt + F opens the search dialog
      if (e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault(); // prevent browser's default find behavior
        setSearchOpen(true);
      }
      if (e.altKey && e.key.toLowerCase() === "A") {
        e.preventDefault(); // prevent browser's default find behavior
        setOpen(true);
      }

      // Escape closes the search dialog
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
    { name: "Vouchers", path: "/vouchers" },
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

  const getHeaderDetails = () => {
    switch (location.pathname) {
      case "/dashboard":
        return {
          icon: <LayoutDashboard className="w-5 h-5 text-indigo-600" />,
          title: "Dashboard",
          subtitle: "Overview of your business metrics and activities",
        };


      case "Items":
        return {
          icon: <Package className="w-5 h-5 text-indigo-600" />,
          title: "Items",
          subtitle: "Manage and view all available items",
        };

      case "/items/Item-Groups":
        return {
          icon: <Layers className="w-5 h-5 text-indigo-600" />,
          title: "Item Groups",
          subtitle: "Organize your items into logical groups",
        };

      case "/items/Item-Units":
        return {
          icon: <Ruler className="w-5 h-5 text-indigo-600" />,
          title: "Item Units",
          subtitle: "Define measurement units for your items",
        };


      case "/years":
        return {
          icon: <Calendar className="w-5 h-5 text-indigo-600" />,
          title: "Years",
          subtitle: "Manage your fiscal years and time-based records",
        };


      case "/Estimate":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Estimate",
          subtitle: "Create and manage customer estimates and quotations",
        };

      case "/sales":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
          title: "Sales",
          subtitle: "Track product sales and customer invoices",
        };

      case "/sales-return":
        return {
          icon: <CreditCard className="w-5 h-5 text-indigo-600" />,
          title: "Sales Return",
          subtitle: "Handle and record returned sales items",
        };

      case "/purchase":
        return {
          icon: <Package className="w-5 h-5 text-indigo-600" />,
          title: "Purchase",
          subtitle: "Manage supplier purchases and bills",
        };

      case "/purchase-return":
        return {
          icon: <Undo2 className="w-5 h-5 text-indigo-600" />,
          title: "Purchase Return",
          subtitle: "Track returned goods and supplier adjustments",
        };

      case "/credit-note":
        return {
          icon: <FileMinus className="w-5 h-5 text-indigo-600" />,
          title: "Credit Note",
          subtitle: "Adjust sales invoices with issued credits",
        };

      case "/debit-note":
        return {
          icon: <FilePlus className="w-5 h-5 text-indigo-600" />,
          title: "Debit Note",
          subtitle: "Adjust purchases with debit entries",
        };

      case "/receipt-note":
        return {
          icon: <ClipboardList className="w-5 h-5 text-indigo-600" />,
          title: "Receipt Note",
          subtitle: "Record received items or payments",
        };

      case "/delivery-challan":
        return {
          icon: <Truck className="w-5 h-5 text-indigo-600" />,
          title: "Delivery Challan",
          subtitle: "Track goods delivery without invoices",
        };

      case "/opening":
        return {
          icon: <FolderOpen className="w-5 h-5 text-indigo-600" />,
          title: "Opening",
          subtitle: "Initialize your accounts with opening balances",
        };


      case "/Jobwork":
        return {
          icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
          title: "Jobwork",
          subtitle: "Handle external job processes and work orders",
        };


      case "/Order":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-indigo-600" />,
          title: "Orders",
          subtitle: "View and manage all customer orders",
        };


      case "/Quotations":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Quotations",
          subtitle: "Manage and track all quotations and proposals",
        };


      case "/Payments":
        return {
          icon: <CreditCard className="w-5 h-5 text-indigo-600" />,
          title: "Payments",
          subtitle: "Track customer and vendor payments",
        };
      case "/Task":
        return {
          icon: <FileText className="w-5 h-5 text-indigo-600" />,
          title: "Task",
          subtitle: "View and manage your tasks",
        };


      case "/Receipts":
        return {
          icon: <Receipt className="w-5 h-5 text-indigo-600" />,
          title: "Receipts",
          subtitle: "Keep record of received payments and bills",
        };


      case "/Ledgers":
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          title: "Ledgers",
          subtitle: "Manage account ledgers and financial records",
        };


      case "/Transfers":
        return {
          icon: <Repeat className="w-5 h-5 text-indigo-600" />,
          title: "Transfers",
          subtitle: "Track stock and fund transfers",
        };


      case "/Reports":
        return {
          icon: <BarChart className="w-5 h-5 text-indigo-600" />,
          title: "Reports",
          subtitle: "Analyze data through detailed reports",
        };


      case "/GST":
        return {
          icon: <Percent className="w-5 h-5 text-indigo-600" />,
          title: "GST",
          subtitle: "Manage GST details and compliance reports",
        };


      case "/Team":
        return {
          icon: <Users className="w-5 h-5 text-indigo-600" />,
          title: "Team",
          subtitle: "Manage your organization’s members and roles",
        };


      default:
        return {
          icon: <LayoutGrid className="w-5 h-5 text-indigo-600" />,
          title: "SocioLedger",
          subtitle: "Welcome to your workspace",
        };
    }
  };

  const { icon, title, subtitle } = getHeaderDetails();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">

      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-6" />
        <div>
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-blue-600" />
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Overview of your business metrics and activities
          </p>
        </div>
      </div>


      <div className="flex items-center gap-4">

        <select
          className="border rounded px-3 py-2 text-md font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 me-4"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2025–26">2025–26</option>
          <option value="2024–25">2024–25</option>
          <option value="2023–24">2023–24</option>
        </select>

        <div className="flex items-center gap-4 text-gray-700">
          <FileBarChart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />

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

          {/* Search input */}
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

          {/* Route list */}
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
