import { createContext, useContext, useState } from "react"

interface AuthContextType {
  isAdmin: boolean;
  adminName: string | null
  login: (email: string, password: string ) => boolean;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType>({
    isAdmin:false,
    adminName: null,
    login: () => false,
    logout: () => {},
})

export const AuthProvider: React.FC<{children: React.ReactNode}> =({ children }) => {

  const [isAdmin, setIsAdmin] = useState(false)
  const [adminName, setAdminName] = useState<string | null>(null)

  const login = (email: string, password: string) => {
    if(email === "Lemasani@helgadigitals.co.tz" && password === "98012345"){
      setIsAdmin(true)
      setAdminName(email.split("@")[0])
      return true
    }
    return false
  }


 const logout = () => {
   setIsAdmin(false)
   setAdminName(null)
  
 }

 return (

  <AuthContext.Provider value={{ isAdmin, adminName, login, logout}}>
     {children}
  </AuthContext.Provider>
 )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
   const context = useContext(AuthContext)
   if(!context) throw new Error ("useAuth must be used within AuthProvider")
    return context;
}