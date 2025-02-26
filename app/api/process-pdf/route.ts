import { NextResponse } from "next/server"
import { CohereClient } from "cohere-ai"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const cohereApiKey = process.env.COHERE_API_KEY

if (!cohereApiKey) {
  console.error("COHERE_API_KEY is not set in the environment variables")
}

const cohere = new CohereClient({
  token: cohereApiKey,
})

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const pdfFile = formData.get("pdf") as File

  if (!pdfFile) {
    return NextResponse.json({ error: "No PDF file provided" }, { status: 400 })
  }

  try {
    // TODO: Implement PDF text extraction (you may need to use a PDF parsing library)
    const pdfText = "Sample PDF content" // Replace this with actual PDF content

    const response = await cohere.generate({
      model: "command",
      prompt: `Create a multi-stage learning process to teach the core concepts from the following PDF content. Format the output as a JSON array of lesson stages, similar to the "Intro to Vectors" lesson:

${pdfText}

Each stage should include:
1. A title
2. Main content explanation
3. A visual representation or diagram description
4. An interactive exercise
5. A recap or summary

Ensure the content is engaging and builds upon previous stages.`,
      max_tokens: 3000,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    })

    const generatedContent = JSON.parse(response.generations[0].text)

    // Save the generated course to the database
    const { data: moduleData, error: moduleError } = await supabase
      .from("modules")
      .insert({
        title: "Generated Course from PDF",
        teacher_id: user.id,
      })
      .select()

    if (moduleError) {
      throw moduleError
    }

    const moduleId = moduleData[0].id

    // Create lessons and stages
    for (const stage of generatedContent) {
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .insert({
          module_id: moduleId,
          title: stage.title,
        })
        .select()

      if (lessonError) {
        throw lessonError
      }

      const lessonId = lessonData[0].id

      const { error: stageError } = await supabase.from("lesson_stages").insert({
        lesson_id: lessonId,
        title: stage.title,
        content: stage.sections.content.content,
        visual: stage.sections.visual.content,
        exercise: stage.sections.exercise.content,
        recap: stage.sections.recap.content,
      })

      if (stageError) {
        throw stageError
      }
    }

    return NextResponse.json({ success: true, moduleId })
  } catch (error) {
    console.error("Error processing PDF:", error)
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 })
  }
}

