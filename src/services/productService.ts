import api from "@/lib/api"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
}

export const productService = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
  },

  // Get single product
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Create new product
  create: async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await api.post("/products", product)
    return response.data
  },

  // Update product
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product)
    return response.data
  },

  // Delete product
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`)
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    const response = await api.get("/products/search", { params: { q: query } })
    return response.data
  },
}
