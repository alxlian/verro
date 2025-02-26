import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, Headphones, PenTool } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type React from "react"

interface Course {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const iconMap: { [key: string]: React.ReactNode } = {
  visual: <Video className="h-6 w-6" />,
  auditory: <Headphones className="h-6 w-6" />,
  kinesthetic: <PenTool className="h-6 w-6" />,
  reading: <BookOpen className="h-6 w-6" />,
}

export function RecommendedCourses({ learningStyle }: { learningStyle: string }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("id, title, description, learning_style")
          .eq("learning_style", learningStyle)
          .limit(3)

        if (error) throw error

        setCourses(
          data.map((course: { id: string; title: string; description: string; learning_style: string }) => ({
            ...course,
            icon: iconMap[course.learning_style] || <BookOpen className="h-6 w-6" />,
          })),
        )
      } catch (error) {
        console.error("Error fetching recommended courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [learningStyle])

  if (loading) {
    return <div>Loading recommended courses...</div>
  }

  if (courses.length === 0) {
    return <div className="text-muted-foreground">No recommended courses available at the moment.</div>
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">{course.icon}</div>
            <div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Enroll Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

