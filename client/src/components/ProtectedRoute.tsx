import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import React, { type JSX } from "react";

 
 
 const ProtectedRoute: React.FC<{ children: JSX.Element}>= ({children}) => {
  const { isAdmin } = useAuth();

  if(!isAdmin){
    return <Navigate to="/admin-login" />
  }

  return(
  <>
  {children}
  </>
  )
  }
 export default ProtectedRoute
  

  