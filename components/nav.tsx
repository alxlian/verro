"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface User extends SupabaseUser {
  role?: string
}

export function Nav() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from("users").select("role").eq("id", user.id).single()
        setUser({ ...user, role: data?.role })
      }
    }

    fetchUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/">
        <span className="text-2xl font-bold">Verro</span>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {user ? (
          <>
            <Link href={user.role === "student" ? "/student-dashboard" : "/teacher-dashboard"}>
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/student-dashboard">
              <Button variant="ghost">Student Dashboard (Debug)</Button>
            </Link>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default">Get Started</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

