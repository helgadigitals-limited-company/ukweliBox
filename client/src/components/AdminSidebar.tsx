import  Image  from "../assets/Helga.jpg"
import {  PartyPopper , TriangleAlert, CircleAlert, MessageSquareQuote, LayoutDashboard, User, LogOut, ChevronUp, Settings } from "lucide-react"
import { useAuth } from "../components/AuthContext"
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
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Suggestions",
    url: "/feedback/suggestions",
    icon: MessageSquareQuote,
  },
  {
    title: "Alerts",
    url: "#",
    icon: CircleAlert,
  },
  {
    title: "Complaints",
    url: "#",
    icon: TriangleAlert,
  },
   {
    title: "Compliments",
    url: "#",
    icon: PartyPopper,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const { adminName, logout } = useAuth()
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <img src={Image} alt="Admin Avatar" className="w-16 h-16" />
          <span className="font-semibold text-blue-800 text-xs">Innovate,Implement & Transform</span>
  
          </div>
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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