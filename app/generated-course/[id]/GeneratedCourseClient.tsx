import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
  id: string
  title: string
  description: string
  content: any[]
}

async function getCourse(id: string): Promise<Course | null> {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching course:", error)
    return null
  }

  return data
}

export default async function GeneratedCourseClient({ id }: { id: string }) {
  const course = await getCourse(id)

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
      {course.content.map((stage, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{stage.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: stage.sections.content.content }} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

