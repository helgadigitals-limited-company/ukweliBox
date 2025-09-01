import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  useReactTable,
  type Row,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

// ✅ Define interface for data with optional description
interface DataWithDescription {
  description?: string
}

type DataTableProps<TData extends DataWithDescription> = {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]

  // ✅ Feature toggles
  enableSearch?: boolean
  enableColumnFilter?: boolean
  enableRowSelection?: boolean
  enableExpansion?: boolean
  enablePagination?: boolean
  // ✅ New: Row-specific expansion condition
  canExpandRow?: (row: TData) => boolean
}

export default function DataTable<TData extends DataWithDescription>({
  columns,
  data,
  enableSearch = false,
  enableRowSelection = false,
  enableExpansion = false,
  enablePagination = false,
  canExpandRow, // ✅ New prop
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState({})
  const [expanded, setExpanded] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      rowSelection,
      expanded,
    },
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: enableExpansion ? setExpanded : undefined,
    // ✅ Updated: Use row-specific expansion logic if provided
    getRowCanExpand: enableExpansion 
      ? (row) => {
          if (canExpandRow) {
            return canExpandRow(row.original)
          }
          return true // Default: all rows can expand
        }
      : () => false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: enableExpansion ? getExpandedRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
  })

  return (
    <div>
      {/* ✅ Search bar if enabled */}
      {enableSearch && (
        <div className="flex items-center py-2">
          <Input
            placeholder="Search by name or phone or email or service or status"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* ✅ Expansion content with info icon and description - now properly typed */}
                  {enableExpansion && row.getIsExpanded() && row.original.description && (
                    <TableRow className="bg-muted/20">
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="p-0"
                      >
                        <div className="flex items-start p-4 gap-2 max-w-full">
                          <Info className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed text-muted-foreground break-words whitespace-pre-wrap overflow-wrap-anywhere max-w-none">
                              {row.original.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Pagination controls if enabled */}
      {enablePagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
