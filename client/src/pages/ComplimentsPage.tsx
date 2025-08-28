import {columns} from "../components/Colums"
import DataTable from "@/components/DataTable"
import { TableDatas } from "@/lib/TableData"

export default function ComplimentsPage (){

    const complimentsData = TableDatas.filter((data) => data.category === "compliment")
  return(
     <div>
        <h1 className="flex justify-center text-2xl font-bold">Compliments List</h1>
        <DataTable columns={columns} data={complimentsData} />
    </div>
  
  )
}