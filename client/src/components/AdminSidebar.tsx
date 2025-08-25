import  Image  from "../assets/Helga.jpg"
import {  PartyPopper , TriangleAlert, BellRing, MessageSquareQuote, LayoutDashboard, User, LogOut, ChevronUp, Settings } from "lucide-react"
import { useAuth } from "../components/AuthContext"
import { NavLink } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"


const items = [
  {
    title: "DASHBOARD",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "SUGGESTIONS",
    url: "/admin/suggestions",
    icon: MessageSquareQuote,
  },
  {
    title: "ALERTS",
    url: "/admin/alerts",
    icon: BellRing,
  },
  {
    title: "COMPLAINTS",
    url: "/admin/complaints",
    icon: TriangleAlert,
  },
   {
    title: "COMPLIMENTS",
    url: "/admin/compliments",
    icon: PartyPopper,
  },
  {
    title: "SETTINGS",
    url: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const { adminName, logout } = useAuth()
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-col">
          { state === "expanded" && (
          <img src={Image} alt="Admin Avatar" className="flex justify-center w-25 h-25 ml-8" />
         )}
          { state === "expanded" && (
          <span className="font-semibold text-blue-800 text-xs">Innovate,Implement & Transform</span>
          )}
          {state === "collapsed" && (
            <img src={Image} alt="Admin Avatar" className="w-12 h-12" />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" strokeWidth={2.5}/>
                      <span className="text-xs font-semibold">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
                <User /> {adminName}
                <ChevronUp className="ml-auto" />
                 </SidebarMenuButton>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                 >
                  <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <button
                      aria-label="Logout"
                      className="flex flex-row gap-2">
                      <LogOut/>Logout
                    </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you really want to logout? You will need to log in again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>
                      Yes, Logout
                    </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                  </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>

  )
}