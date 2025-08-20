import { useState } from "react"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {/* Sidebar (desktop only) */}
        <div className="hidden sm:flex">
          <AdminSidebar collapsed={collapsed} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between px-4 py-2 border-b">
            {/* Mobile trigger */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button 
                  aria-label="Open sidebar"
                  className="p-2 rounded hover:bg-gray-200">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <AdminSidebar collapsed={false} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop trigger */}
            <div className="hidden sm:block">
              <button
               aria-label="Toggle sidebar"
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded hover:bg-gray-200"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <h1 className="font-semibold text-lg">Admin Panel</h1>
          </header>

          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
