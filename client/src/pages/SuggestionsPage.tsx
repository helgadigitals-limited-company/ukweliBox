import {Button, DataTable, } from '@helgadigitals/vera-ui'
import { TableDatas } from '@/lib/TableData'
import { useState,useMemo } from 'react';
import { statusColors } from '@/lib/StatusColors'



export default function SuggestionsPage() {
   const [selectedRowIds, setSelectedRowIds] = useState<Array<string | number>>([]);

   const handleRowClick = (row: (typeof TableDatas)[number]) => {
    console.log("Row clicked:", row);
  };

   const selectedRowsData = useMemo(() => {
    console.log("selectedRowIds:", selectedRowIds); // Debug log
    console.log("tableData length:", TableDatas.length); // Debug log
    const filtered = TableDatas.filter(employee => 
      selectedRowIds.includes(employee.id)
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

  const suggestionsData = TableDatas.filter((row) => row.category === "suggestion");
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Suggestions List</h2>
      
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
                  <li key={customer.id} className="text-sm text-black-700 flex items-center justify-between bg-white px-2 py-1 rounded">
                    <span className="flex items-center justify-between gap-5">
                      <strong>{customer.name}</strong> -
                        <div>
                        {`Date Submitted: ${customer.date}`}
                        </div>
                        <div>
                        {`Time Of Submission: ${customer.time}`}
                        </div>
                      <div className={`flex justify-end ml-90 px-2 py-1 rounded `}>
                        Status:{customer.status}
                      </div>
                    </span>
                    <Button
                      onClick={() => setSelectedRowIds([])}
                      className="text-red-500 hover:bg-blue-700 text-xs ml-2"
                      variant={'outline'}
                      size={'icon'}
                    >
                      x
                    </Button>
                  </li>
              ))}
            </ul>
          </div>
          <Button
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              onClick={handleClearSelection}
            >
              Clear Selection
            </Button>
            
        </div>
      )}
     <DataTable
        className="[&_tr]:border-0 [&_tbody_tr]:border-b-0 [&_tbody_tr:hover]:bg-blue-50 [&_tbody_tr:hover]:transition-colors [&_tbody_tr:hover]:duration-150 [&_thead_th]:font-bold [&_th]:font-bold [&_thead_th]:capitalize [&_th]:capitalize [&_thead_th]:bg-gray-100 [&_th]:bg-gray-100"
        tableData={suggestionsData}
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
            const statusKey = row.status as keyof typeof statusColors;
            return (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[statusKey]}`}>
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
