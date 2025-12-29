"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
}

type Props = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!product) return null

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-sidebar-primary/5 to-transparent pointer-events-none" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">Product Details</h2>
                <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex gap-6">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-48 rounded-xl object-cover"
                  />

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Product Name</label>
                      <p className="text-xl font-bold text-foreground mt-1">{product.name}</p>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Category</label>
                      <p className="text-lg text-foreground mt-1">{product.category}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Price</label>
                        <p className="text-lg font-semibold text-foreground mt-1">${product.price.toFixed(2)}</p>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground">Stock</label>
                        <p
                          className={`text-lg font-semibold mt-1 ${
                            product.stock === 0
                              ? "text-destructive"
                              : product.stock < 20
                                ? "text-chart-4"
                                : "text-chart-2"
                          }`}
                        >
                          {product.stock === 0 ? "Out of Stock" : `${product.stock} units`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Product ID</label>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{product.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
