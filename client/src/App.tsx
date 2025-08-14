import Header from "./components/Header"
import FeedbackForm from "./components/FeedbackForm"
import AdminLogin from "./components/AdminLogin"
import NotFoundPage from "./components/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPage from "./components/AdminPage"
import { AuthProvider } from "./components/AuthContext"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner"
export default function App() {
  
 const router = createBrowserRouter([
  {
    path: '/',
    element: <FeedbackForm/>,
    errorElement:<NotFoundPage/>
  },
  {
    path:'/admin-login',
    element: <AdminLogin/>
    
  },
  {
     path:'/admin',
     element: (
     <ProtectedRoute>
      <AdminPage/>
    </ProtectedRoute>
     )
  }
])




  return (
    <>
    <AuthProvider>
    <Header />
    <RouterProvider router={router} />
    <Toaster position="top-center"/>
    </AuthProvider>
    </>
  )
} 
