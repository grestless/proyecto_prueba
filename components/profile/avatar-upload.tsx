"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import toast from "react-hot-toast"
import type { Profile } from "@/types"

interface AvatarUploadProps {
  profile: Profile
}

export function AvatarUpload({ profile }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      const file = e.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${profile.id}/avatar.${fileExt}`

      setUploading(true)

      const supabase = createClient()

      // Upload image to storage
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: true,
      })

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id)

      if (updateError) throw updateError

      toast.success("Foto de perfil actualizada")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error uploading avatar:", error)
      toast.error("Error al subir la foto")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative inline-block">
      <Avatar className="h-24 w-24 border-4 border-emerald-100">
        <AvatarImage src={profile.avatar_url || undefined} alt={profile.name || "User"} />
        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
      <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 cursor-pointer">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
          <Camera className="h-4 w-4" />
        </div>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  )
}
