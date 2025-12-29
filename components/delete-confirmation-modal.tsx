"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productName: string
  itemType?: string // Added optional itemType prop to support different entity types
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName, itemType = "product" }: Props) {
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
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: [0, -5, 5, -5, 5, 0],
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              y: { duration: 0.2 },
              x: { duration: 0.4, delay: 0.2 },
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-destructive/50 rounded-2xl shadow-2xl z-50"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-destructive/20 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                  </h2>
                  <p className="text-muted-foreground mb-1">
                    {`Are you sure you want to delete `}
                    <span className="font-semibold text-foreground">{productName}</span>?
                  </p>
                  <p className="text-sm text-destructive">This action cannot be undone.</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={onConfirm}
                  className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
