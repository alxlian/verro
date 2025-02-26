"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Clock } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  stage_count: number
  estimated_time: number
}

export default function ModuleLessons({ params }: { params: { id: string } }) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [moduleTitle, setModuleTitle] = useState("Calculus")
  const router = useRouter()

  useEffect(() => {
    // Simulated data for the demo
    const demoLessons: Lesson[] = [
      {
        id: "intro-to-vectors",
        title: "Intro to Vectors",
        stage_count: 5,
        estimated_time: 60,
      },
    ]

    setLessons(demoLessons)
  }, [])

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => router.push("/teacher-dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">{moduleTitle}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <Link href={`/teacher-dashboard/lesson/${lesson.id}`} key={lesson.id}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{lesson.title}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lesson.stage_count} stages</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  Estimated time: {lesson.estimated_time} minutes
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

