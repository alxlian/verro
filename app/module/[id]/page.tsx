import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GuidedConversation } from "@/components/student-dashboard/guided-conversation"
import { RecommendedVideos } from "@/components/student-dashboard/recommended-videos"

interface LessonModule {
  id: string
  title: string
  description: string
  subject: string
}

interface PageProps {
  params: { id: string }
}

async function getLessonModule(id: string): Promise<LessonModule | null> {
  const { data, error } = await supabase.from("modules").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching module:", error)
    return null
  }

  return data
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lessonModule = await getLessonModule(params.id)

  if (!lessonModule) {
    return {
      title: "Module Not Found",
    }
  }

  return {
    title: lessonModule.title,
    description: lessonModule.description,
  }
}

export default async function ModulePage({ params }: PageProps) {
  const lessonModule = await getLessonModule(params.id)

  if (!lessonModule) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Link href="/student-dashboard">
        <Button variant="outline">Back to Dashboard</Button>
      </Link>

      <h1 className="text-3xl font-bold">{lessonModule.title}</h1>
      <p className="text-muted-foreground">{lessonModule.description}</p>

      <Card>
        <CardHeader>
          <CardTitle>Guided Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <GuidedConversation module={lessonModule} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <RecommendedVideos subject={lessonModule.subject} />
        </CardContent>
      </Card>
    </div>
  )
}

