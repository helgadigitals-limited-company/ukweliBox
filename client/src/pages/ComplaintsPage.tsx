import {DataTable, } from '@helgadigitals/vera-ui'
import { TableDatas } from '@/lib/TableData'

export default function ComplaintsPage() {

   const handleRowClick = (row: (typeof TableDatas)[number]) => {
    console.log("Row clicked:", row);
  };

  

  const isLoading = false;

  const complaintsData = TableDatas.filter((row) => row.category === "complaint");
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Complaints List</h2>
     <DataTable
        className="[&_tr]:border-0 [&_tbody_tr]:border-b-0 [&_tbody_tr:hover]:bg-blue-50 [&_tbody_tr:hover]:transition-colors [&_tbody_tr:hover]:duration-150 [&_thead_th]:font-bold [&_th]:font-bold [&_thead_th]:capitalize [&_th]:capitalize [&_thead_th]:bg-gray-100 [&_th]:bg-gray-100"
        tableData={complaintsData}
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
               <div>
                <strong>Feedback Type:</strong> {row.category}
              </div>
              <div>
                <strong>Description:</strong> {row.description}
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
            const colors = {
              "Pending": "bg-yellow-100 text-yellow-800",
              "Resolved": "bg-green-100 text-green-800",
              "Closed": "bg-red-100 text-red-800",
            };
            return (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[row.status as keyof typeof colors] || "bg-gray-100 text-gray-800"}`}>
                {row.status}
              </span>
            );
          }
         return row[col];

        }}
        />

    </div>
  )
}
