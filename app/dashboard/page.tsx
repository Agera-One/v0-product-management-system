"use client"

import { motion } from "framer-motion"
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    name: "Total Products",
    value: "248",
    change: "+12%",
    icon: Package,
    color: "text-chart-1",
  },
  {
    name: "Available Stock",
    value: "1,432",
    change: "+8%",
    icon: TrendingUp,
    color: "text-chart-2",
  },
  {
    name: "Out of Stock",
    value: "12",
    change: "-4%",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    name: "Total Value",
    value: "$48,392",
    change: "+18%",
    icon: DollarSign,
    color: "text-chart-4",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

export default function DashboardPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your products.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-4 gap-6 mt-8"
      >
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <motion.div key={stat.name} variants={itemVariants}>
              <Card className="relative overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                      <p className="text-sm text-chart-2 mt-2">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-accent/50 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-sidebar-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    initial={false}
                  />
                </motion.div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "Product added", product: "Wireless Headphones", time: "2 hours ago" },
              { action: "Stock updated", product: "Laptop Stand", time: "4 hours ago" },
              { action: "Product deleted", product: "Old Mouse", time: "6 hours ago" },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.product}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
