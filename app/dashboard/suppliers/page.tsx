"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pencil, Trash2, Users, CheckCircle, XCircle, TrendingUp, Search, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddEditSupplierModal } from "@/components/add-edit-supplier-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

type Supplier = {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  status: "Active" | "Inactive"
}

const initialSuppliers: Supplier[] = [
  {
    id: "1",
    name: "TechHub Distributors",
    contactPerson: "John Smith",
    email: "john@techhub.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
  },
  {
    id: "2",
    name: "Global Electronics Co.",
    contactPerson: "Sarah Johnson",
    email: "sarah@globalelec.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
  },
  {
    id: "3",
    name: "Premium Supplies Ltd.",
    contactPerson: "Mike Chen",
    email: "mike@premiumsupplies.com",
    phone: "+1 (555) 345-6789",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Accessory Masters",
    contactPerson: "Emma Davis",
    email: "emma@accessorymasters.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
  },
]

const performanceChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Deliveries",
      data: [45, 52, 48, 61, 55, 68],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
      borderWidth: 2,
      pointBackgroundColor: "rgb(239, 68, 68)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      yAxisID: "y",
    },
    {
      label: "Rating",
      data: [4.2, 4.5, 4.3, 4.6, 4.4, 4.7],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.4,
      borderWidth: 2,
      pointBackgroundColor: "rgb(34, 197, 94)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      yAxisID: "y1",
    },
  ],
}

const performanceChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "rgba(255, 255, 255, 0.8)",
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
      },
      min: 0,
      max: 5,
    },
  },
}

const ordersChartData = {
  labels: ["TechHub", "Global Elec", "Premium", "Accessory M"],
  datasets: [
    {
      label: "Orders",
      data: [145, 132, 98, 116],
      backgroundColor: [
        "rgba(251, 146, 60, 0.8)",
        "rgba(14, 165, 233, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(132, 204, 22, 0.8)",
      ],
      borderColor: ["rgb(251, 146, 60)", "rgb(14, 165, 233)", "rgb(236, 72, 153)", "rgb(132, 204, 22)"],
      borderWidth: 2,
      borderRadius: 8,
    },
  ],
}

const ordersChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
  },
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [deletingSupplier, setDeletingSupplier] = useState<Supplier | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setShowAddEditModal(true)
  }

  const handleDelete = (supplier: Supplier) => {
    setDeletingSupplier(supplier)
  }

  const confirmDelete = () => {
    if (deletingSupplier) {
      setSuppliers(suppliers.filter((s) => s.id !== deletingSupplier.id))
      setDeletingSupplier(null)
    }
  }

  const handleAddSupplier = () => {
    setEditingSupplier(null)
    setShowAddEditModal(true)
  }

  const handleSaveSupplier = (supplier: Omit<Supplier, "id">) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map((s) => (s.id === editingSupplier.id ? { ...supplier, id: editingSupplier.id } : s)))
    } else {
      setSuppliers([...suppliers, { ...supplier, id: Date.now().toString() }])
    }
    setShowAddEditModal(false)
    setEditingSupplier(null)
  }

  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter((s) => s.status === "Active").length
  const inactiveSuppliers = suppliers.filter((s) => s.status === "Inactive").length

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Suppliers</h1>
        <p className="text-muted-foreground mt-1">Manage your supplier relationships</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-4 gap-6 mb-8"
      >
        {[
          { name: "Total Suppliers", value: totalSuppliers.toString(), icon: Users, color: "text-chart-1" },
          { name: "Active", value: activeSuppliers.toString(), icon: CheckCircle, color: "text-chart-2" },
          { name: "Inactive", value: inactiveSuppliers.toString(), icon: XCircle, color: "text-muted-foreground" },
          { name: "Avg Performance", value: "4.5/5", icon: TrendingUp, color: "text-chart-4" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Card className="p-6 relative overflow-hidden group">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-accent/50 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-sidebar-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-6 mb-8"
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Supplier Performance Trend</h3>
          <div className="h-[250px]">
            <Line data={performanceChartData} options={performanceChartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Orders by Supplier</h3>
          <div className="h-[250px]">
            <Bar data={ordersChartData} options={ordersChartOptions} />
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search suppliers by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/60 border border-input hover:border-primary/50 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground text-sm transition-all"
                />
              </div>
            </div>
            <Button onClick={handleAddSupplier} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Supplier
            </Button>
          </div>

          {filteredSuppliers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Supplier Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact Person</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredSuppliers.map((supplier, index) => (
                      <motion.tr
                        key={supplier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border hover:bg-accent/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-foreground">{supplier.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{supplier.contactPerson}</td>
                        <td className="px-6 py-4 text-muted-foreground">{supplier.email}</td>
                        <td className="px-6 py-4 text-muted-foreground">{supplier.phone}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                              supplier.status === "Active"
                                ? "bg-chart-2/20 text-chart-2"
                                : "bg-muted/50 text-muted-foreground"
                            }`}
                          >
                            {supplier.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(supplier)}
                              className="p-2 hover:bg-accent rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(supplier)}
                              className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="text-muted-foreground text-lg mb-2">No suppliers found</div>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? "Try adjusting your search" : "Add your first supplier to get started"}
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>

      <AddEditSupplierModal
        isOpen={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false)
          setEditingSupplier(null)
        }}
        onSave={handleSaveSupplier}
        supplier={editingSupplier}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingSupplier}
        onClose={() => setDeletingSupplier(null)}
        onConfirm={confirmDelete}
        productName={deletingSupplier?.name || ""}
        itemType="supplier"
      />
    </div>
  )
}
