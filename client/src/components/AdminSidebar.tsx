import Image from "../assets/Helga.jpg"
import { PartyPopper , TriangleAlert, CircleAlert, MessageSquareQuote, LayoutDashboard,Settings, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { cn } from "@/lib/utils"

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const items = [
  { 
    title: "Dashboard",
     url: "#", 
     icon: LayoutDashboard
  },
  { 
    title: "Suggestions",
     url: "#", 
     icon: MessageSquareQuote
  },
  { 
    title: "Alerts",
     url: "#", 
     icon: CircleAlert
  },
  { 
    title: "Complaints",
     url: "#", 
     icon: TriangleAlert
  },
  { 
    title: "Congratulations",
     url: "#", 
     icon: PartyPopper
  },
  { 
    title: "Settings", 
    url: "#",
     icon: Settings 
    },
]

export default function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const { adminName, logout } = useAuth()

  return (
    <div
      className={cn(
        "h-full bg-white border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader className="flex flex-row items center justify-between py-4 px-2">
         <img src={Image} alt="helga" className="h-12 w-12" />

        {/* Show title only when not collapsed */}
        {!collapsed && (
          <h1 className="text-blue-600 font-semibold text-sm leading-tight">
            Innovate,  Implement &  Transform
          </h1>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
        
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    <SidebarFooter
      className={`flex items-center justify-between px-2 py-3 ${
        collapsed ? "flex-col gap-3" : "flex-row"
      }`}
    >
      <div className="flex items-center gap-2">
        <User />
        {!collapsed && <span>{adminName}</span>}
      </div>

          <AlertDialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <button
                      className="p-1 hover:text-blue-600"
                      aria-label="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                      </button>
                      </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="top">Logout</TooltipContent>
                          </Tooltip>
                            </TooltipProvider>

                          <AlertDialogContent>
                          <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you really want to logout? You will need to log in again.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logout}>Yes, Logout</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </SidebarFooter>
           </div>
  )
}
