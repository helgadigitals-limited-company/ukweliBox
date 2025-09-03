import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropDownProps {
  currentStatus: string
  onStatusChange: (newStatus: string) => void
}

export function DropDown({ currentStatus, onStatusChange }: DropDownProps) {
  const statusOptions = ["Pending", "Resolved", "Closed", "Received"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        // Stop row click / expansion
        
        className="p-1 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Change status"
        title="Change status"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="w-36 z-50"
        // Prevent focus from jumping back to row which can cause immediate close
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status}
            // Radix-specific; prevents row click + allows selecting
            onSelect={(e) => {
              e.preventDefault()
              onStatusChange(status)
            }}
            className={`cursor-pointer ${
              currentStatus === status ? "bg-blue-50 text-blue-700" : ""
            }`}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

