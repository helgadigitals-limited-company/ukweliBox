import {Button, DataTable, } from '@helgadigitals/vera-ui'
import { TableDatas } from '@/lib/TableData'
import { useState,useMemo } from 'react';
import { statusColors, statusLabels, type StatusType, selectStatus} from '@/lib/StatusColors'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function ComplimentsPage() {
   const [selectedRowIds, setSelectedRowIds] = useState<Array<string | number>>([]);
   const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

   const handleRowClick = (row: (typeof TableDatas)[number]) => {
    console.log("Row clicked:", row);
  };

   const selectedRowsData = useMemo(() => {
    console.log("selectedRowIds:", selectedRowIds); // Debug log
    console.log("tableData length:", TableDatas.length); // Debug log
    const filtered = TableDatas.filter(customer => 
      selectedRowIds.includes(customer.id)
    );
    console.log("selectedRowsData:", filtered); // Debug log
    return filtered;
  }, [selectedRowIds]);
  
  const handleSelectionChange = (ids: Array<string | number>) => {
    console.log("Selection changed to:", ids); // Debug log
    setSelectedRowIds(ids);
  };

  const isLoading = false;

   const handleClearSelection = () => {
    setSelectedRowIds([]);
  };

  // Handle status change
  const handleStatusChange = (newStatus: "Pending" | "Resolved" | "Closed" | "Received") => {
    if (selectedRowIds.length === 0) {
      toast.error("No items selected");
      return;
    }

    // Update the status in TableDatas
    selectedRowIds.forEach(selectedId => {
      const itemIndex = TableDatas.findIndex(item => item.id === selectedId);
      if (itemIndex !== -1) {
        TableDatas[itemIndex].status = newStatus;
      }
    });

    // Show success message
     toast.success(
      <span>
        Status updated to{" "}
        <span className={`px-2 py-1 rounded text-sm ${statusColors[newStatus as StatusType]}`}>
          {statusLabels[newStatus as StatusType]}
        </span>{" "}
        for {selectedRowIds.map(id => TableDatas.find(item => item.id === id)?.name).join(", ")}
      </span>
    );


    // Clear selection
    setSelectedRowIds([]);
    setIsStatusDropdownOpen(false);
  };

  const complimentsData = TableDatas.filter((row) => row.category === "compliment");

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Compliments List</h2>

      {/* Show selected employees details */}
      {selectedRowsData.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">
            Selected Customers ({selectedRowsData.length})
          </h3>
          
          
          {/* Selected employees list */}
          <div className="mb-4 max-h-32 overflow-y-auto">
            <ul className="space-y-1">
          {selectedRowsData.map(customer => (       
              <li
                key={customer.id}
                className="text-sm text-black-700 flex items-center justify-between bg-white px-2 py-1 rounded"
              >
                {/* Left side: name, date, time */}
                <div className="flex items-center gap-5 font-bold">
                  <strong>{customer.name} ({customer.category}) - </strong>
                  <div>{`Date Submitted: ${customer.date}`}</div>
                  <div>{`Time Of Submission: ${customer.time}`}</div>
                </div>

              
                <div className="flex items-center gap-6 font-bold">
                  <div className={`px-2 py-1 rounded ${statusColors[customer.status as keyof typeof statusColors]}`}
                  >
                    Status: {customer.status}
                  </div>
                  <Button
                    onClick={() =>
                      setSelectedRowIds(prev => prev.filter(id => id !== customer.id))
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
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-950 transition-colors"
              onClick={handleClearSelection}
            >
              Clear Selection({selectedRowIds.length})
            </Button>
            
            {/* Change Status Dropdown */}
            <div className="relative">
              <Select onValueChange={handleStatusChange} open={isStatusDropdownOpen} onOpenChange={setIsStatusDropdownOpen}>
                <SelectTrigger className="px-3 py-1 text-xs text-white rounded hover:bg-black border-black h-auto">
                  <SelectValue 
                  placeholder="Change Status"
                  className="text-black data-[placeholder]:text-white" 
                  />
                </SelectTrigger>
                <SelectContent className="border-0">
                  <div className="px-2 py-1 text-xs font-semibold text-black border-0">
                    Change Feedback Status
                  </div>
                  {selectStatus.map((status) => (
                  <SelectItem value={status.name} className="text-xs">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${status.color}`}></span>
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
        className="[&_tr]:border-0 [&_tbody_tr]:border-b-0 [&_thead_tr]:border-0 [&_thead]:border-0 [&_tbody_tr:hover]:bg-blue-50 [&_tbody_tr:hover]:transition-colors [&_tbody_tr:hover]:duration-150 [&_thead_th]:font-bold [&_th]:font-bold [&_thead_th]:capitalize [&_th]:capitalize [&_thead_th]:bg-gray-200 [&_th]:bg-gray-200"
        tableData={complimentsData}
        tableColumns={["name","email","phone","date","time","service","status"]}
        excludeColumns={["id"]}
        onRowClick={handleRowClick}
        sortableColumns={["date","time"]}
        defaultSortState={[{ key: "time", direction: "asc" }]}
        manualSort={true}
        multiSort={true}
        enableGlobalFilter={true}
        globalFilterPlaceholder="Search Customers..."
        // filterableColumns={["name","email","phone","service","status"]}

        loading={isLoading}
        loadingComponent={<div>Fetching records...</div>}

        emptyStateComponent={<div>No users found. Add some users first.</div>}
        emptyMessage="Try adjusting your search criteria"
        
        selectable={true}
        selectedRowIds={selectedRowIds}
        selectionMode="single"
        onSelectionChange={handleSelectionChange}
        getRowId={(row) => String(row.id)} // Force string IDs
        
         // Row Expansion
        expandable={true}
        expandOnRowClick={false}
        expandIcon="+"
        collapseIcon="−"
        expandedContent={(row) => (
          <div className="p-4 bg-white rounded border">
            <h4 className="font-semibold mb-2">Customer Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Full Name:</strong> {row.name}
              </div>
              <div>
                <strong>Phone:</strong> {row.phone}
              </div>
              <div>
                <strong>Date Submitted:</strong> {row.date}
              </div>
              <div>
                <strong>Time:</strong> {row.time}
              </div>
              <div>
                <strong>Email:</strong> {row.email}
              </div>
              <div>
                <strong>Service:</strong> {row.service}
              </div>
               <div className="col-span-2">
                <strong>Description:</strong>
                <div className="mt-1 p-2 bg-gray-50 rounded border max-h-32 overflow-y-auto break-words whitespace-pre-wrap">
                  {row.description}
                </div>
             </div>
            
            </div>
          </div>
        )}
       customBodyRender={(row, col) => {
        if (col === "name") {
          const initials = row.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            return (
              <div className="flex items-center gap-2">
              {row.img ? (
                <img 
                  src={row.img} 
                  alt={`${row.name} avatar`}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const next = target.nextElementSibling as HTMLElement | null;
                    if (next) {
                      next.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <span 
                className={`w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold ${row.img ? 'hidden' : ''}`}
              >
                {initials}
              </span>
              {row.name}
            </div>
          );
        }
          
           if (col === "status") {
            // const statusKey = row.status as keyof typeof statusColors;
            return (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status as keyof typeof statusColors]}`}>
                {row.status}
              </span>
            );
          }
         return row[col];

        }}
        />
         {/* Table Stats */}
      <div className="mt-4 text-sm text-gray-600 flex gap-6">
        <span>Total Customers: {TableDatas.length}</span>
        <span>Selected: {selectedRowIds.length}</span>
        <span>Date Submitted:{selectedRowsData.map((date) =>(date.date || 0), 0).toLocaleString()}</span>
        {selectedRowsData.length > 0 && (
          <span>Time Submitted:{selectedRowsData.map((date) =>(date.time || 0), 0).toLocaleString()}</span>
        )}
      </div>

    </div>
  )
}
