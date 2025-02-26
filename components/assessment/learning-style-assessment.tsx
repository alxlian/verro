"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BookText, Ear, Eye, HandMetal } from "lucide-react"
import { useState } from "react"
import type { Question, LearningStyle } from "@/app/assessment/questions"

interface LearningStyleAssessmentProps {
  question: Question
  onAnswer: (questionId: string, answer: LearningStyle) => void
}

export function LearningStyleAssessment({ question, onAnswer }: LearningStyleAssessmentProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNext = () => {
    if (selectedOption) {
      const selectedStyle = question.options.find((opt) => opt.id === selectedOption)?.style
      if (selectedStyle) {
        onAnswer(question.id, selectedStyle)
      }
      setSelectedOption(null)
    }
  }

  const getIcon = (style: LearningStyle) => {
    switch (style) {
      case "visual":
        return <Eye className="h-5 w-5" />
      case "auditory":
        return <Ear className="h-5 w-5" />
      case "kinesthetic":
        return <HandMetal className="h-5 w-5" />
      case "reading":
        return <BookText className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{question.scenario}</h2>
      <div className="grid gap-4">
        {question.options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              "p-4 cursor-pointer transition-colors",
              selectedOption === option.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
            )}
            onClick={() => handleSelect(option.id)}
          >
            <div className="flex items-center gap-3">
              {getIcon(option.style)}
              <span>{option.text}</span>
            </div>
          </Card>
        ))}
      </div>
      <Button className="w-full" onClick={handleNext} disabled={!selectedOption}>
        Next
      </Button>
    </div>
  )
}

