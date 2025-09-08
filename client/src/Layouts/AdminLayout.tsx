import {  PartyPopper , TriangleAlert, BellRing, MessageSquareQuote, LayoutDashboard, Settings } from "lucide-react"
import {SidebarLayout} from "@helgadigitals/vera-ui"
import { Outlet } from "react-router-dom"
import  Image  from "../assets/Helga.jpg"
import AdminHeader from "@/components/AdminHeader"
import { ThemeProvider } from "@/components/ThemeProvider"
import {ModeToggle}  from "@/components/ModeToggle"

export default function AdminLayout() {

  

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <SidebarLayout props={{
      
       items: [
        {title:"DASHBOARD", path:"/admin/dashboard", icon:LayoutDashboard},
        {title: "SUGGESTIONS",path: "/admin/suggestions",icon: MessageSquareQuote},
        {title: "ALERTS",path: "/admin/alerts",icon: BellRing},
        {title: "COMPLAINTS",path: "/admin/complaints",icon: TriangleAlert},
        {title: "COMPLIMENTS",path: "/admin/compliments",icon: PartyPopper},
        {title: "SETTINGS",path: "/admin/settings",icon: Settings},
       ],
       
        heading:"Innovate, Implement & Transform",
          image:Image,
          // label:"Home",
          // displayName:adminName,
          // isFooterVisible:true,
          stylesConfig: {
            textColor: "text-white",
            itemTextSize: "text-xs",
            headingTextSize: "text-[15px]",
          },
          classNames: {
            menuButtonActive: "bg-primary/20 text-primary",
            footer: "bg-blue-950/40",
          },
      }}
    >
      <div className="absolute inset-y-0 right-8 top-0 z-10 mt-4">
          <ModeToggle />
        </div>
      <div className="absolute inset-y-0 right-15 top-0 z-10">
        <AdminHeader />
      </div>
     <Outlet/>
    </SidebarLayout>
    </ThemeProvider>
    </>
  )
}  