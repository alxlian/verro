"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LearningStyleAssessment } from "@/components/assessment/learning-style-assessment"
import { ResultsModal } from "@/components/assessment/results-modal"
import { questions, type LearningStyle } from "./questions"

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState<Record<string, LearningStyle>>({})

  const handleAnswer = (questionId: string, answer: LearningStyle) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Learning Style Assessment</h1>
          <p className="text-muted-foreground">Answer these questions to help us understand how you learn best.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-6">
            <LearningStyleAssessment question={questions[currentStep]} onAnswer={handleAnswer} />
          </CardContent>
        </Card>
      </div>

      <ResultsModal
        open={showResults}
        onClose={() => {
          setShowResults(false)
          router.push("/dashboard")
        }}
        answers={answers}
      />
    </div>
  )
}

