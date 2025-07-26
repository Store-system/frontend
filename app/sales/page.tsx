"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, DollarSign, TrendingUp, Calendar, Search, Filter, Plus, Eye } from "lucide-react"

interface Sale {
  id: string
  date: string
  time: string
  customer: string
  items: number
  total: number
  paymentMethod: string
  cashier: string
  status: "completed" | "refunded" | "pending"
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sales] = useState<Sale[]>([
    {
      id: "V001",
      date: "2024-01-15",
      time: "10:30",
      customer: "María García",
      items: 3,
      total: 145.5,
      paymentMethod: "Efectivo",
      cashier: "Ana López",
      status: "completed",
    },
    {
      id: "V002",
      date: "2024-01-15",
      time: "10:15",
      customer: "Juan Pérez",
      items: 2,
      total: 89.99,
      paymentMethod: "Tarjeta",
      cashier: "María García",
      status: "completed",
    },
    {
      id: "V003",
      date: "2024-01-15",
      time: "09:45",
      customer: "Ana López",
      items: 5,
      total: 234.75,
      paymentMethod: "Transferencia",
      cashier: "Juan Pérez",
      status: "completed",
    },
    {
      id: "V004",
      date: "2024-01-15",
      time: "09:30",
      customer: "Carlos Ruiz",
      items: 1,
      total: 45.0,
      paymentMethod: "Efectivo",
      cashier: "Ana López",
      status: "refunded",
    },
    {
      id: "V005",
      date: "2024-01-14",
      time: "18:20",
      customer: "Laura Martín",
      items: 4,
      total: 178.25,
      paymentMethod: "Tarjeta",
      cashier: "María García",
      status: "completed",
    },
    {
      id: "V006",
      date: "2024-01-14",
      time: "17:45",
      customer: "Pedro Sánchez",
      items: 2,
      total: 67.5,
      paymentMethod: "Efectivo",
      cashier: "Juan Pérez",
      status: "completed",
    },
  ])

  const filteredSales = sales.filter(
    (sale) =>
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.cashier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const todaySales = sales.filter((sale) => sale.date === "2024-01-15")
  const totalSalesToday = todaySales.reduce((sum, sale) => sum + sale.total, 0)
  const totalItemsSold = todaySales.reduce((sum, sale) => sum + sale.items, 0)
  const averageTicket = totalSalesToday / todaySales.length || 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>
      case "refunded":
        return <Badge variant="destructive">Reembolsada</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "Efectivo":
        return "bg-green-100 text-green-800"
      case "Tarjeta":
        return "bg-blue-100 text-blue-800"
      case "Transferencia":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Ventas</h1>
          <p className="text-gray-600">Administra y monitorea todas las ventas</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Venta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSalesToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySales.length}</div>
            <p className="text-xs text-muted-foreground">ventas completadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItemsSold}</div>
            <p className="text-xs text-muted-foreground">artículos vendidos hoy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageTicket.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">por transacción</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID, cliente o cajero..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Venta</TableHead>
                  <TableHead>Fecha/Hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead>Cajero</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{sale.date}</div>
                        <div className="text-sm text-gray-500">{sale.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell className="text-center">{sale.items}</TableCell>
                    <TableCell className="font-medium">${sale.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getPaymentMethodColor(sale.paymentMethod)}>{sale.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell>{sale.cashier}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
