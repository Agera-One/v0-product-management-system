import api from "@/lib/api"

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  status: "Active" | "Inactive"
}

export const supplierService = {
  // Get all suppliers
  getAll: async (): Promise<Supplier[]> => {
    const response = await api.get("/suppliers")
    return response.data
  },

  // Get single supplier
  getById: async (id: string): Promise<Supplier> => {
    const response = await api.get(`/suppliers/${id}`)
    return response.data
  },

  // Create new supplier
  create: async (supplier: Omit<Supplier, "id">): Promise<Supplier> => {
    const response = await api.post("/suppliers", supplier)
    return response.data
  },

  // Update supplier
  update: async (id: string, supplier: Partial<Supplier>): Promise<Supplier> => {
    const response = await api.put(`/suppliers/${id}`, supplier)
    return response.data
  },

  // Delete supplier
  delete: async (id: string): Promise<void> => {
    await api.delete(`/suppliers/${id}`)
  },
}
