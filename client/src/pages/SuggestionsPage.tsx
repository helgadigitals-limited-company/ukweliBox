import { columns } from "../components/Colums"
import  DataTable  from "../components/DataTable"
import { TableDatas } from "../lib/TableData"


export default function SuggestionsPage(){

  const suggestionData = TableDatas.filter((data)=> data.category === "suggestion")
    return (
      <>
        <h1 className="flex justify-center text-2xl font-bold">Suggestions List</h1>
         <DataTable columns={columns} data={suggestionData} />
      
    </>
    )
}
