import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export type Table = {
  id: string
  name: string
  date: string
  time: string
  phone: string
  email: string
  description: string
  status: "Pending" | "Resolved" | "Closed" | "Received"
}

export const columns: ColumnDef<Table>[] = [
  {
  id: "expander",
  header: () => null,
  cell: ({ row }) => {
    const isExpanded = row.getIsExpanded()
    return (
      <button
        onClick={row.getToggleExpandedHandler()}
        className="flex items-center justify-center"
      >
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
    )
  },
},

   {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "date",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
        sortingFn: (rowA, rowB, columnId) => {
        const timeA = rowA.getValue<string>(columnId)
        const timeB = rowB.getValue<string>(columnId)

        const toMinutes = (t: string) => {
          const [h, m] = t.split(":").map(Number)
          return h * 60 + m
        }

        return toMinutes(timeA) - toMinutes(timeB)
      },
      enableGlobalFilter: true,
  },
  {
    accessorKey: "phone",
    header:"Phone",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
  },
   {
    accessorKey: "service",
    header: "Service",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "description",
    header: "Description",
      cell: ({ row }) => {
      const description = row.getValue("description") as string

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-0">
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Description</DialogTitle>
            </DialogHeader>
            <p>{description}</p>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey:"status",
    header: "status",
    cell: ({ row }) => {
    const status = row.getValue("status") as string

    let bgColor = ""
    if (status === "Resolved") bgColor = "bg-green-200 text-green-800"
    if (status === "Pending") bgColor = "bg-yellow-200 text-yellow-800"
    if (status === "Closed") bgColor = "bg-red-200 text-red-800"
    if (status === "Received") bgColor ="bg-green-400 text-green-800"
    return (
      <span className={`px-3 py-2 rounded text-1xl ${bgColor}`}>
        {status}
      </span>
    )
  },
  }
]

