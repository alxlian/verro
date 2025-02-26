import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">Learning that adapts to you</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Experience personalized learning powered by AI. Our platform adapts to your learning style, making education
            more effective and engaging.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup?role=student">
              <Button variant="default" size="lg" className="gap-2">
                <GraduationCap className="h-5 w-5" />
                Join as Student
              </Button>
            </Link>
            <Link href="/signup?role=teacher">
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Join as Teacher
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Learning</CardTitle>
              <CardDescription>Adapts to your unique learning style</CardDescription>
            </CardHeader>
            <CardContent>
              Take a learning style assessment and receive personalized content tailored to how you learn best.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Content</CardTitle>
              <CardDescription>Engage with dynamic learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              Experience interactive lessons, videos, and exercises that make learning more engaging and effective.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Monitor your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              Track your progress, identify areas for improvement, and celebrate your learning achievements.
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

