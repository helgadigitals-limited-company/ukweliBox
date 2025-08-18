import Header from "./components/Header"
import FeedbackForm from "./pages/FeedbackForm"
import AdminLogin from "./pages/AdminLogin"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPage from "./pages/AdminPage"
import AdminHeader from "./components/AdminHeader"
import { useAuth } from "./components/AuthContext"
import { AuthProvider } from "./components/AuthContext"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner"

function WithHeader({children}: {children: React.ReactNode }) {
  return (
    <>
     <Header slogan/>
     {children}
    </>
  )
}

function WithAdminHeader({children}: {children: React.ReactNode}) {
  const { adminName } = useAuth()
  return(
    <>
      <AdminHeader adminName={adminName ?? "Admin"}/>
      {children}
    </>
  )
}



export default function App() {
  
 const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithHeader>
          <FeedbackForm/>
      </WithHeader>
    ),
  },
  {
    path:'/admin-login',
    element:(
      <WithHeader>
          <AdminLogin/>
      </WithHeader>
  )
    
  },
  {
    path:'*',
    element:<NotFoundPage/>
  },
  {
     path:'/admin',
     element: (
        <ProtectedRoute>
          <WithAdminHeader>
             <AdminPage/>
          </WithAdminHeader> 
        </ProtectedRoute>
     )
  }
])




  return (
    <>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center"/>
    </AuthProvider>
    </>
  )
} 
