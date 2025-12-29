"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Product = {
  id: string
  name: string
  price: number
}

type Transaction = {
  id: string
  invoiceId: string
  date: string
  productName: string
  quantity: number
  totalAmount: number
  paymentStatus: "Paid" | "Pending" | "Failed"
}

const mockProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", price: 129.99 },
  { id: "2", name: "Laptop Stand", price: 49.99 },
  { id: "3", name: "Mechanical Keyboard", price: 159.99 },
  { id: "4", name: "USB-C Hub", price: 39.99 },
  { id: "5", name: "Webcam HD", price: 89.99 },
]

const initialTransactions: Transaction[] = [
  {
    id: "1",
    invoiceId: "INV-2024-001",
    date: "2024-01-15",
    productName: "Wireless Headphones",
    quantity: 2,
    totalAmount: 259.98,
    paymentStatus: "Paid",
  },
  {
    id: "2",
    invoiceId: "INV-2024-002",
    date: "2024-01-16",
    productName: "Laptop Stand",
    quantity: 1,
    totalAmount: 49.99,
    paymentStatus: "Pending",
  },
  {
    id: "3",
    invoiceId: "INV-2024-003",
    date: "2024-01-17",
    productName: "Mechanical Keyboard",
    quantity: 3,
    totalAmount: 479.97,
    paymentStatus: "Paid",
  },
]

export default function SellingPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [dateFilter, setDateFilter] = useState("")

  const selectedProductData = mockProducts.find((p) => p.id === selectedProduct)
  const totalPrice = selectedProductData ? selectedProductData.price * quantity : 0

  const filteredTransactions = dateFilter ? transactions.filter((t) => t.date === dateFilter) : transactions

  const handleAddTransaction = () => {
    if (!selectedProductData || quantity < 1) return

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      invoiceId: `INV-2024-${String(transactions.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      productName: selectedProductData.name,
      quantity,
      totalAmount: totalPrice,
      paymentStatus: "Paid",
    }

    setTransactions([newTransaction, ...transactions])
    setSelectedProduct("")
    setQuantity(1)
  }

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-foreground mb-2">Selling</h1>
        <p className="text-muted-foreground">Create transactions and view sales history</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Transaction Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">New Transaction</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                >
                  <option value="">Choose a product...</option>
                  {mockProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Total Price:</span>
                  <span className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>

                <Button onClick={handleAddTransaction} disabled={!selectedProduct} className="w-full">
                  Add Transaction
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Summary Stats */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Transactions</div>
              <div className="text-3xl font-bold text-foreground">{transactions.length}</div>
            </Card>
            <Card className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Revenue</div>
              <div className="text-3xl font-bold text-foreground">
                ${transactions.reduce((sum, t) => sum + t.totalAmount, 0).toFixed(2)}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Transactions History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-1 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
              />
              {dateFilter && (
                <Button variant="ghost" size="sm" onClick={() => setDateFilter("")}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Invoice ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-accent/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">{transaction.invoiceId}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{transaction.productName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{transaction.quantity}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">${transaction.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            transaction.paymentStatus === "Paid"
                              ? "bg-chart-2/20 text-chart-2"
                              : transaction.paymentStatus === "Pending"
                                ? "bg-chart-4/20 text-chart-4"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {transaction.paymentStatus}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                {dateFilter ? "No transactions found for this date" : "No transactions yet"}
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
