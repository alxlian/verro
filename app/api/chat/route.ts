import { NextResponse } from "next/server"
import { CohereClient } from "cohere-ai"

const cohereApiKey = process.env.COHERE_API_KEY

if (!cohereApiKey) {
  console.error("COHERE_API_KEY is not set in the environment variables")
}

const cohereClient = new CohereClient({
  token: cohereApiKey,
})

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]

  try {
    const response = await cohereClient.chatStream({
      message: lastMessage.content,
      model: "command",
      chatHistory: messages.slice(0, -1).map((message: { role: string; content: string }) => ({
        role: message.role as "USER" | "CHATBOT",
        message: message.content,
      })),
      prompt_truncation: "AUTO",
    })

    // Create a ReadableStream from the Cohere response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          if (chunk.eventType === "text-generation") {
            controller.enqueue(chunk.text)
          }
        }
        controller.close()
      },
    })

    // Return a streaming response using NextResponse
    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("Error in chat route:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

