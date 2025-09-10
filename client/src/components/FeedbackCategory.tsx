import { useState, useMemo } from "react"
import { Button, DataTable } from "@helgadigitals/vera-ui"
import { TableDatas, type Table } from "@/lib/TableData"
import { statusColors, statusLabels, type StatusType, selectStatus } from "@/lib/StatusColors"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Plus, Minus } from "lucide-react"

type FeedbackCategory = Table["category"]

interface FeedbackCategoryProps {
  category: FeedbackCategory
  title?: string
  tableClassName?: string
  selectionMode?: "single" | "multiple"
  // Future extension points:
  // customExpandedContent?: (row: Table) => React.ReactNode
  // customStatusBadge?: (status: Table["status"]) => React.ReactNode
}

export function FeedbackCategory({
  category,
  title,
  tableClassName,
  selectionMode = "single",
}: FeedbackCategoryProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<Array<string | number>>([])
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)

  const data = useMemo(
    () => TableDatas.filter((row) => row.category === category),
    [category]
  )

  const selectedRowsData = useMemo(
    () => TableDatas.filter((row) => selectedRowIds.includes(row.id)),
    [selectedRowIds]
  )

  const handleSelectionChange = (ids: Array<string | number>) => {
    setSelectedRowIds(ids)
  }

  const handleClearSelection = () => {
    setSelectedRowIds([])
  }

  const handleStatusChange = (newStatus: Table["status"]) => {
    if (selectedRowIds.length === 0) {
      toast.error("No items selected")
      return
    }

    selectedRowIds.forEach((id) => {
      const idx = TableDatas.findIndex((t) => t.id === id)
      if (idx !== -1) {
        TableDatas[idx].status = newStatus
      }
    })

    toast.success(
      <span>
        Status updated to{" "}
        <span className={`px-2 py-1 rounded text-sm ${statusColors[newStatus as StatusType]}`}>
          {statusLabels[newStatus as StatusType]}
        </span>{" "}
        for {selectedRowIds
          .map((id) => TableDatas.find((t) => t.id === id)?.name)
          .filter(Boolean)
          .join(", ")}
      </span>
    )

    setSelectedRowIds([])
    setIsStatusDropdownOpen(false)
  }

  const isLoading = false

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {title ?? `${category.charAt(0).toUpperCase() + category.slice(1)} List`}
      </h2>

      {selectedRowsData.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-600">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
            Selected Customers ({selectedRowsData.length})
          </h3>

            <div className="mb-4 max-h-32 overflow-y-auto">
              <ul className="space-y-1">
                {selectedRowsData.map((customer) => (
                  <li
                    key={customer.id}
                    className="text-sm text-black-700 dark:text-gray-200 flex items-center justify-between bg-white dark:bg-gray-700 px-2 py-1 rounded"
                  >
                    <div className="flex items-center gap-5 font-bold">
                      <strong>
                        {customer.name} ({customer.category}) -
                      </strong>
                      <div>Date Submitted: {customer.date}</div>
                      <div>Time Of Submission: {customer.time}</div>
                    </div>

                    <div className="flex items-center gap-6 font-bold">
                      <div
                        className={`px-2 py-1 rounded ${
                          statusColors[customer.status as StatusType]
                        }`}
                      >
                        Status: {customer.status}
                      </div>
                      <Button
                        onClick={() =>
                          setSelectedRowIds((prev) =>
                            prev.filter((id) => id !== customer.id)
                          )
                        }
                        className="relative z-10 text-red-500 hover:bg-blue-50 text-md border border-red-500"
                        title="Remove from selection"
                        variant="outline"
                        size="icon"
                      >
                        x
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Button
              className="px-3 py-1 text-xs transition-colors"
              variant="destructive"
              onClick={handleClearSelection}
            >
              Clear Selection({selectedRowIds.length})
            </Button>

            <div className="relative">
              <Select
                onValueChange={(v) =>
                  handleStatusChange(v as Table["status"])
                }
                open={isStatusDropdownOpen}
                onOpenChange={setIsStatusDropdownOpen}
              >
                <SelectTrigger className="px-3 py-1 text-xs bg-amber-50 hover:bg-amber-100 text-white rounded border-black h-auto">
                  <SelectValue
                    placeholder="Change Status"
                    className="text-black data-[placeholder]:text-white"
                  />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 py-1 text-xs font-semibold border-0">
                    Change Feedback Status
                  </div>
                  {selectStatus.map((status) => (
                    <SelectItem key={status.name} value={status.name} className="text-xs">
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${status.color}`}
                        ></span>
                        {status.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <DataTable
        className={
          tableClassName ??
          "[&_tr]:border-0 [&_tbody_tr]:border-0 [&_thead_tr]:border-0 [&_thead]:border-0 \
           [&_thead_th]:font-bold [&_th]:font-bold [&_thead_th]:capitalize [&_th]:capitalize \
           [&_thead_th]:bg-blue-950 [&_th]:bg-blue-950 [&_thead_th]:text-white [&_th]:text-white \
           [&_tbody_tr:hover]:bg-background [&_tbody_tr:hover]:transition-colors [&_tbody_tr:hover]:duration-150"
        }
        tableData={data}
        tableColumns={["name","email","phone","date","time","service","status"]}
        excludeColumns={["id"]}
        onRowClick={(row) => console.log("Row clicked:", row)}
        sortableColumns={["date","time"]}
        defaultSortState={[{ key: "time", direction: "asc" }]}
        manualSort={true}
        multiSort={true}
        enableGlobalFilter={true}
        globalFilterPlaceholder="Search Customers..."
        loading={isLoading}
        loadingComponent={<div>Fetching records...</div>}
        emptyStateComponent={<div>No users found. Add some users first.</div>}
        emptyMessage="Try adjusting your search criteria"
        selectable={true}
        selectedRowIds={selectedRowIds}
        selectionMode={selectionMode}
        onSelectionChange={handleSelectionChange}
        getRowId={(row) => String(row.id)}
        expandable={true}
        expandOnRowClick={false}
        expandIcon={
          <Plus className="w-3 h-3 hover:bg-white hover:text-black transition-colors" strokeWidth={4} />
        }
        collapseIcon={
          <Minus className="w-3 h-3 hover:bg-white hover:text-black transition-colors" strokeWidth={4} />
        }
        expandedContent={(row) => (
          <div className="p-4 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
            <h4 className="font-semibold mb-2 dark:text-white">Customer Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm dark:text-gray-200">
              <div>
                <strong className="dark:text-white">Full Name:</strong> {row.name}
              </div>
              <div>
                <strong className="dark:text-white">Phone:</strong> {row.phone}
              </div>
              <div>
                <strong className="dark:text-white">Date Submitted:</strong> {row.date}
              </div>
              <div>
                <strong className="dark:text-white">Time:</strong> {row.time}
              </div>
              <div>
                <strong className="dark:text-white">Email:</strong> {row.email}
              </div>
              <div>
                <strong className="dark:text-white">Service:</strong> {row.service}
              </div>
              <div className="col-span-2">
                <strong className="dark:text-white">Description:</strong>
                <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded border dark:border-gray-600 max-h-32 overflow-y-auto break-words whitespace-pre-wrap dark:text-gray-200">
                  {row.description}
                </div>
              </div>
            </div>
          </div>
        )}
        customBodyRender={(row, col) => {
          if (col === "name") {
            const initials = row.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
            return (
              <div className="flex items-center gap-2">
                {row.img ? (
                  <img
                    src={row.img}
                    alt={`${row.name} avatar`}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.style.display = "none"
                      const next = target.nextElementSibling as HTMLElement | null
                      if (next) next.style.display = "flex"
                    }}
                  />
                ) : null}
                <span
                  className={`w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold ${
                    row.img ? "hidden" : ""
                  }`}
                >
                  {initials}
                </span>
                {row.name}
              </div>
            )
          }
          if (col === "status") {
            return (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[row.status as StatusType]
                }`}
              >
                {row.status}
              </span>
            )
          }
          return row[col]
        }}
      />

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 flex gap-6">
        <span>Total Customers: {TableDatas.length}</span>
        <span>Selected: {selectedRowIds.length}</span>
        <span>
          Date Submitted:
          {selectedRowsData.map((d) => d.date || 0, 0).toLocaleString()}
        </span>
        {selectedRowsData.length > 0 && (
          <span>
            Time Submitted:
            {selectedRowsData.map((d) => d.time || 0, 0).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  )
}