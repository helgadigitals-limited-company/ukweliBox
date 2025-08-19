import CustomerFeedbackPage from "./pages/CustomerFeedbackPage"
import AdminLogin from "./pages/AdminLoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPage from "./pages/AdminPage"
import { AdminLayout } from "./Layouts/AdminLayout"
import { ClientLayout } from "./Layouts/ClientLayout"
import { AuthProvider } from "./components/AuthContext"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner"

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
