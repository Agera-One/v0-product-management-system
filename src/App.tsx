import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import DashboardLayout from "@/layouts/DashboardLayout"
import Dashboard from "@/pages/Dashboard"
import Products from "@/pages/Products"
import Suppliers from "@/pages/Suppliers"
import Selling from "@/pages/Selling"
import Settings from "@/pages/Settings"
import Landing from "@/pages/Landing"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="selling" element={<Selling />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
