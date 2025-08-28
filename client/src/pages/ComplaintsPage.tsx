import {columns} from "../components/Colums"
import DataTable from "@/components/DataTable"
import { TableDatas } from "@/lib/TableData"


export default function CompalintsPage (){
   
     const complaintsData = TableDatas.filter((data)=> data.category === "complaint")
   return(
     <div>
         <h1 className="flex justify-center text-2xl font-bold">Complaints List</h1>
          <DataTable columns={columns} data={complaintsData} />
      </div>
   
   )
}