
import { useAuth } from "../components/AuthContext"

export default function AdminPage(){

  const { logout, adminName } = useAuth()
   return (
    <div >
      
      <div className="p-6">
       <h1> Welcome, {adminName ?? "Admin"} </h1>
       </div>
       <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={logout}>
        logout
       </button>
    </div>
   )
  
}