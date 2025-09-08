import CustomerFeedbackPage from "./pages/CustomerFeedbackPage"
import AdminLogin from "./pages/AdminLoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPage from "./pages/AdminPage"
import AlertsPage from "./pages/AlertsPage"
import ComplaintsPage from "./pages/ComplaintsPage"
import ComplimentsPage from "./pages/ComplimentsPage"
import SettingsPage from "./pages/SettingsPage"
import  AdminLayout  from "./Layouts/AdminLayout"
import { ClientLayout } from "./Layouts/ClientLayout"
import { AuthProvider } from "./components/AuthContext"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner"
import SuggestionPage from "./pages/SuggestionsPage"

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
          <AdminLayout/>
        </ProtectedRoute>
     ),
     children: [
          {
            index: true,
            element: <AdminPage/>
          },
          {
            path: 'dashboard',
            element: <AdminPage/>
          },
          {
            path: 'suggestions',
            element: <SuggestionPage/>
          },
          {
            path: 'alerts',
            element: <AlertsPage/>
          },
          {
            path: 'complaints',
            element: <ComplaintsPage/>
          },
          {
            path: 'compliments',
            element: <ComplimentsPage/>
          },
          {
            path: 'settings',
            element: <SettingsPage/>
          }
     ]
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
