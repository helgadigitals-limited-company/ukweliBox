import Header from "./components/Header"
import CustomerFeedbackPage from "./pages/CustomerFeedbackPage"
import AdminLogin from "./pages/AdminLoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPage from "./pages/AdminPage"
import AdminHeader from "./components/AdminHeader"
import { useAuth } from "./components/AuthContext"
import { AuthProvider } from "./components/AuthContext"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner"

function ClientLayout({children}: {children: React.ReactNode }) {
  return (
    <>
     <Header slogan/>
     {children}
    </>
  )
}

function AdminLayout({children}: {children: React.ReactNode}) {
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
      <ClientLayout>
          <CustomerFeedbackPage/>
      </ClientLayout>
    ),
  },
  {
    path:'/admin-login',
    element:(
      <ClientLayout>
          <AdminLogin/>
      </ClientLayout>
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
          <AdminLayout>
             <AdminPage/>
          </AdminLayout> 
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
