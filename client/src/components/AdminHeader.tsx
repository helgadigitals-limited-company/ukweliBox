import { useState } from "react"
import { ChevronDown, LogOut, User } from "lucide-react"
import { useAuth } from "@/components/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminHeader() {
  const { adminName, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Extract initials from admin email/name
  const getInitials = (name: string | null) => {
    if (!name) return "A"
    const names = name.split(/[\s@.]/)
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const initials = getInitials(adminName)
  const displayEmail = adminName ? `${adminName}@helgadigitals.co.tz` : ""

  return (
    <header className="flex items-center justify-end p-2">
      <div className="flex items-center gap-3">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              {/* Avatar */}
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {initials}
              </div>
              
              {/* Admin info */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">{adminName}</span>
                <span className="text-xs text-gray-500">{displayEmail}</span>
              </div>
              
              {/* Dropdown arrow */}
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 border-b">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{adminName}</span>
                  <span className="text-xs text-gray-500">{displayEmail}</span>
                </div>
              </div>
            </div>
            
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center gap-2 w-full hover:text-blue-700">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </AlertDialogTrigger>
                
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you really want to logout? You will need to log in again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={logout}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Yes, Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
