"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Calendar, DollarSign, TrendingUp, Receipt, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedProductData = mockProducts.find((p) => p.id === selectedProduct)
  const totalPrice = selectedProductData ? selectedProductData.price * quantity : 0

  const filteredTransactions = dateFilter ? transactions.filter((t) => t.date === dateFilter) : transactions

  const totalRevenue = transactions.reduce((sum, t) => sum + t.totalAmount, 0)
  const avgOrderValue = transactions.length > 0 ? totalRevenue / transactions.length : 0

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

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const isFormValid = selectedProduct && quantity >= 1

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-2"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Selling</h1>
          <p className="text-muted-foreground">Process transactions and manage sales records</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{currentDate}</span>
        </div>
      </motion.div>

      <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent my-6" />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="mb-6 flex items-center gap-3 px-4 py-3 bg-chart-2/20 border border-chart-2/50 rounded-xl text-chart-2"
          >
            <div className="flex items-center justify-center w-6 h-6 bg-chart-2/30 rounded-full">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">Transaction added successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-2">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-xl">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">New Transaction</h2>
                <p className="text-sm text-muted-foreground">Complete the form to process a sale</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Product <span className="text-destructive">*</span>
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 bg-background border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition-all"
                >
                  <option value="">Choose a product...</option>
                  {mockProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price.toFixed(2)}
                    </option>
                  ))}
                </select>
                {selectedProductData && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Unit price: ${selectedProductData.price.toFixed(2)}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 bg-background border-2 border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition-all"
                  placeholder="Enter quantity"
                />
                {quantity < 1 && <p className="mt-2 text-sm text-destructive">Quantity must be at least 1</p>}
              </div>

              <div className="pt-5 border-t-2 border-dashed border-border">
                <div className="flex items-center justify-between mb-5 p-4 bg-muted/30 rounded-xl">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Total Amount
                  </span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold text-primary"
                  >
                    ${totalPrice.toFixed(2)}
                  </motion.span>
                </div>

                <Button
                  onClick={handleAddTransaction}
                  disabled={!isFormValid}
                  className="w-full py-6 text-base font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isFormValid ? "Process Transaction" : "Complete Form to Continue"}
                </Button>
                {!isFormValid && (
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    Please select a product and enter quantity
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Transactions
              </div>
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <div className="text-4xl font-bold text-foreground">{transactions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time sales</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20 hover:shadow-lg hover:shadow-chart-2/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Revenue</div>
              <DollarSign className="w-5 h-5 text-chart-2" />
            </div>
            <div className="text-4xl font-bold text-foreground">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Gross sales amount</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20 hover:shadow-lg hover:shadow-chart-4/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Avg Order Value</div>
              <TrendingUp className="w-5 h-5 text-chart-4" />
            </div>
            <div className="text-4xl font-bold text-foreground">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Card className="overflow-hidden border-2">
          <div className="p-6 bg-muted/30 border-b-2 border-border flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
              <p className="text-sm text-muted-foreground mt-1">View and filter past transactions</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 bg-background border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground text-sm transition-all"
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
              <thead className="bg-muted/50 border-b-2 border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground uppercase tracking-wider">
                    Status
                  </th>
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
                      className={`border-b border-border hover:bg-primary/5 transition-colors ${
                        index % 2 === 0 ? "bg-muted/20" : "bg-transparent"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono font-medium text-foreground">{transaction.invoiceId}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">{transaction.productName}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-muted rounded-lg font-semibold text-foreground">
                          {transaction.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground text-lg">
                        ${transaction.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            transaction.paymentStatus === "Paid"
                              ? "default"
                              : transaction.paymentStatus === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={`
                            ${transaction.paymentStatus === "Paid" ? "bg-chart-2/20 text-chart-2 border-chart-2/50" : ""}
                            ${transaction.paymentStatus === "Pending" ? "bg-chart-4/20 text-chart-4 border-chart-4/50" : ""}
                          `}
                        >
                          {transaction.paymentStatus}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                    <Receipt className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-lg font-medium text-foreground mb-1">
                  {dateFilter ? "No transactions found" : "No transactions yet"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dateFilter ? "Try selecting a different date" : "Start by creating your first transaction above"}
                </p>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
