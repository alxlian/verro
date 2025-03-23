"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const redirectUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data: userData, error } = await supabase.from("users").select("role").eq("id", user.id).single()

      if (error) {
        console.error("Error fetching user data:", error)
        return
      }

      if (userData.role === "student") {
        router.push("/student-dashboard")
      } else if (userData.role === "teacher") {
        router.push("/teacher-dashboard")
      } else {
        console.error("Unknown user role")
      }
    }

    redirectUser()
  }, [router])

  return <div>Redirecting...</div>
}

