"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookText, Ear, Eye, HandMetal } from "lucide-react"
import { useRouter } from "next/navigation"

const getPrimaryLearningStyle = (preferences: Record<string, number>) => {
  return Object.entries(preferences).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
}

const styleNames = {
  visual: "Visual Learner",
  auditory: "Auditory Learner",
  kinesthetic: "Kinesthetic Learner",
  reading: "Reading/Writing Learner",
}

interface ResultsModalProps {
  open: boolean
  onClose: () => void
  answers: Record<string, string>
}

export function ResultsModal({ open, onClose, answers }: ResultsModalProps) {
  const router = useRouter()
  // Calculate learning style preferences based on answers
  const calculatePreferences = () => {
    const styles = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
      reading: 0,
    }

    Object.values(answers).forEach((answer) => {
      if (answer.includes("visual")) styles.visual++
      if (answer.includes("auditory")) styles.auditory++
      if (answer.includes("kinesthetic")) styles.kinesthetic++
      if (answer.includes("reading")) styles.reading++
    })

    const total = Object.values(styles).reduce((a, b) => a + b, 0)

    return {
      visual: (styles.visual / total) * 100,
      auditory: (styles.auditory / total) * 100,
      kinesthetic: (styles.kinesthetic / total) * 100,
      reading: (styles.reading / total) * 100,
    }
  }

  const preferences = calculatePreferences()
  const primaryStyle = getPrimaryLearningStyle(preferences)
  const primaryStyleName = styleNames[primaryStyle as keyof typeof styleNames]

  const getLearningTips = (preferences: Record<string, number>) => {
    const primaryStyle = Object.entries(preferences).reduce((a, b) => (b[1] > a[1] ? b : a))[0]

    const tips = {
      visual: ["Use mind maps and diagrams", "Watch video tutorials", "Create visual summaries"],
      auditory: ["Listen to educational podcasts", "Participate in group discussions", "Record and replay lessons"],
      kinesthetic: [
        "Practice hands-on exercises",
        "Use physical objects to learn",
        "Take frequent study breaks with movement",
      ],
      reading: ["Take detailed notes", "Read textbooks thoroughly", "Write summaries and explanations"],
    }

    return tips[primaryStyle as keyof typeof tips]
  }

  const handleContinue = () => {
    // Store the learning style preferences in localStorage
    localStorage.setItem("learningStylePreferences", JSON.stringify(preferences))
    localStorage.setItem("primaryLearningStyle", primaryStyle)

    // Close the modal and redirect to the dashboard
    onClose()
    router.push("/dashboard")
  }

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">You are primarily a {primaryStyleName}</DialogTitle>
          <DialogDescription className="text-center">
            Here&apos;s a breakdown of your learning style profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Visual</span>
                  <span>{Math.round(preferences.visual)}%</span>
                </div>
                <Progress value={preferences.visual} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Ear className="h-5 w-5" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Auditory</span>
                  <span>{Math.round(preferences.auditory)}%</span>
                </div>
                <Progress value={preferences.auditory} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HandMetal className="h-5 w-5" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Kinesthetic</span>
                  <span>{Math.round(preferences.kinesthetic)}%</span>
                </div>
                <Progress value={preferences.kinesthetic} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookText className="h-5 w-5" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Reading/Writing</span>
                  <span>{Math.round(preferences.reading)}%</span>
                </div>
                <Progress value={preferences.reading} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Recommended Learning Strategies</h3>
            <ul className="space-y-2">
              {getLearningTips(preferences).map((tip, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleContinue}>Continue to Dashboard</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

