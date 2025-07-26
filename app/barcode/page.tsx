"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scan, Search, Package, ShoppingCart, Plus, Minus, Check } from "lucide-react"

interface ScannedProduct {
  id: string
  name: string
  barcode: string
  price: number
  stock: number
  quantity: number
}

export default function BarcodePage() {
  const [barcodeInput, setBarcodeInput] = useState("")
  const [scannedProducts, setScannedProducts] = useState<ScannedProduct[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [lastScanned, setLastScanned] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Simulación de base de datos de productos
  const productDatabase = {
    "7501055363057": { id: "1", name: "Coca Cola 500ml", price: 15.5, stock: 45 },
    "7501000125456": { id: "2", name: "Pan Integral", price: 32.0, stock: 28 },
    "7501020145789": { id: "3", name: "Leche Entera 1L", price: 22.5, stock: 33 },
    "7501030987654": { id: "4", name: "Arroz 1kg", price: 28.0, stock: 52 },
    "7501040123789": { id: "5", name: "Aceite Vegetal 1L", price: 45.0, stock: 18 },
    "7501050456123": { id: "6", name: "Azúcar 1kg", price: 25.5, stock: 35 },
  }

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (barcodeInput.trim()) {
      processBarcode(barcodeInput.trim())
      setBarcodeInput("")
    }
  }

  const processBarcode = (barcode: string) => {
    const product = productDatabase[barcode as keyof typeof productDatabase]

    if (product) {
      setLastScanned(barcode)
      const existingProduct = scannedProducts.find((p) => p.barcode === barcode)

      if (existingProduct) {
        setScannedProducts((prev) => prev.map((p) => (p.barcode === barcode ? { ...p, quantity: p.quantity + 1 } : p)))
      } else {
        const newScannedProduct: ScannedProduct = {
          ...product,
          barcode,
          quantity: 1,
        }
        setScannedProducts((prev) => [...prev, newScannedProduct])
      }
    } else {
      alert("Producto no encontrado en la base de datos")
    }
  }

  const updateQuantity = (barcode: string, change: number) => {
    setScannedProducts(
      (prev) =>
        prev
          .map((p) => {
            if (p.barcode === barcode) {
              const newQuantity = Math.max(0, p.quantity + change)
              return newQuantity === 0 ? null : { ...p, quantity: newQuantity }
            }
            return p
          })
          .filter(Boolean) as ScannedProduct[],
    )
  }

  const removeProduct = (barcode: string) => {
    setScannedProducts((prev) => prev.filter((p) => p.barcode !== barcode))
  }

  const getTotalAmount = () => {
    return scannedProducts.reduce((total, product) => total + product.price * product.quantity, 0)
  }

  const getTotalItems = () => {
    return scannedProducts.reduce((total, product) => total + product.quantity, 0)
  }

  const startScanning = () => {
    setIsScanning(true)
    inputRef.current?.focus()
    // Simular escáner activo
    setTimeout(() => {
      setIsScanning(false)
    }, 5000)
  }

  const processSale = () => {
    if (scannedProducts.length > 0) {
      alert(`Venta procesada por $${getTotalAmount().toFixed(2)}`)
      setScannedProducts([])
      setLastScanned("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Escáner de Código de Barras</h1>
        <p className="text-gray-600">Escanea productos para ventas rápidas o gestión de inventario</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Escáner de Códigos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Manual Input */}
              <form onSubmit={handleBarcodeSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Código de Barras</label>
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      type="text"
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      placeholder="Escanea o ingresa el código..."
                      className="font-mono"
                      autoFocus
                    />
                    <Button type="submit" variant="outline">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>

              {/* Scanner Button */}
              <Button
                onClick={startScanning}
                className={`w-full h-16 text-lg ${isScanning ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <div className="animate-pulse mr-2">🔍</div>
                    Escaneando...
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-6 w-6" />
                    Activar Escáner
                  </>
                )}
              </Button>

              {/* Last Scanned */}
              {lastScanned && (
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    Último código escaneado: <span className="font-mono font-bold">{lastScanned}</span>
                  </AlertDescription>
                </Alert>
              )}

              {/* Quick Access Codes */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Códigos de Prueba</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(productDatabase)
                    .slice(0, 6)
                    .map(([barcode, product]) => (
                      <Button
                        key={barcode}
                        variant="outline"
                        size="sm"
                        onClick={() => processBarcode(barcode)}
                        className="text-xs"
                      >
                        {product.name}
                      </Button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scanned Products */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Productos Escaneados
                </span>
                <Badge variant="secondary">{getTotalItems()} items</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scannedProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay productos escaneados</p>
                  <p className="text-sm">Escanea un código de barras para comenzar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scannedProducts.map((product) => (
                    <div key={product.barcode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                          ${product.price.toFixed(2)} c/u | Stock: {product.stock}
                        </p>
                        <p className="text-xs text-gray-500 font-mono">{product.barcode}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(product.barcode, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{product.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => updateQuantity(product.barcode, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <div className="ml-2 text-right">
                          <div className="font-medium">${(product.price * product.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total and Actions */}
          {scannedProducts.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>${getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => setScannedProducts([])}>
                      Limpiar Todo
                    </Button>
                    <Button onClick={processSale} className="bg-green-600 hover:bg-green-700">
                      Procesar Venta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
