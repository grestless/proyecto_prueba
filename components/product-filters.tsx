"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  useEffect(() => {
    setSearch(searchParams.get("search") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set("search", search)
    } else {
      params.delete("search")
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "newest") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    router.push("/products")
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="mb-8 bg-card  rounded-xl shadow-md p-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-olive-600 dark:text-olive-400" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7 border-olive-200 dark:border-olive-700 focus:border-olive-500 dark:focus:border-olive-400 bg-background"
          />
        </div>

        <Select value={searchParams.get("category") || "all"} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-[180px] border-olive-200 dark:border-olive-700 focus:border-olive-500 dark:focus:border-olive-400 bg-background">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Categorías</SelectItem>
            <SelectItem value="Remeras">Remeras</SelectItem>
            <SelectItem value="Pantalones">Pantalones</SelectItem>
            <SelectItem value="Calzado">Calzado</SelectItem>
            <SelectItem value="Accesorios">Accesorios</SelectItem>
          </SelectContent>
        </Select>

        <Select value={searchParams.get("sort") || "newest"} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full md:w-[180px] border-olive-200 dark:border-olive-700 focus:border-olive-500 dark:focus:border-olive-400 bg-background">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más Recientes</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="name">Nombre: A a Z</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="bg-olive-600 hover:bg-olive-700 text-white">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>

        {hasFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            className="border-olive-300 dark:border-olive-600 text-olive-700 dark:text-olive-300 hover:bg-olive-50 dark:hover:bg-olive-900/20 bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        )}
      </form>
    </div>
  )
}
