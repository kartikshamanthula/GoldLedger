import * as React from "react"
import { useLocation, NavLink } from "react-router-dom"
import {
  Minus,
  Plus,
  LayoutDashboard,
  Package,
  Calendar,
  Receipt,
  FileText,
  ShoppingCart,
  CreditCard,
  Users,
  Shredder,
  FolderSync,
  Palette,
  Layers,
  LibraryBig,
  ShoppingBag,
  PencilRuler,
  BadgeIndianRupee,
  Undo2,
  NotebookPen,
  NotepadText,
  ReceiptIndianRupee,
  Truck,
  FolderOpen,
  ChartNoAxesColumnDecreasing,
  TrendingUp,
  ChartNoAxesCombined,
  TrendingUpDown,
  Book,
  ChartColumnDecreasing,
  SquareChartGantt,
  CalendarClock,
  UserCheck,
  Tag,
  ChartNoAxesColumn,
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
    icon: ShoppingCart,
    items: [
      { title: "Items", url: "/items", icon: ShoppingBag },
      { title: "Item Groups", url: "/items-groups", icon: Layers },
      { title: "Item Units", url: "/items-units", icon: PencilRuler },
      { title: "Touch & Colors", url: "/items-colors", icon: Palette },
      { title: "Item Designs", url: "/items-designs", icon: Palette },
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
      { title: "Sales", url: "/sales", icon: BadgeIndianRupee },
      { title: "Sale Return", url: "/salesreturn", icon: Undo2 },
      { title: "Purchase", url: "/purchase", icon: ShoppingCart },
      { title: "Purchase Return", url: "/purchasereturn", icon: Undo2 },
      { title: "Credit Note", url: "/creditnote", icon: NotebookPen },
      { title: "Debit Note", url: "/debitnote", icon: NotepadText },
      { title: "Receipt Note", url: "/receiptnote", icon: ReceiptIndianRupee },
      { title: "Delivery Challans", url: "/deliverychallans", icon: Truck },
      { title: "Opening", url: "/opening", icon: FolderOpen },
    ],
  },
  {
    title: "Order",
    icon: ShoppingCart,
    items: [
      { title: "Order Types", url: "/ordertypes", icon: Layers },
      { title: "Order Customer", url: "/ordercustomer", icon: ReceiptIndianRupee },
      { title: "Order Supplier", url: "/ordersupplier", icon: ShoppingBag },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    url: "/payments"
  },
  {
    title: "Receipts",
    icon: ChartNoAxesColumnDecreasing,
    url: "/receipts"
  },
  {
    title: "Rate Cut",
    icon: Shredder,
    url: "/ratecut"
  },
  {
    title: "Ledgers",
    icon: LibraryBig,
    items: [
      { title: "Ledgers", url: "/ledgers", icon: Users },
      { title: "Ledger Groups", url: "/ledgergroups", icon: FolderSync },
    ],
  },
  {
    title: "Transfers",
    icon: FolderSync,
    url: "/transfers"
  },
  {
    title: "Reports",
    icon: ChartNoAxesColumn,
    items: [
      { title: "Ledger Report", url: "/ledgerreport", icon: TrendingUp },
      { title: "Balance Sheet", url: "/balancesheet", icon: ChartNoAxesCombined },
      { title: "Cash Flow", url: "/cashflow", icon: TrendingUpDown },
      { title: "Day Book", url: "/daybook", icon: Book },
      { title: "Profit & Loss", url: "/profitloss", icon: ChartColumnDecreasing },
      { title: "Trial Balance", url: "/trialbalance", icon: SquareChartGantt },
      { title: "Stock", url: "/stock", icon: Package },
      { title: "Voucher", url: "/voucher", icon: Receipt },
      { title: "Order Summary", url: "/ordersummary", icon: FileText },
      { title: "Tag Report", url: "/tagreport", icon: Tag },
      { title: "Tag Verify", url: "/tagverify", icon: Tag },
      { title: "Daily Register", url: "/dailyregister", icon: CalendarClock },
      { title: "Ageing", url: "/ageing", icon: UserCheck },
      { title: "TDS Report", url: "/tdsreport", icon: TrendingUp },
      { title: "Rate Cut Report", url: "/ratecutreport", icon: Shredder },
    ],
  },
  {
    title: "Team",
    icon: Users,
    url: "/teams"
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
    <Sidebar {...props} className="bg-white text-black mt-3">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="xl" asChild>
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
                        className={`flex items-center gap-2 transition-colors ${isActive
                            ? "bg-amber-500 text-"
                            : "hover:bg-amber-400 hover:text-white"
                          }`}
                      >
                        {item.url ? (
                          <NavLink to={item.url}>
                            <item.icon className="w-4 h-4 text-black" />
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
                            <item.icon className="w-4 h-4 text-black" />
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
                                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${isSubActive
                                        ? "bg-amber-400 text-black"
                                        : "hover:bg-amber-400 hover:text-black"
                                      }`}
                                  >
                                    <subItem.icon className="w-4 h-4" />
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