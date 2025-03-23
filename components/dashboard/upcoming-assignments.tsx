import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, Headphones, PenTool } from "lucide-react"
import type React from "react"

interface Assignment {
  id: string
  title: string
  due_date: string
  course: string
}

const iconMap: { [key: string]: React.ReactNode } = {
  visual: <Video className="h-6 w-6" />,
  auditory: <Headphones className="h-6 w-6" />,
  kinesthetic: <PenTool className="h-6 w-6" />,
  reading: <BookOpen className="h-6 w-6" />,
}

export function UpcomingAssignments({
  assignments,
  learningStyle,
}: { assignments: Assignment[]; learningStyle: string }) {
  if (assignments.length === 0) {
    return <div>No upcoming assignments.</div>
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              {iconMap[learningStyle] || <BookOpen className="h-6 w-6" />}
            </div>
            <div>
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              <CardDescription>{assignment.course}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

