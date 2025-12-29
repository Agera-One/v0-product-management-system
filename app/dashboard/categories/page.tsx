"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AddEditCategoryModal } from "@/components/add-edit-category-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"

type Category = {
  id: string
  name: string
  productCount: number
  color: string
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    productCount: 23,
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Accessories",
    productCount: 15,
    color: "#10b981",
  },
  {
    id: "3",
    name: "Furniture",
    productCount: 8,
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "Office Supplies",
    productCount: 31,
    color: "#8b5cf6",
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setShowAddEditModal(true)
  }

  const handleDelete = (category: Category) => {
    setDeletingCategory(category)
  }

  const confirmDelete = () => {
    if (deletingCategory) {
      setCategories(categories.filter((c) => c.id !== deletingCategory.id))
      setDeletingCategory(null)
    }
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setShowAddEditModal(true)
  }

  const handleSaveCategory = (category: Omit<Category, "id">) => {
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...category, id: editingCategory.id } : c)))
    } else {
      setCategories([...categories, { ...category, id: Date.now().toString() }])
    }
    setShowAddEditModal(false)
    setEditingCategory(null)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">Organize your products by categories</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Button onClick={handleAddCategory} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: category.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(category)}
                    className="flex-1 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(category)}
                    className="px-4 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {categories.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Card className="p-12">
            <div className="text-muted-foreground text-lg mb-2">No categories yet</div>
            <p className="text-sm text-muted-foreground mb-6">Create your first category to organize products</p>
            <Button onClick={handleAddCategory} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Modals */}
      <AddEditCategoryModal
        isOpen={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={confirmDelete}
        productName={deletingCategory?.name || ""}
        itemType="category"
      />
    </div>
  )
}
