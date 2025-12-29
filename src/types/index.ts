export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  status: "Active" | "Inactive"
}

export interface Transaction {
  id: string
  invoiceId: string
  date: string
  productName: string
  quantity: number
  totalAmount: number
  paymentStatus: "Paid" | "Pending" | "Failed"
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}
