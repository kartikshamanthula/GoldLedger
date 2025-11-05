import * as React from "react"
import { useLocation, NavLink } from "react-router-dom"
import {
  Minus,
  Plus,
  LayoutDashboard,
  Package,
  Calendar,
  Receipt,
  Briefcase,
  FileText,
  ShoppingCart,
  CreditCard,
  Users,
  PieChart,
  FileSpreadsheet,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navData = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Items",
    icon: Package,
    items: [
      { title: "Items", url: "/items", icon: Package },
      { title: "Items Groups", url: "/items-groups", icon: FileText },
      { title: "Items Units", url: "/items-units", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Years",
    icon: Calendar,
    url: "/years",
  },
  {
    title: "Vouchers",
    icon: Receipt,
    items: [
      { title: "Estimate", url: "/estimate", icon: FileText },
      { title: "Sales", url: "/sales", icon: ShoppingCart },
      { title: "Sale Return", url: "/salesreturn", icon: CreditCard },
      { title: "Purchase", url: "/purchase", icon: ShoppingCart },
      { title: "Purchase Return", url: "/purchasereturn", icon: CreditCard },
      { title: "Credit Note", url: "/creditnote", icon: FileText },
      { title: "Debit Note", url: "/debitnote", icon: FileText },
      { title: "Receipt Note", url: "/receiptnote", icon: FileText },
      { title: "Delivery Challans", url: "/deliverychallans", icon: FileText },
      { title: "Opening", url: "/opening", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Jobwork",
    icon: Briefcase,
    items: [
      { title: "Material In", url: "/materialin", icon: FileText },
      { title: "Material Out", url: "/materialout", icon: FileText },
    ],
  },
  {
    title: "Order",
    icon: ShoppingCart,
    items: [
      { title: "Order Purchase", url: "/orderpurchase", icon: FileText },
      { title: "Order Sales", url: "/ordersales", icon: FileText },
    ],
  },
  {
    title: "Quotations",
    icon: FileText,
    url: "/quotations"
  },
  {
    title: "Payments",
    icon: CreditCard,
    url: "/payments"
  },
  {
    title: "Receipts",
    icon: FileSpreadsheet,
    url: "/receipts"
  },
  {
    title: "Ledgers",
    icon: Users,
    items: [
      { title: "Ledgers", url: "/ledgers", icon: Users },
      { title: "Ledger Groups", url: "/ledgergroups", icon: FileText },
    ],
  },
  {
    title: "Transfers",
    icon: PieChart,
    url: "/transfers"
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      { title: "Ledger Report", url: "/ledgerreport", icon: FileText },
      { title: "Balance Sheet", url: "/balancesheet", icon: FileSpreadsheet },
      { title: "Cash Flow", url: "/cashflow", icon: PieChart },
      { title: "Day Book", url: "/daybook", icon: Calendar },
      { title: "Profit & Loss", url: "/profitloss", icon: FileText },
      { title: "Trial Balance", url: "/trialbalance", icon: FileText },
      { title: "Stock", url: "/stock", icon: Package },
      { title: "Voucher", url: "/voucher", icon: Receipt },
      { title: "Daily Register", url: "/dailyregister", icon: FileText },
      { title: "Ageing", url: "/ageing", icon: Calendar },
      { title: "TDS Report", url: "/tdsreport", icon: FileSpreadsheet },
    ],
  },
  {
    title: "GST",
    icon: FileSpreadsheet,
    items: [
      { title: "GSTR-1", url: "/gstr1", icon: FileText },
      { title: "GST2B", url: "gst2b", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Team",
    icon: Users,
    yrl: "/team"
  },
]

export function AppSidebar(props) {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = React.useState(null)

  
  React.useEffect(() => {
    const currentPath = location.pathname

    
    const foundMenu = navData.find((item) =>
      item.url === currentPath
        ? true
        : item.items?.some((sub) => sub.url === currentPath)
    )

    if (foundMenu) {
      setActiveMenu(foundMenu.title)
    } else {
      setActiveMenu("Dashboard")
    }
  }, [location.pathname])

  return (
    <Sidebar {...props} className="bg-gray-200 text-black">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink
                to="/dashboard"
                className="relative flex items-center gap-2 px-3 py-2"
              >
                <img
                  src="/logo.png"
                  alt="SocioLedger Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-2xl font-bold text-black">
                  SocioLedger
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navData.map((item) => {
              const isOpen =
                activeMenu === item.title ||
                item.items?.some((sub) => sub.url === location.pathname)
              const isActive = location.pathname === item.url

              return (
                <Collapsible
                  key={item.title}
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={`flex items-center gap-2 transition-colors ${
                          isActive
                            ? "bg-indigo-500 text-black"
                            : "hover:bg-blue-400 hover:text-white"
                        }`}
                      >
                        {item.url ? (
                          <NavLink to={item.url}>
                            <item.icon className="w-4 h-4 text-black group-hover:text-indigo-500" />
                            <span className="font-medium">{item.title}</span>
                            {item.items?.length > 0 && (
                              <>
                                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                <Minus className="ml-auto hidden group-data-[state=open]/collapsible:hidden" />
                              </>
                            )}
                          </NavLink>
                        ) : (
                          <div className="flex items-center w-full">
                            <item.icon className="w-4 h-4 text-black group-hover:text-indigo-500" />
                            <span className="font-medium">{item.title}</span>
                            {item.items?.length > 0 && (
                              <>
                                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                <Minus className="ml-auto hidden group-data-[state=open]/collapsible:hidden" />
                              </>
                            )}
                          </div>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.items?.length > 0 && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            const isSubActive =
                              location.pathname === subItem.url
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                                      isSubActive
                                        ? "bg-indigo-400 text-black"
                                        : "hover:bg-blue-400 hover:text-black"
                                    }`}
                                  >
                                    <subItem.icon className="w-4 h-4 text-black" />
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar