import { useAuth } from "./AuthContext"

export default function AdminPage(){
  const { logout } = useAuth()
   return (
    <div className="p-6">
       <h1> Welcome Admin 🥳🥳🥳🎊🎉🎉 </h1>
       <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={logout}>
        logout
       </button>
    </div>
   )
  
}