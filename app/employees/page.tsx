"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, Edit, Trash2, Search, Phone, Mail, MapPin, Clock } from "lucide-react"

interface Employee {
  id: string
  name: string
  position: string
  email: string
  phone: string
  address: string
  hourlyRate: number
  startDate: string
  status: "active" | "inactive" | "vacation"
  hoursWorked: number
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "María García",
      position: "Cajera",
      email: "maria.garcia@tienda.com",
      phone: "+52 555 123 4567",
      address: "Av. Principal 123, Col. Centro",
      hourlyRate: 85,
      startDate: "2023-01-15",
      status: "active",
      hoursWorked: 160,
    },
    {
      id: "2",
      name: "Juan Pérez",
      position: "Supervisor",
      email: "juan.perez@tienda.com",
      phone: "+52 555 234 5678",
      address: "Calle Secundaria 456, Col. Norte",
      hourlyRate: 120,
      startDate: "2022-08-10",
      status: "active",
      hoursWorked: 168,
    },
    {
      id: "3",
      name: "Ana López",
      position: "Cajera",
      email: "ana.lopez@tienda.com",
      phone: "+52 555 345 6789",
      address: "Av. Reforma 789, Col. Sur",
      hourlyRate: 85,
      startDate: "2023-03-20",
      status: "vacation",
      hoursWorked: 152,
    },
    {
      id: "4",
      name: "Carlos Ruiz",
      position: "Almacenista",
      email: "carlos.ruiz@tienda.com",
      phone: "+52 555 456 7890",
      address: "Calle Tercera 321, Col. Este",
      hourlyRate: 95,
      startDate: "2023-02-01",
      status: "active",
      hoursWorked: 144,
    },
    {
      id: "5",
      name: "Laura Martín",
      position: "Vendedora",
      email: "laura.martin@tienda.com",
      phone: "+52 555 567 8901",
      address: "Av. Libertad 654, Col. Oeste",
      hourlyRate: 90,
      startDate: "2023-04-15",
      status: "inactive",
      hoursWorked: 0,
    },
  ])

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    hourlyRate: 0,
    startDate: "",
  })

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const totalPayroll = employees
    .filter((emp) => emp.status === "active")
    .reduce((sum, emp) => sum + emp.hourlyRate * emp.hoursWorked, 0)
  const averageHours =
    employees.filter((emp) => emp.status === "active").reduce((sum, emp) => sum + emp.hoursWorked, 0) /
      activeEmployees || 0

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.email) {
      const employee: Employee = {
        id: Date.now().toString(),
        ...newEmployee,
        status: "active",
        hoursWorked: 0,
      }
      setEmployees([...employees, employee])
      setNewEmployee({
        name: "",
        position: "",
        email: "",
        phone: "",
        address: "",
        hourlyRate: 0,
        startDate: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactivo</Badge>
      case "vacation":
        return <Badge className="bg-blue-100 text-blue-800">Vacaciones</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Empleados</h1>
          <p className="text-gray-600">Administra el personal y sus datos</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Empleado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="Ej: María García"
                />
              </div>
              <div>
                <Label htmlFor="position">Puesto</Label>
                <Select
                  value={newEmployee.position}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, position: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar puesto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cajera">Cajera</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Almacenista">Almacenista</SelectItem>
                    <SelectItem value="Vendedora">Vendedora</SelectItem>
                    <SelectItem value="Gerente">Gerente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  placeholder="empleado@tienda.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  placeholder="+52 555 123 4567"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Tarifa por Hora</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={newEmployee.hourlyRate || ""}
                    onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: Number.parseFloat(e.target.value) })}
                    placeholder="85.00"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Fecha de Inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newEmployee.startDate}
                    onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddEmployee} className="w-full">
                Agregar Empleado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Activos</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground">de {employees.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nómina Mensual</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayroll.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Promedio</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">por empleado</p>
          </CardContent>
        </Card>
      </div>

      {/* Employees List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, puesto o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                      </div>
                    </div>
                    {getStatusBadge(employee.status)}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{employee.address}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Tarifa/Hora</p>
                      <p className="font-semibold">${employee.hourlyRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Horas Mes</p>
                      <p className="font-semibold">{employee.hoursWorked}h</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
