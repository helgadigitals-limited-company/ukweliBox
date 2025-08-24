import { columns } from "../components/Colums"
import  DataTable  from "../components/DataTable"
import { TableDatas } from "../lib/TableData"


export default function SuggestionsPage(){
    return (
      <div>
        <h1 className="flex justify-center text-2xl font-bold">Suggestions List</h1>
       <div className="ml-20 container mx-auto py-10 flex justify-center">
      <DataTable columns={columns} data={TableDatas} />
    </div>
    </div>
    )
}