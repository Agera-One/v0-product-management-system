"use client"

import { motion } from "framer-motion"
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

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

const revenueChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [28000, 32000, 35000, 38000, 42000, 48392],
      borderColor: "rgb(147, 51, 234)",
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointBackgroundColor: "rgb(147, 51, 234)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "rgba(147, 51, 234, 0.5)",
      borderWidth: 1,
      callbacks: {
        label: (context: any) => "Revenue: $" + context.parsed.y.toLocaleString(),
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.05)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)",
        callback: (value: any) => "$" + (value / 1000).toFixed(0) + "k",
      },
    },
  },
}

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

export default function Dashboard() {
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Revenue Trend</h2>
          <div className="h-[300px]">
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
                transition={{ delay: 0.6 + index * 0.1 }}
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
