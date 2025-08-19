import Image from "../assets/Helga.jpg"
import { Calendar, Home, Inbox, Search, Settings, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "./AuthContext"

import {Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarGroupContent,SidebarGroupLabel,SidebarHeader,SidebarMenu, SidebarMenuButton,SidebarMenuItem,
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
    title: "Home", 
    url: "#", 
    icon: Home
   },
  { 
    title: "Inbox",
     url: "#", 
     icon: Inbox
     },
  {
     title: "Calendar",
      url: "#", 
      icon: Calendar 
    },
  { 
    title: "Search", 
    url: "#", 
    icon: Search
   },
  { title: "Settings",
     url: "#", 
     icon: Settings
     },
]

export default function AdminSidebar() {
  const { adminName, logout } = useAuth()

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <img
            src={Image}
            alt="helga image"
            className="h-20 w-20"
          />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="flex flex-row items-center justify-between font-semibold text-gray-800 px-2">
          <div className="flex flex-row items-center gap-2">
            <User />
            {adminName}
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
                  <TooltipContent side="top">
                    Logout
                  </TooltipContent>
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
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={logout}>
                  Yes, Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
