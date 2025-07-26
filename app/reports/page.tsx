"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar, Download, BarChart3, PieChart } from "lucide-react"

export default function ReportsPage() {
  const salesData = {
    today: 2450.0,
    yesterday: 2180.5,
    thisWeek: 15680.75,
    lastWeek: 14250.3,
    thisMonth: 68450.25,
    lastMonth: 62180.9,
  }

  const topProducts = [
    { name: "Coca Cola 500ml", sold: 145, revenue: 2247.5 },
    { name: "Pan Integral", sold: 89, revenue: 2848.0 },
    { name: "Leche Entera 1L", sold: 76, revenue: 1710.0 },
    { name: "Arroz 1kg", sold: 65, revenue: 1820.0 },
    { name: "Aceite Vegetal 1L", sold: 42, revenue: 1890.0 },
  ]

  const employeePerformance = [
    { name: "María García", sales: 45, revenue: 3250.75 },
    { name: "Juan Pérez", sales: 38, revenue: 2890.5 },
    { name: "Ana López", sales: 42, revenue: 2650.25 },
    { name: "Carlos Ruiz", sales: 28, revenue: 1980.0 },
  ]

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100
    return growth.toFixed(1)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
          <p className="text-gray-600">Análisis detallado del rendimiento de la tienda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy vs Ayer</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.today.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${Number.parseFloat(calculateGrowth(salesData.today, salesData.yesterday)) >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {Number.parseFloat(calculateGrowth(salesData.today, salesData.yesterday)) >= 0 ? "+" : ""}
                {calculateGrowth(salesData.today, salesData.yesterday)}%
              </Badge>
              <span className="text-xs text-gray-500">vs ayer</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.thisWeek.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${Number.parseFloat(calculateGrowth(salesData.thisWeek, salesData.lastWeek)) >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {Number.parseFloat(calculateGrowth(salesData.thisWeek, salesData.lastWeek)) >= 0 ? "+" : ""}
                {calculateGrowth(salesData.thisWeek, salesData.lastWeek)}%
              </Badge>
              <span className="text-xs text-gray-500">vs semana anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Mes</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.thisMonth.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <Badge
                className={`${Number.parseFloat(calculateGrowth(salesData.thisMonth, salesData.lastMonth)) >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {Number.parseFloat(calculateGrowth(salesData.thisMonth, salesData.lastMonth)) >= 0 ? "+" : ""}
                {calculateGrowth(salesData.thisMonth, salesData.lastMonth)}%
              </Badge>
              <span className="text-xs text-gray-500">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.sold} unidades vendidas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${product.revenue.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">ingresos</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Rendimiento por Empleado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeePerformance.map((employee, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.sales} ventas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${employee.revenue.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">ingresos</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ventas por Día (Últimos 7 días)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Gráfico de barras de ventas diarias</p>
                <p className="text-sm text-gray-400">Integración con biblioteca de gráficos pendiente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Ventas por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Gráfico circular de categorías</p>
                <p className="text-sm text-gray-400">Integración con biblioteca de gráficos pendiente</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$87.50</div>
            <p className="text-xs text-muted-foreground">por transacción</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35.2%</div>
            <p className="text-xs text-muted-foreground">margen de ganancia</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
