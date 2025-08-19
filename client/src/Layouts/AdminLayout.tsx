
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/AdminSidebar"


export default function AdminLayout ({ children }: { children: React.ReactNode }) {

  return (
    <>
    <SidebarProvider>
       <div className="flex h-screen">
        <div className="hidden sm:flex">
      <AdminSidebar />
        </div>

        <div className="flex flex-col flex-1">
          <header  className="flex items-center justify-between px-4 py-2 border-b sm:hidden">
        <SidebarTrigger className="p-2 rounded hover:bg-gray-200" />
          </header>

         <main className="flex-1 overflow-y-auto p-4">
           {children}
         </main>
         </div>
       </div>
    </SidebarProvider>
    </>
           
  )
}


