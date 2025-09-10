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
    <header className="flex items-center justify-end p-2 bg-background">
      <div className="flex items-center gap-3">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className="group flex items-center gap-2 rounded-lg p-2 transition-colors bg-background"
              aria-label="Admin menu"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {initials}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium leading-none bg-background">
                  {adminName}
                </span>
                <span className="text-xs">
                  {displayEmail}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 bg-background transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 " />
                <div className="flex flex-col">
                  <span className="text-sm font-medium ">
                    {adminName}
                  </span>
                  <span className="text-xs">
                    {displayEmail}
                  </span>
                </div>
              </div>
            </div>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center gap-2 w-full">
                    <LogOut className="w-6 h-6 " />
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
