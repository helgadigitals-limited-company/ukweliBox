import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  

  return (
    <>
    <SidebarProvider>
      <AdminSidebar />
      <main>
        <SidebarTrigger />
        <Outlet/>
      </main>
    </SidebarProvider>
    </>
  )
}  