import api from "@/lib/api"

export interface Transaction {
  id: string
  invoiceId: string
  date: string
  productName: string
  quantity: number
  totalAmount: number
  paymentStatus: "Paid" | "Pending" | "Failed"
}

export const transactionService = {
  // Get all transactions
  getAll: async (): Promise<Transaction[]> => {
    const response = await api.get("/transactions")
    return response.data
  },

  // Get single transaction
  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`)
    return response.data
  },

  // Create new transaction
  create: async (transaction: Omit<Transaction, "id" | "invoiceId">): Promise<Transaction> => {
    const response = await api.post("/transactions", transaction)
    return response.data
  },

  // Filter by date
  filterByDate: async (date: string): Promise<Transaction[]> => {
    const response = await api.get("/transactions", { params: { date } })
    return response.data
  },

  // Get statistics
  getStats: async (): Promise<{
    totalRevenue: number
    totalTransactions: number
    avgOrderValue: number
  }> => {
    const response = await api.get("/transactions/stats")
    return response.data
  },
}
