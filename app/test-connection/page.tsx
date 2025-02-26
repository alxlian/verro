"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export default function TestConnection() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(data.user)
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : user ? (
        <div>
          <p className="text-green-500">Connected to Supabase.</p>
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className="text-yellow-500">Not logged in. Connection to Supabase successful, but no user session found.</p>
      )}
    </div>
  )
}

