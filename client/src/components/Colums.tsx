// columns.tsx
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Base table row type
export type BaseTableRow = {
  id: string
  name: string
  date: string
  time: string
  status?: "Pending" | "Resolved" | "Closed" | "Received"
  description?: string
}

// Suggestion row extends base row with extra fields
export type SuggestionRow = BaseTableRow & {
  phone: string
  email: string
  service: string
}

// ✅ Expander column with row-specific expansion logic
export const expanderColumn: ColumnDef<BaseTableRow> = {
  id: "expander",
  header: () => null,
  cell: ({ row, table }) => {
    // Check if expansion is globally enabled for the table and if this specific row can expand
    const getRowCanExpand = table.options.getRowCanExpand
    if (!getRowCanExpand || !getRowCanExpand(row)) {
      return null
    }

    const isExpanded = row.getIsExpanded()
    return (
      <button
        onClick={row.getToggleExpandedHandler()}
        className="flex items-center justify-center"
      >
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
    )
  },
}

// ✅ Selection column (typed with BaseTableRow)
export const selectionColumn: ColumnDef<BaseTableRow> = {
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
}

// ✅ Common columns
export const nameColumn: ColumnDef<BaseTableRow> = {
  accessorKey: "name",
  header: "Name",
  enableGlobalFilter: true,
}

export const dateColumn: ColumnDef<BaseTableRow> = {
  accessorKey: "date",
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      Date <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  enableGlobalFilter: true,
}

export const timeColumn: ColumnDef<BaseTableRow> = {
  accessorKey: "time",
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      Time <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  sortingFn: (rowA, rowB, columnId) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number)
      return h * 60 + m
    }
    return toMinutes(rowA.getValue(columnId)) - toMinutes(rowB.getValue(columnId))
  },
  enableGlobalFilter: true,
}

// ✅ Description column with dialog
export const descriptionColumn: ColumnDef<BaseTableRow> = {
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
}

// ✅ Status column with colored badges
export const statusColumn: ColumnDef<BaseTableRow> = {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status") as string
    let bgColor = ""
    if (status === "Resolved") bgColor = "bg-green-200 text-green-800"
    if (status === "Pending") bgColor = "bg-yellow-200 text-yellow-800"
    if (status === "Closed") bgColor = "bg-red-200 text-red-800"
    if (status === "Received") bgColor = "bg-green-400 text-green-800"
    return <span className={`px-3 py-2 rounded ${bgColor}`}>{status}</span>
  },
}

// ✅ Create column sets with conditional expansion
export const suggestionColumnsConditional: ColumnDef<SuggestionRow>[] = [
  expanderColumn as ColumnDef<SuggestionRow>,
  selectionColumn as ColumnDef<SuggestionRow>,
  nameColumn as ColumnDef<SuggestionRow>,
  dateColumn as ColumnDef<SuggestionRow>,
  timeColumn as ColumnDef<SuggestionRow>,
  { accessorKey: "phone", header: "Phone", enableGlobalFilter: true },
  { accessorKey: "email", header: "Email", enableGlobalFilter: true },
  { accessorKey: "service", header: "Service", enableGlobalFilter: true },
  descriptionColumn as ColumnDef<SuggestionRow>,
  statusColumn as ColumnDef<SuggestionRow>,
]

// ✅ Suggestion page column set WITHOUT expansion (for pages that don't need it)
export const suggestionColumnsNoExpansion: ColumnDef<SuggestionRow>[] = [
  selectionColumn as ColumnDef<SuggestionRow>,
  nameColumn as ColumnDef<SuggestionRow>,
  dateColumn as ColumnDef<SuggestionRow>,
  timeColumn as ColumnDef<SuggestionRow>,
  { accessorKey: "phone", header: "Phone", enableGlobalFilter: true },
  { accessorKey: "email", header: "Email", enableGlobalFilter: true },
  { accessorKey: "service", header: "Service", enableGlobalFilter: true },
  descriptionColumn as ColumnDef<SuggestionRow>,
  statusColumn as ColumnDef<SuggestionRow>,
]
