import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface Video {
  id: string
  title: string
  url: string
}

interface RecommendedVideosProps {
  subject?: string
}

export function RecommendedVideos({ subject }: RecommendedVideosProps) {
  // This would typically come from an API call based on the subject
  const videos: Video[] = [
    {
      id: "1",
      title: "Introduction to Algebra",
      url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra",
    },
    {
      id: "2",
      title: "Quadratic Equations",
      url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations",
    },
    { id: "3", title: "Trigonometry Basics", url: "https://www.khanacademy.org/math/trigonometry" },
  ]

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Card key={video.id}>
          <CardHeader>
            <CardTitle className="text-lg">{video.title}</CardTitle>
            <CardDescription>Khan Academy</CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              Watch Video <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

