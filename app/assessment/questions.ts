export type LearningStyle = "visual" | "auditory" | "kinesthetic" | "reading"

export interface Option {
  id: string
  text: string
  style: LearningStyle
}

export interface Question {
  id: string
  scenario: string
  options: Option[]
}

export const questions: Question[] = [
  {
    id: "q1",
    scenario: "When learning about a new topic, I prefer to:",
    options: [
      {
        id: "visual",
        text: "Look at diagrams, charts, or videos",
        style: "visual",
      },
      {
        id: "auditory",
        text: "Listen to someone explain it",
        style: "auditory",
      },
      {
        id: "kinesthetic",
        text: "Try it out hands-on",
        style: "kinesthetic",
      },
      {
        id: "reading",
        text: "Read detailed written explanations",
        style: "reading",
      },
    ],
  },
  {
    id: "q2",
    scenario: "When solving a difficult problem, I typically:",
    options: [
      {
        id: "visual",
        text: "Draw a diagram or sketch",
        style: "visual",
      },
      {
        id: "auditory",
        text: "Talk it through with someone",
        style: "auditory",
      },
      {
        id: "kinesthetic",
        text: "Use physical objects or movement",
        style: "kinesthetic",
      },
      {
        id: "reading",
        text: "Write out the steps",
        style: "reading",
      },
    ],
  },
  {
    id: "q3",
    scenario: "I remember information best when:",
    options: [
      {
        id: "visual",
        text: "I see it presented in a visual format",
        style: "visual",
      },
      {
        id: "auditory",
        text: "I hear it explained",
        style: "auditory",
      },
      {
        id: "kinesthetic",
        text: "I actively participate in learning it",
        style: "kinesthetic",
      },
      {
        id: "reading",
        text: "I read and take notes about it",
        style: "reading",
      },
    ],
  },
  {
    id: "q4",
    scenario: "When studying for a test, I prefer to:",
    options: [
      {
        id: "visual",
        text: "Create mind maps and visual summaries",
        style: "visual",
      },
      {
        id: "auditory",
        text: "Record and listen to my notes",
        style: "auditory",
      },
      {
        id: "kinesthetic",
        text: "Walk around while reviewing",
        style: "kinesthetic",
      },
      {
        id: "reading",
        text: "Rewrite my notes and summaries",
        style: "reading",
      },
    ],
  },
  {
    id: "q5",
    scenario: "When explaining something to others, I tend to:",
    options: [
      {
        id: "visual",
        text: "Draw pictures or diagrams",
        style: "visual",
      },
      {
        id: "auditory",
        text: "Use verbal analogies and examples",
        style: "auditory",
      },
      {
        id: "kinesthetic",
        text: "Demonstrate through actions",
        style: "kinesthetic",
      },
      {
        id: "reading",
        text: "Write out detailed explanations",
        style: "reading",
      },
    ],
  },
]

