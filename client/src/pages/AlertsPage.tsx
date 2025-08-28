import { columns } from "../components/Colums"
import DataTable from "@/components/DataTable"
import { TableDatas } from "@/lib/TableData"

export default function AlertsPage () {
 
    const alertsData = TableDatas.filter((data)=> data.category === "alert")  
  return(
      <>
       <h1 className="flex justify-center text-2xl font-bold">Alerts List</h1>
        <DataTable columns={columns} data={alertsData} />
      </>
  
  )
}