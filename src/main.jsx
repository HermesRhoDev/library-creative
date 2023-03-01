// REACT IMPORT \\
import React from 'react'
// CSS IMPORT \\
import './assets/styles/css/global.css'
import './assets/styles/css/index.css'
import ReactDOM from 'react-dom/client'
// ROUTER IMPORT \\
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// PAGES \\
import { Error404 } from './pages/Error404'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Library } from './pages/Library'
// CONTEXT \\
import AuthContextProvider from './context/authContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signin />,
    errorElement: <Error404 />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/library',
    element: <Library />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
  </>
)