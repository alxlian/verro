"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      if (data.user) {
        // Check if user exists in the users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (userError && userError.code !== "PGRST116") {
          // PGRST116 means no rows returned, which is fine as we'll create the user
          throw userError
        }

        if (!userData) {
          // User doesn't exist in the users table, so let's add them
          const newUserData = {
            id: data.user.id,
            email: data.user.email,
            first_name: data.user.user_metadata.first_name || "",
            last_name: data.user.user_metadata.last_name || "",
            role: data.user.user_metadata.role || "student",
            learning_style: "visual", // Default learning style
          }

          const { error: insertError } = await supabase.from("users").insert(newUserData).select()

          if (insertError) {
            console.error("Error inserting user data:", insertError)
            throw new Error("Failed to create user profile")
          }

          // Use the newly inserted data
          localStorage.setItem("userData", JSON.stringify(newUserData))
        } else {
          // User exists, store the data in localStorage
          localStorage.setItem("userData", JSON.stringify(userData))
        }

        router.push("/dashboard")
      }
    } catch (e) {
      console.error("Login error:", e)
      setError(e instanceof Error ? e.message : "An unknown error occurred")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

