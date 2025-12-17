"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import type { Profile } from "@/types"

interface UsersTableProps {
  users: Profile[]
}

export function UsersTable({ users }: UsersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }


  const [expandedUserId, setExpandedUserId] = useState<string | null>(null)

  const toggleUser = (userId: string) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null)
    } else {
      setExpandedUserId(userId)
    }
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block rounded-md border border-zinc-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70">
              <TableHead className="text-white">Usuario</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Teléfono</TableHead>
              <TableHead className="text-white">Dirección</TableHead>
              <TableHead className="text-white">Rol</TableHead>
              <TableHead className="text-white">Registrado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-white">
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-900/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-zinc-700">
                        <AvatarImage src={user.avatar_url || undefined} alt={user.name || "User"} />
                        <AvatarFallback className="bg-zinc-800 text-white">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{user.name || "Sin nombre"}</p>
                        <p className="text-xs text-white/60">ID: {user.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-white/60" />
                      <span className="text-white">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-white/60" />
                      <span className="text-white">{user.phone || "No especificado"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/60" />
                      <span className="text-white text-sm">{user.address || "No especificada"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.role === "admin"
                          ? "bg-forest-900/30 text-forest-300 border-forest-800"
                          : "bg-zinc-800 text-zinc-300 border-zinc-700"
                      }
                    >
                      {user.role === "admin" ? "Administrador" : "Usuario"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-white/60" />
                      <span className="text-white text-sm">{formatDate(user.created_at)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <div className="text-center py-8 text-white bg-zinc-900/50 border border-zinc-800 rounded-lg">
            No hay usuarios registrados
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-700">
                    <AvatarImage src={user.avatar_url || undefined} alt={user.name || "User"} />
                    <AvatarFallback className="bg-zinc-800 text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{user.name || "Sin nombre"}</p>
                    <Badge
                      className={`mt-1 text-[10px] px-1.5 py-0 ${user.role === "admin"
                        ? "bg-forest-900/30 text-forest-300 border-forest-800"
                        : "bg-zinc-800 text-zinc-300 border-zinc-700"
                        }`}
                    >
                      {user.role === "admin" ? "Admin" : "Usuario"}
                    </Badge>
                  </div>
                </div>
              </div>

              {expandedUserId === user.id && (
                <div className="pt-4 border-t border-zinc-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Contacto</p>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="h-3 w-3 text-white/60" />
                      <span className="text-sm text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-white/60" />
                      <span className="text-sm text-white">{user.phone || "No especificado"}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Ubicación</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-white/60" />
                      <span className="text-sm text-white">{user.address || "No especificada"}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Registro</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-white/60" />
                      <span className="text-sm text-white">{formatDate(user.created_at)}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => toggleUser(user.id)}
                className="w-full py-2 text-xs font-medium text-forest-400 hover:text-forest-300 hover:bg-forest-900/10 rounded transition-colors flex items-center justify-center gap-2"
              >
                {expandedUserId === user.id ? "Ocultar detalles" : "Ver detalles"}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}
