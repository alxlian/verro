"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface GuidedConversationProps {
  module: {
    id: string
    title: string
  }
  learningStyle?: string
}

export function GuidedConversation({ module, learningStyle }: GuidedConversationProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Let's start learning about ${module.title}. What would you like to know?` },
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Here you would typically send the user's message to your AI backend
    // and get a response. For now, we'll simulate a response.
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: `Based on your ${learningStyle || "preferred"} learning style, here's an explanation: [Simulated AI response]`,
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <Card key={index} className={message.role === "user" ? "bg-primary text-primary-foreground" : ""}>
            <CardContent className="p-3">
              <p>{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

