import type { Metadata } from "next"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Suspense } from "react"
import GeneratedCourseClient from "./GeneratedCourseClient"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.from("courses").select("title").eq("id", resolvedParams.id).single()

  if (error) {
    console.error("Error fetching course title:", error)
    return { title: "Course" }
  }

  return {
    title: data.title,
  }
}

export default async function GeneratedCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratedCourseClient id={resolvedParams.id} />
    </Suspense>
  )
}

