import { columns } from "../components/Colums"
import DataTable from "@/components/DataTable"
import { TableDatas } from "@/lib/TableData"

export default function AlertsPage () {
 
    const alertsData = TableDatas.filter((data)=> data.category === "alert")  
  return(
      <div>
       <h1 className="flex justify-center text-2xl font-bold">Alerts List</h1>
      <div className="ml-12 container mx-auto py-10 flex justify-center">
        <DataTable columns={columns} data={alertsData} />
      </div>
      </div>
  )
}