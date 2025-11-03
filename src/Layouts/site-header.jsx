import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileBarChart,
  Keyboard,
  Search,
  UserCircle2,
} from "lucide-react"


export function SiteHeader() {
  const [year, setYear] = useState("2025–26") 
  
  

  

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
          className="border rounded-full px-3 py-2 text-md font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 me-4"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2025–26">2025–26</option>
          <option value="2024–25">2024–25</option>
          <option value="2023–24">2023–24</option>
        </select>

        
        <div className="flex items-center gap-4 text-gray-700">
          <FileBarChart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
          <Keyboard className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
          <Search className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
          <UserCircle2 className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors me-2" />
        </div>

        
        <motion.div
          className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 text-white shadow-md cursor-pointer"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <LayoutDashboard className="w-5 h-5" />
        </motion.div>
      </div>
    </header>
  )
}
