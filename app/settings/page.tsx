"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Store, Bell, Shield, Palette, Database, Printer, Wifi } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toogle";

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: "Mi Tienda",
    address: "Av. Principal 123, Col. Centro",
    phone: "+52 555 123 4567",
    email: "contacto@mitienda.com",
    taxId: "RFC123456789",
    currency: "MXN",
  })

  const [notifications, setNotifications] = useState({
    lowStock: true,
    dailyReport: true,
    employeeShifts: false,
    systemUpdates: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    receiptPrinter: true,
    barcodeScanner: true,
    cashDrawer: false,
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Administra la configuración de tu tienda y sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Información de la Tienda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Nombre de la Tienda</Label>
              <Input
                id="storeName"
                value={storeSettings.name}
                onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="storeAddress">Dirección</Label>
              <Textarea
                id="storeAddress"
                value={storeSettings.address}
                onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storePhone">Teléfono</Label>
                <Input
                  id="storePhone"
                  value={storeSettings.phone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="storeEmail">Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={storeSettings.email}
                  onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxId">RFC/Tax ID</Label>
                <Input
                  id="taxId"
                  value={storeSettings.taxId}
                  onChange={(e) => setStoreSettings({ ...storeSettings, taxId: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="currency">Moneda</Label>
                <Select
                  value={storeSettings.currency}
                  onValueChange={(value) => setStoreSettings({ ...storeSettings, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                    <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">Guardar Información</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStock">Alertas de Stock Bajo</Label>
                <p className="text-sm text-gray-500">Recibir notificaciones cuando el stock esté bajo</p>
              </div>
              <Switch
                id="lowStock"
                checked={notifications.lowStock}
                onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dailyReport">Reporte Diario</Label>
                <p className="text-sm text-gray-500">Recibir resumen diario de ventas</p>
              </div>
              <Switch
                id="dailyReport"
                checked={notifications.dailyReport}
                onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReport: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="employeeShifts">Recordatorios de Turnos</Label>
                <p className="text-sm text-gray-500">Notificar cambios en horarios de empleados</p>
              </div>
              <Switch
                id="employeeShifts"
                checked={notifications.employeeShifts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, employeeShifts: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="systemUpdates">Actualizaciones del Sistema</Label>
                <p className="text-sm text-gray-500">Notificar sobre actualizaciones disponibles</p>
              </div>
              <Switch
                id="systemUpdates"
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Respaldo Automático</Label>
                <p className="text-sm text-gray-500">Crear respaldos automáticos diarios</p>
              </div>
              <Switch
                id="autoBackup"
                checked={systemSettings.autoBackup}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="receiptPrinter">Impresora de Recibos</Label>
                <p className="text-sm text-gray-500">Habilitar impresión automática de recibos</p>
              </div>
              <Switch
                id="receiptPrinter"
                checked={systemSettings.receiptPrinter}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, receiptPrinter: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="barcodeScanner">Escáner de Códigos</Label>
                <p className="text-sm text-gray-500">Habilitar escáner de códigos de barras</p>
              </div>
              <Switch
                id="barcodeScanner"
                checked={systemSettings.barcodeScanner}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, barcodeScanner: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="cashDrawer">Cajón de Dinero</Label>
                <p className="text-sm text-gray-500">Conectar cajón de dinero automático</p>
              </div>
              <Switch
                id="cashDrawer"
                checked={systemSettings.cashDrawer}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, cashDrawer: checked })}
              />
            </div>
          <div className="flex items-center justify-between">
               <div>
                   <Label htmlFor="themeToggle">Tema Oscuro</Label>
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cambiar entre modo claro y oscuro
                     </p>
                 </div>
                     <ThemeToggle />
           </div>
            
          </CardContent>
        </Card>

        {/* Hardware Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Estado del Hardware
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <Printer className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Impresora Térmica</p>
                  <p className="text-sm text-green-700">Conectada y funcionando</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Base de Datos</p>
                  <p className="text-sm text-green-700">Sincronizada correctamente</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">Escáner de Códigos</p>
                  <p className="text-sm text-yellow-700">Requiere calibración</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Cajón de Dinero</p>
                  <p className="text-sm text-red-700">Desconectado</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              Diagnosticar Hardware
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 bg-transparent">
              <div className="text-center">
                <Database className="h-6 w-6 mx-auto mb-1" />
                <span>Crear Respaldo</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16 bg-transparent">
              <div className="text-center">
                <Settings className="h-6 w-6 mx-auto mb-1" />
                <span>Reiniciar Sistema</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16 text-red-600 hover:text-red-700 bg-transparent">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-1" />
                <span>Restablecer Fábrica</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
