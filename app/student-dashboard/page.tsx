"use client"

import { useState, useEffect } from "react"
import {
  Clock,
  ArrowRight,
  Calculator,
  ActivityIcon as Function,
  Sigma,
  Divide,
  BookOpen,
  Users,
  Globe,
  Code,
  FileText,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { PDFUploadModal } from "@/components/pdf-upload-modal"

interface UserData {
  id: string
  first_name: string
  last_name: string
  role: string
  pixels_earned: number
  practice_days: number
}

export default function StudentDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)
  const [generatedCourses, setGeneratedCourses] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (userError) {
        console.error("Error fetching user data:", userError)
        return
      }

      setUserData(userData)

      // Fetch generated courses
      const { data: coursesData, error: coursesError } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", user.id)

      if (coursesError) {
        console.error("Error fetching generated courses:", coursesError)
      } else {
        setGeneratedCourses(coursesData)
      }
    }

    fetchUserData()
  }, [router])

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]
  const today = new Date().getDay() // 0 is Sunday, 1 is Monday, etc.
  const leaderboardData = [
    { name: "Peter Piper", role: "Math Whiz", points: "15000pts" },
    { name: "Sarah Blake", role: "Vector Master", points: "1254pts" },
    { name: "Mohammad Allure", role: "Calculus Pro", points: "1500pts" },
    { name: "Kelly Lee", role: "Algebra Expert", points: "500pts" },
  ]

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="relative">
          <Input type="search" placeholder="Search" className="w-[300px] pl-8" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0014 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">
        <div className="space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Next Lesson</h2>
              <span className="text-sm text-muted-foreground">
                From{" "}
                <Button variant="link" className="p-0 h-auto">
                  Vector Mathematics
                </Button>
              </span>
            </div>
            <Card className="p-4">
              <Link href="/lessons/intro-to-vectors" className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Intro to Vectors</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> 15 min
                    </span>
                    <span className="flex items-center gap-1">
                      <Function className="w-4 h-4" /> 10 exercises
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Skill Tests</h2>
              <Button variant="link" className="p-0 h-auto">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Algebraic Vectors</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>10 min</span>
                      <span>10 questions</span>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dot Product</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>10 min</span>
                      <span>10 questions</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Challenges</h2>
              <Button variant="link" className="p-0 h-auto">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sigma className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Factorials</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-muted">Medium</span>
                      <span>3 days</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0/5 lessons</span>
                  <span>Not started</span>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Divide className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Permutations</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-muted">Hard</span>
                      <span>5 days</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0/7 lessons</span>
                  <span>Not started</span>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Courses</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-primary text-primary-foreground">
                  All
                </Button>
                <Button variant="outline">Advanced</Button>
                <Button variant="outline">Intermediate</Button>
                <Button variant="outline">Beginner</Button>
                <Button variant="outline" onClick={() => setIsPDFModalOpen(true)}>
                  Convert PDF to Course
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Function className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">COURSE</p>
                  <h3 className="font-semibold">Advanced Functions</h3>
                  <p className="text-sm text-muted-foreground">
                    Master advanced mathematical functions and their applications in real-world scenarios.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>Advanced</span>
                    <span>•</span>
                    <span>40 hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sigma className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">COURSE</p>
                  <h3 className="font-semibold">Calculus</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn differentiation, integration, and their applications in solving complex problems.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>Advanced</span>
                    <span>•</span>
                    <span>48 hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">COURSE</p>
                  <h3 className="font-semibold">English</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop advanced writing, reading, and analytical skills through literature and composition.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>Intermediate</span>
                    <span>•</span>
                    <span>36 hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">COURSE</p>
                  <h3 className="font-semibold">Business Leadership</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn essential leadership skills and strategies for successful business management.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>Advanced</span>
                    <span>•</span>
                    <span>32 hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">COURSE</p>
                  <h3 className="font-semibold">International Business</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore global markets, cross-cultural management, and international trade principles.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>Intermediate</span>
                    <span>•</span>
                    <span>30 hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">COURSE</p>
                  <h3 className="font-semibold">Computer Science</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn programming fundamentals, algorithms, and computer systems architecture.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <span>Beginner</span>
                    <span>•</span>
                    <span>45 hours</span>
                  </div>
                </div>
              </Card>
              <Link href="/courses/personality-and-brands">
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">PDF UPLOAD</p>
                    <h3 className="font-semibold">Personality and Brands</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore the fascinating world of personality traits and their impact on brand perception and
                      consumer behavior.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                      <span>Intermediate</span>
                      <span>•</span>
                      <span>3 hours</span>
                    </div>
                  </div>
                </Card>
              </Link>
              {generatedCourses.map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">PDF GENERATED COURSE</p>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.description || "A course generated from uploaded PDF content."}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                      <span>{course.difficulty || "Mixed"}</span>
                      <span>•</span>
                      <span>{course.duration || "Varies"}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Learning Goals</h2>
              <Button variant="link" className="p-0 h-auto">
                Edit
              </Button>
            </div>
            <Card className="p-4">
              <h3 className="font-semibold mb-4">5 day goal</h3>
              <div className="flex justify-between mb-4">
                {weekDays.map((day, i) => (
                  <div
                    key={day}
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${i === today - 1 ? "bg-primary text-primary-foreground" : "bg-muted"}
                    `}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                    <Clock className="w-3 h-3 text-primary" />
                  </div>
                  <span>You practiced {userData?.practice_days || 4} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                    <Calculator className="w-3 h-3 text-primary" />
                  </div>
                  <span>You earned {userData?.pixels_earned || 2451} points</span>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Leaderboard</h2>
              <Button variant="link" className="p-0 h-auto">
                View all
              </Button>
            </div>
            <Card className="p-4">
              <div className="space-y-4">
                {leaderboardData.map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.role}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{user.points}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>

      <PDFUploadModal isOpen={isPDFModalOpen} onClose={() => setIsPDFModalOpen(false)} />
    </div>
  )
}

