import { Link } from "react-router-dom"


export default function NotFoundPage(){
   return(
   <div className="min-h-screen flex flex-col items-center justify-center gap-6">
    <p className="text-5xl"> 404 Not Found</p>
        <div className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm" >
        <Link to="/"> Click to return Home</Link>
        </div>
   </div>
   )
}