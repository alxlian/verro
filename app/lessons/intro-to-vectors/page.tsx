"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Image, PenTool, RefreshCw, Video } from "lucide-react"
import { LessonChatbot } from "@/components/lesson-chatbot"

interface LessonSection {
  title: string
  content: string
}

interface LessonStage {
  id: string
  title: string
  sections: {
    content: LessonSection
    visual: LessonSection
    exercise: LessonSection
    recap: LessonSection
  }
}

interface RecommendedVideo {
  title: string
  url: string
}

const recommendedVideos: RecommendedVideo[] = [
  {
    title: "Introduction to vectors",
    url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:vectors/x2f8bb11595b61c86:intro-to-vectors/v/introduction-to-vectors",
  },
  {
    title: "Vector examples",
    url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:vectors/x2f8bb11595b61c86:intro-to-vectors/v/vector-examples",
  },
  {
    title: "Representing vectors",
    url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:vectors/x2f8bb11595b61c86:intro-to-vectors/v/representing-vectors",
  },
]

export default function IntroToVectorsLesson() {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(0)
  const [lessonStages, setLessonStages] = useState<LessonStage[]>([])
  const [loading, setLoading] = useState(true)
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchLessonContent = async () => {
      setLoading(true)
      try {
        const learningStyle = localStorage.getItem("primaryLearningStyle") || "visual"
        const response = await fetch("/api/generate-lesson", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: "Introduction to Vectors", learningStyle }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch lesson content")
        }

        const data = await response.json()
        if (Array.isArray(data.lessonStages) && data.lessonStages.length > 0) {
          setLessonStages(data.lessonStages)
        } else {
          throw new Error("Invalid lesson data received")
        }
      } catch (error) {
        console.error("Error fetching lesson content:", error)
        // Set default lesson stages if the API call fails
        setLessonStages([
          {
            id: "1",
            title: "Understanding the Concept of Vectors",
            sections: {
              content: {
                title: "What are Vectors?",
                content:
                  "Vectors are mathematical objects that have both magnitude and direction. Unlike scalar quantities, which only have magnitude, vectors provide a way to describe quantities that require both a size and a direction to be fully specified. This dual nature of vectors makes them incredibly useful in various fields, including physics, engineering, and computer graphics.",
              },
              visual: {
                title: "Visualizing Vectors",
                content:
                  "To visualize a vector, imagine an arrow. The length of the arrow represents the magnitude of the vector, while the direction the arrow points indicates the vector's direction.",
              },
              exercise: {
                title: "Vector Exercise",
                content:
                  "Describe a real-world scenario where using a vector would be more appropriate than using a scalar quantity. Then, represent this vector mathematically.",
              },
              recap: {
                title: "Key Points",
                content:
                  "Vectors represent quantities with both magnitude and direction. They differ from scalars, which only have magnitude. Vectors are often visualized as arrows and can exist in different dimensions (2D, 3D, etc.).",
              },
            },
          },
          {
            id: "2",
            title: "Vector Notation and Representation",
            sections: {
              content: {
                title: "How to Write and Represent Vectors",
                content:
                  "Vectors can be represented in various ways. In mathematics, we often use bold letters (e.g., v) or letters with arrows above them (e.g., →v) to denote vectors. In two-dimensional space, a vector can be written as an ordered pair (x, y), where x represents the horizontal component and y represents the vertical component.",
              },
              visual: {
                title: "Vector Representation on a Coordinate Plane",
                content:
                  "Draw a coordinate plane with x and y axes. Plot the point (3, 4) and draw an arrow from the origin (0, 0) to this point. This arrow represents the vector (3, 4).",
              },
              exercise: {
                title: "Vector Notation Practice",
                content:
                  "Given the vector v = (2, -3), draw this vector on a coordinate plane. Then, describe in words the direction and approximate magnitude of this vector.",
              },
              recap: {
                title: "Summary of Vector Notation",
                content:
                  "Vectors can be written using bold letters, arrows, or as ordered pairs. The components of a vector represent its projection onto the coordinate axes. Understanding vector notation is crucial for performing vector operations and solving problems in physics and engineering.",
              },
            },
          },
          {
            id: "3",
            title: "Vector Operations: Addition and Subtraction",
            sections: {
              content: {
                title: "Adding and Subtracting Vectors",
                content:
                  "Vector addition and subtraction are fundamental operations in vector algebra. To add vectors, we add their corresponding components. For example, if v = (v1, v2) and u = (u1, u2), then v + u = (v1 + u1, v2 + u2). Subtraction works similarly: v - u = (v1 - u1, v2 - u2).",
              },
              visual: {
                title: "Visualizing Vector Addition",
                content:
                  "Draw two vectors, v = (3, 2) and u = (1, 4). To add them, draw u starting from the tip of v. The resultant vector is the one that goes from the start of v to the end of u.",
              },
              exercise: {
                title: "Vector Addition Problem",
                content:
                  "A boat is moving with a velocity of 3 m/s east and 2 m/s north. The river has a current of 1 m/s east. What is the boat's resultant velocity? Solve this using vector addition.",
              },
              recap: {
                title: "Key Points on Vector Operations",
                content:
                  "Vector addition and subtraction are performed component-wise. These operations have important applications in physics, such as finding resultant forces or velocities. Graphically, vector addition can be visualized using the parallelogram or tip-to-tail method.",
              },
            },
          },
          {
            id: "4",
            title: "Scalar Multiplication and Vector Magnitude",
            sections: {
              content: {
                title: "Scaling Vectors and Finding Magnitudes",
                content:
                  "Scalar multiplication involves multiplying a vector by a real number (scalar). If k is a scalar and v = (v1, v2), then kv = (kv1, kv2). The magnitude of a vector, denoted ||v||, is its length. For a vector v = (x, y), its magnitude is calculated as ||v|| = √(x² + y²).",
              },
              visual: {
                title: "Visualizing Scalar Multiplication",
                content:
                  "Draw a vector v = (2, 3). Then, draw 2v and 0.5v. Notice how 2v is twice as long as v in the same direction, while 0.5v is half as long.",
              },
              exercise: {
                title: "Magnitude Calculation",
                content:
                  "Calculate the magnitude of the vector v = (-3, 4). Then, find a unit vector in the same direction as v. (Hint: A unit vector has a magnitude of 1).",
              },
              recap: {
                title: "Summary of Scalar Multiplication and Magnitude",
                content:
                  "Scalar multiplication changes the length of a vector but not its direction (unless the scalar is negative). The magnitude of a vector is crucial in many applications, such as finding the distance between two points or normalizing vectors.",
              },
            },
          },
          {
            id: "5",
            title: "Applications of Vectors",
            sections: {
              content: {
                title: "Real-world Uses of Vectors",
                content:
                  "Vectors have numerous applications in various fields. In physics, they're used to represent forces, velocities, and accelerations. In computer graphics, vectors are essential for 3D modeling and animations. In navigation, GPS systems use vector calculations to determine positions and directions.",
              },
              visual: {
                title: "Force Diagram Example",
                content:
                  "Draw a simple force diagram of a box on an inclined plane. Show the weight vector pointing straight down, the normal force perpendicular to the plane, and the friction force parallel to the plane in the upward direction.",
              },
              exercise: {
                title: "Vector Application Problem",
                content:
                  "A plane is flying with a velocity of 200 km/h at a bearing of 060°. There's a wind blowing at 50 km/h from the north. Calculate the plane's ground speed and actual heading. (Hint: Use vector addition and trigonometry)",
              },
              recap: {
                title: "The Importance of Vectors in Science and Engineering",
                content:
                  "Vectors are indispensable tools in many scientific and engineering disciplines. They allow us to represent and analyze quantities that have both magnitude and direction, enabling more accurate modeling of physical phenomena and solving complex real-world problems.",
              },
            },
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLessonContent()
  }, [])

  const navigateStage = (direction: "next" | "prev") => {
    if (direction === "next" && currentStage < lessonStages.length - 1) {
      setCurrentStage(currentStage + 1)
      setCompletedStages(new Set(completedStages).add(currentStage))
    } else if (direction === "prev" && currentStage > 0) {
      setCurrentStage(currentStage - 1)
    }
  }

  const progress = ((completedStages.size + 1) / lessonStages.length) * 100

  if (loading) {
    return <div className="container mx-auto p-4">Loading lesson content...</div>
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Button variant="ghost" onClick={() => router.push("/student-dashboard")} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold mb-6">Intro to Vectors</h1>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {lessonStages.map((stage, index) => (
          <Button
            key={stage.id}
            variant={currentStage === index ? "default" : "outline"}
            className="relative"
            onClick={() => setCurrentStage(index)}
          >
            {index + 1}
            {completedStages.has(index) && <CheckCircle className="h-4 w-4 absolute top-0 right-0 text-green-500" />}
          </Button>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{lessonStages[currentStage]?.title || "Loading..."}</CardTitle>
        </CardHeader>
        <CardContent>
          {lessonStages[currentStage] ? (
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="visual">
                  <Image className="mr-2 h-4 w-4" />
                  Visual
                </TabsTrigger>
                <TabsTrigger value="exercise">
                  <PenTool className="mr-2 h-4 w-4" />
                  Exercise
                </TabsTrigger>
                <TabsTrigger value="recap">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recap
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <h3 className="text-lg font-semibold mb-2">{lessonStages[currentStage].sections.content.title}</h3>
                <div className="whitespace-pre-wrap">{lessonStages[currentStage].sections.content.content}</div>
              </TabsContent>
              <TabsContent value="visual">
                <h3 className="text-lg font-semibold mb-2">{lessonStages[currentStage].sections.visual.title}</h3>
                <div className="whitespace-pre-wrap">{lessonStages[currentStage].sections.visual.content}</div>
              </TabsContent>
              <TabsContent value="exercise">
                <h3 className="text-lg font-semibold mb-2">{lessonStages[currentStage].sections.exercise.title}</h3>
                <div className="whitespace-pre-wrap">{lessonStages[currentStage].sections.exercise.content}</div>
              </TabsContent>
              <TabsContent value="recap">
                <h3 className="text-lg font-semibold mb-2">{lessonStages[currentStage].sections.recap.title}</h3>
                <div className="whitespace-pre-wrap">{lessonStages[currentStage].sections.recap.content}</div>
              </TabsContent>
            </Tabs>
          ) : (
            <div>Loading lesson content...</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => navigateStage("prev")} disabled={currentStage === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={() => navigateStage("next")} disabled={currentStage === lessonStages.length - 1}>
            {currentStage === lessonStages.length - 1 ? "Finish" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {currentStage === lessonStages.length - 1 && (
        <>
          <Card className="bg-green-100 dark:bg-green-900 mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
              <p>You've completed the Introduction to Vectors lesson. Great job!</p>
              <Button className="mt-4" onClick={() => router.push("/student-dashboard")}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedVideos.map((video, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Video className="h-6 w-6 text-primary" />
                    <div>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {video.title}
                      </a>
                      <p className="text-sm text-muted-foreground">Khan Academy</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <LessonChatbot />
    </div>
  )
}

