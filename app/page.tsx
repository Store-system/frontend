"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, Clock, Barcode, DollarSign } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    {
      title: "Ventas Hoy",
      value: "$2,450.00",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Productos en Stock",
      value: "1,234",
      change: "-2.3%",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Empleados Activos",
      value: "8",
      change: "+1",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Alertas de Stock",
      value: "15",
      change: "+5",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const quickActions = [
    {
      title: "Nueva Venta",
      description: "Procesar una nueva venta",
      icon: ShoppingCart,
      href: "/sales",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Gestión de Inventario",
      description: "Administrar productos y stock",
      icon: Package,
      href: "/inventory",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Escanear Código",
      description: "Escanear código de barras",
      icon: Barcode,
      href: "/barcode",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Gestión de Turnos",
      description: "Administrar horarios del personal",
      icon: Clock,
      href: "/shifts",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  const recentSales = [
    { id: "#001", customer: "María García", amount: "$45.99", time: "10:30 AM" },
    { id: "#002", customer: "Juan Pérez", amount: "$23.50", time: "10:15 AM" },
    { id: "#003", customer: "Ana López", amount: "$67.25", time: "09:45 AM" },
    { id: "#004", customer: "Carlos Ruiz", amount: "$12.99", time: "09:30 AM" },
  ]

  const lowStockItems = [
    { name: "Coca Cola 500ml", stock: 5, min: 20 },
    { name: "Pan Integral", stock: 8, min: 15 },
    { name: "Leche Entera 1L", stock: 3, min: 10 },
    { name: "Arroz 1kg", stock: 12, min: 25 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Gestión de Tienda</h1>
          <p className="text-gray-600">
            Panel de control principal -{" "}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} desde ayer
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Ventas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{sale.customer}</p>
                      <p className="text-sm text-gray-600">
                        {sale.id} - {sale.time}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {sale.amount}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/sales">Ver Todas las Ventas</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Low Stock Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Alertas de Stock Bajo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Stock actual: {item.stock} | Mínimo: {item.min}
                      </p>
                    </div>
                    <Badge variant="destructive">Bajo Stock</Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/inventory">Gestionar Inventario</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
