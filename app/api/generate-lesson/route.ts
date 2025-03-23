import { NextResponse } from "next/server"
import { CohereClient } from "cohere-ai"

const cohereApiKey = process.env.COHERE_API_KEY

if (!cohereApiKey) {
  console.error("COHERE_API_KEY is not set in the environment variables")
}

const cohere = new CohereClient({
  token: cohereApiKey,
})

export async function POST(req: Request) {
  if (!cohereApiKey) {
    return NextResponse.json({ error: "Cohere API key is not configured" }, { status: 500 })
  }

  const { topic, learningStyle } = await req.json()

  try {
    const response = await cohere.generate({
      model: "command",
      prompt: `As an advanced education expert, create a comprehensive lesson plan for "${topic}" tailored to a ${learningStyle} learner. The lesson should have 5 detailed stages, each focusing on building a strong foundation and gradually introducing more complex concepts. For each stage, include:

1. A clear and descriptive title
2. Main content explanation (at least 200 words):
- Start with basic definitions and concepts
- Provide multiple examples and real-world applications
- Explain step-by-step processes where applicable
- Address common misconceptions or difficulties
3. A detailed visual representation or diagram (described in text):
- Include clear instructions on how to draw or visualize the concept
- Explain the significance of each element in the visual
4. An interactive exercise or problem to solve:
- Provide a mix of basic and more challenging questions
- Include step-by-step solutions for complex problems
- Offer hints or tips for approaching the exercise
5. A thorough recap or summary (at least 100 words):
- Highlight key points and their connections
- Relate the current stage to previous and upcoming stages
- Suggest additional resources or further reading

Ensure the content is engaging, builds upon previous stages, and includes appropriate examples related to personality and brands. Use analogies and real-world examples to make abstract concepts more relatable. Incorporate frequent checkpoints and self-assessment opportunities throughout the lesson.

Format the output as a JSON array of objects, each with 'id', 'title', and 'sections' fields. The 'sections' field should contain 'content', 'visual', 'exercise', and 'recap' objects, each with 'title' and 'content' fields.`,
      max_tokens: 3000,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    })

    const generatedContent = JSON.parse(response.generations[0].text)

    return NextResponse.json({ lessonStages: generatedContent })
  } catch (error) {
    console.error("Error generating lesson content:", error)
    return NextResponse.json({ error: "Failed to generate lesson content" }, { status: 500 })
  }
}

