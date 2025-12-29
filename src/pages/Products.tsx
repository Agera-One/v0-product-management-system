"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2, Package, TrendingUp, AlertTriangle, DollarSign, Search, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { AddEditProductPanel } from "@/components/add-edit-product-panel"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { Doughnut, Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    image: "/diverse-people-listening-headphones.png",
  },
  {
    id: "2",
    name: "Laptop Stand",
    category: "Accessories",
    price: 49.99,
    stock: 0,
    image: "/laptop-stand.png",
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 159.99,
    stock: 23,
    image: "/mechanical-keyboard.png",
  },
  {
    id: "4",
    name: "USB-C Hub",
    category: "Accessories",
    price: 39.99,
    stock: 78,
    image: "/usb-hub.png",
  },
  {
    id: "5",
    name: "Webcam HD",
    category: "Electronics",
    price: 89.99,
    stock: 12,
    image: "/classic-webcam.png",
  },
]

const categoryChartData = {
  labels: ["Electronics", "Accessories"],
  datasets: [
    {
      label: "Products",
      data: [3, 2],
      backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(168, 85, 247, 0.8)"],
      borderColor: ["rgb(59, 130, 246)", "rgb(168, 85, 247)"],
      borderWidth: 2,
    },
  ],
}

const categoryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
}

const stockChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Stock",
      data: [140, 150, 145, 138, 142, 157],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
      borderColor: "rgb(16, 185, 129)",
      borderWidth: 2,
      borderRadius: 8,
    },
  ],
}

const stockChartOptions = {
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
      borderColor: "rgba(16, 185, 129, 0.5)",
      borderWidth: 1,
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

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAddEditPanel, setShowAddEditPanel] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setShowDetailModal(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowAddEditPanel(true)
  }

  const handleDelete = (product: Product) => {
    setDeletingProduct(product)
  }

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(products.filter((p) => p.id !== deletingProduct.id))
      setDeletingProduct(null)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowAddEditPanel(true)
  }

  const handleSaveProduct = (product: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p)))
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }])
    }
    setShowAddEditPanel(false)
    setEditingProduct(null)
  }

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const outOfStock = products.filter((p) => p.stock === 0).length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground mt-1">Manage your product inventory</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-4 gap-6 mb-8"
      >
        {[
          { name: "Total Products", value: totalProducts.toString(), icon: Package, color: "text-chart-1" },
          { name: "Total Stock", value: totalStock.toString(), icon: TrendingUp, color: "text-chart-2" },
          { name: "Out of Stock", value: outOfStock.toString(), icon: AlertTriangle, color: "text-destructive" },
          {
            name: "Inventory Value",
            value: `$${totalValue.toFixed(2)}`,
            icon: DollarSign,
            color: "text-chart-4",
          },
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
          <h3 className="text-lg font-semibold text-foreground mb-4">Products by Category</h3>
          <div className="h-[250px] flex items-center justify-center">
            <Doughnut data={categoryChartData} options={categoryChartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Stock Trend (Last 6 Months)</h3>
          <div className="h-[250px]">
            <Bar data={stockChartData} options={stockChartOptions} />
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
                  placeholder="Search products by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/60 border border-input hover:border-primary/50 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground text-sm transition-all"
                />
              </div>
            </div>
            <Button onClick={handleAddProduct} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-accent/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">{product.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                      <td className="px-6 py-4 text-foreground">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock === 0
                              ? "bg-destructive/20 text-destructive"
                              : product.stock < 20
                                ? "bg-chart-4/20 text-chart-4"
                                : "bg-chart-2/20 text-chart-2"
                          }`}
                        >
                          {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleView(product)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(product)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(product)}
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
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                No products found
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />

      <AddEditProductPanel
        isOpen={showAddEditPanel}
        onClose={() => {
          setShowAddEditPanel(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={confirmDelete}
        productName={deletingProduct?.name || ""}
      />
    </div>
  )
}
