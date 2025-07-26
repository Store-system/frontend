"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Plus, Edit, Trash2, CalendarIcon, CheckCircle, XCircle } from "lucide-react"

interface Shift {
  id: string
  employeeName: string
  employeeId: string
  date: string
  startTime: string
  endTime: string
  position: string
  status: "scheduled" | "completed" | "missed"
  hours: number
}

interface Employee {
  id: string
  name: string
  position: string
  hourlyRate: number
}

export default function ShiftsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [employees] = useState<Employee[]>([
    { id: "1", name: "María García", position: "Cajera", hourlyRate: 85 },
    { id: "2", name: "Juan Pérez", position: "Supervisor", hourlyRate: 120 },
    { id: "3", name: "Ana López", position: "Cajera", hourlyRate: 85 },
    { id: "4", name: "Carlos Ruiz", position: "Almacenista", hourlyRate: 95 },
    { id: "5", name: "Laura Martín", position: "Vendedora", hourlyRate: 90 },
  ])

  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: "1",
      employeeName: "María García",
      employeeId: "1",
      date: "2024-01-15",
      startTime: "08:00",
      endTime: "16:00",
      position: "Cajera",
      status: "completed",
      hours: 8,
    },
    {
      id: "2",
      employeeName: "Juan Pérez",
      employeeId: "2",
      date: "2024-01-15",
      startTime: "09:00",
      endTime: "18:00",
      position: "Supervisor",
      status: "completed",
      hours: 9,
    },
    {
      id: "3",
      employeeName: "Ana López",
      employeeId: "3",
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "22:00",
      position: "Cajera",
      status: "scheduled",
      hours: 8,
    },
    {
      id: "4",
      employeeName: "Carlos Ruiz",
      employeeId: "4",
      date: "2024-01-16",
      startTime: "06:00",
      endTime: "14:00",
      position: "Almacenista",
      status: "scheduled",
      hours: 8,
    },
  ])

  const [newShift, setNewShift] = useState({
    employeeId: "",
    date: "",
    startTime: "",
    endTime: "",
    position: "",
  })

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getShiftsForDate = (date: string) => {
    return shifts.filter((shift) => shift.date === date)
  }

  const getTodayShifts = () => {
    const today = formatDate(new Date())
    return getShiftsForDate(today)
  }

  const getSelectedDateShifts = () => {
    const dateStr = formatDate(selectedDate)
    return getShiftsForDate(dateStr)
  }

  const calculateHours = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  const handleAddShift = () => {
    if (newShift.employeeId && newShift.date && newShift.startTime && newShift.endTime) {
      const employee = employees.find((emp) => emp.id === newShift.employeeId)
      if (employee) {
        const hours = calculateHours(newShift.startTime, newShift.endTime)
        const shift: Shift = {
          id: Date.now().toString(),
          employeeName: employee.name,
          employeeId: newShift.employeeId,
          date: newShift.date,
          startTime: newShift.startTime,
          endTime: newShift.endTime,
          position: employee.position,
          status: "scheduled",
          hours,
        }
        setShifts([...shifts, shift])
        setNewShift({ employeeId: "", date: "", startTime: "", endTime: "", position: "" })
        setIsAddDialogOpen(false)
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Programado</Badge>
      case "missed":
        return <Badge variant="destructive">Faltó</Badge>
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "missed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const totalHoursToday = getTodayShifts().reduce((sum, shift) => sum + shift.hours, 0)
  const activeEmployeesToday = getTodayShifts().length
  const completedShiftsToday = getTodayShifts().filter((shift) => shift.status === "completed").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Turnos</h1>
          <p className="text-gray-600">Administra horarios y turnos del personal</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Programar Turno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programar Nuevo Turno</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="employee">Empleado</Label>
                <Select
                  value={newShift.employeeId}
                  onValueChange={(value) => setNewShift({ ...newShift, employeeId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={newShift.date}
                  onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Hora de Fin</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddShift} className="w-full">
                Programar Turno
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados Hoy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployeesToday}</div>
            <p className="text-xs text-muted-foreground">empleados programados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHoursToday}h</div>
            <p className="text-xs text-muted-foreground">horas programadas hoy</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnos Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedShiftsToday}</div>
            <p className="text-xs text-muted-foreground">de {activeEmployeesToday} programados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Selected Date Shifts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Turnos para{" "}
              {selectedDate.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getSelectedDateShifts().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay turnos programados para esta fecha</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getSelectedDateShifts().map((shift) => (
                  <div key={shift.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(shift.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{shift.employeeName}</h4>
                        <p className="text-sm text-gray-600">{shift.position}</p>
                        <p className="text-sm text-gray-500">
                          {shift.startTime} - {shift.endTime} ({shift.hours}h)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(shift.status)}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Horario de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          {getTodayShifts().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay turnos programados para hoy</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getTodayShifts().map((shift) => (
                <div key={shift.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{shift.employeeName}</h4>
                    {getStatusBadge(shift.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{shift.position}</p>
                  <p className="text-sm text-gray-500">
                    {shift.startTime} - {shift.endTime}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">{shift.hours} horas programadas</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
