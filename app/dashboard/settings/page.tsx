"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your application preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">General Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Application Name</label>
              <input
                type="text"
                defaultValue="ProductHub"
                className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Notifications</label>
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-sm text-muted-foreground">Receive email notifications for low stock items</span>
              </div>
            </div>

            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
