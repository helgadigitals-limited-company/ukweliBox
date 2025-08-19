import { useAuth } from "@/components/AuthContext"
import AdminHeader from "@/components/AdminHeader"

 export const AdminLayout: React.FC<{children: React.ReactNode}> =({children}) => {

    const { adminName } = useAuth()
  return(
  <>
   <AdminHeader adminName={adminName ?? "Admin"}/>
      {children}
  </>
)}

