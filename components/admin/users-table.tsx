"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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

  return (
    <div className="rounded-md border border-zinc-800 overflow-x-auto">
      <Table className="mobile-card-table">
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
                <TableCell data-label="Usuario">
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
                <TableCell data-label="Email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-white/60" />
                    <span className="text-white">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell data-label="Teléfono">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white/60" />
                    <span className="text-white">{user.phone || "No especificado"}</span>
                  </div>
                </TableCell>
                <TableCell data-label="Dirección">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white/60" />
                    <span className="text-white text-sm">{user.address || "No especificada"}</span>
                  </div>
                </TableCell>
                <TableCell data-label="Rol">
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
                <TableCell data-label="Registrado">
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
  )
}
