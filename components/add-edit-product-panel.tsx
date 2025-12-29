"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id">) => void
  product: Product | null
}

export function AddEditProductPanel({ isOpen, onClose, onSave, product }: Props) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setCategory(product.category)
      setPrice(product.price.toString())
      setStock(product.stock.toString())
    } else {
      setName("")
      setCategory("")
      setPrice("")
      setStock("")
    }
    setErrors({})
  }, [product, isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Product name is required"
    if (!category.trim()) newErrors.category = "Category is required"
    if (!price || Number.parseFloat(price) <= 0) newErrors.price = "Valid price is required"
    if (!stock || Number.parseInt(stock) < 0) newErrors.stock = "Valid stock is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave({
      name,
      category,
      price: Number.parseFloat(price),
      stock: Number.parseInt(stock),
      image: `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(name)}`,
    })

    setIsSubmitting(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">{product ? "Edit Product" : "Add Product"}</h2>
              <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name <span className="text-destructive">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 text-foreground transition-all ${
                    errors.name ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category <span className="text-destructive">*</span>
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 text-foreground transition-all ${
                    errors.category ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
                  }`}
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Office Supplies">Office Supplies</option>
                </motion.select>
                {errors.category && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.category}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price ($) <span className="text-destructive">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 text-foreground transition-all ${
                    errors.price ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.price}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stock <span className="text-destructive">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={`w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 text-foreground transition-all ${
                    errors.stock ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
                  }`}
                  placeholder="0"
                />
                {errors.stock && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.stock}
                  </motion.p>
                )}
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-border flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
