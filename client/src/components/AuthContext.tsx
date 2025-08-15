
import { createContext, useContext, useState } from "react"

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, password: string ) => boolean;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> =({ children }) => {

  const [isAdmin, setIsAdmin] = useState(false)

  const login = (email: string, password: string) => {
    if(email === "admin9@helgadigitals.co.tz" && password === "9801234"){
      setIsAdmin(true)
      return true
    }
    return false
  }


 const logout = () => {
   setIsAdmin(false)
  
 }

 return (

  <AuthContext.Provider value={{ isAdmin, login, logout}}>
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