"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, BookOpen, Image, PenTool, RefreshCw } from "lucide-react"
import { LessonChatbot } from "@/components/lesson-chatbot"

interface LessonStage {
  id: string
  title: string
  sections: {
    content: { title: string; content: string }
    visual: { title: string; content: string }
    exercise: { title: string; content: string }
    recap: { title: string; content: string }
  }
}

const lessonStages: LessonStage[] = [
  {
    id: "1",
    title: "Introduction to Personality and Brand Personality",
    sections: {
      content: {
        title: "Understanding Personality and Brand Personality",
        content: `Personality is a person's unique psychological makeup that consistently influences how they respond to their environment. It plays a crucial role in determining behavior and is shaped by various factors.

Brand personality, on the other hand, is a set of human characteristics associated with a brand. It's the way a brand speaks and behaves, and it helps consumers relate to and connect with the brand on a personal level.

Both personality and brand personality are built over a long period and are considered distinctive and enduring. They help in creating unique identities, whether for individuals or brands in the marketplace.`,
      },
      visual: {
        title: "Personality vs Brand Personality Diagram",
        content: `Create a side-by-side comparison diagram:

Left side (Human Personality):
- Silhouette of a person
- Arrows pointing to traits like "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"

Right side (Brand Personality):
- Logo or product image
- Arrows pointing to traits like "Sincerity", "Excitement", "Competence", "Sophistication", "Ruggedness"

Connect both sides with a double-headed arrow labeled "Influences Consumer Behavior"`,
      },
      exercise: {
        title: "Identifying Brand Personalities",
        content: `Think of three brands you're familiar with. For each brand:
1. List five personality traits you would associate with it if it were a person.
2. Explain why you chose these traits based on the brand's marketing, products, or public image.
3. Consider how these personality traits might appeal to different consumers.

Example:
Brand: Apple
Traits: Innovative, Sleek, Confident, User-friendly, Premium
Explanation: Apple's cutting-edge technology and design (innovative, sleek), their marketing that positions them as leaders (confident), their intuitive interfaces (user-friendly), and their pricing strategy (premium).`,
      },
      recap: {
        title: "Key Takeaways",
        content: `- Personality is an individual's unique psychological makeup that influences behavior.
- Brand personality is a set of human characteristics associated with a brand.
- Both personality and brand personality are distinctive and enduring.
- Understanding personality helps in predicting consumer behavior.
- Brand personality contributes to brand loyalty and helps in creating distinctive positioning in the marketplace.
- Both concepts are built over time and play crucial roles in their respective domains.`,
      },
    },
  },
  {
    id: "2",
    title: "The Big Five Personality Traits (OCEAN)",
    sections: {
      content: {
        title: "Exploring the OCEAN Model",
        content: `The Big Five personality traits, also known as the Five-Factor Model or OCEAN model, is a widely accepted framework for understanding human personality. The five traits are:

1. Openness to Experience: Reflects curiosity, creativity, and preference for variety.
2. Conscientiousness: Indicates organization, dependability, and goal-oriented behavior.
3. Extraversion: Represents sociability, assertiveness, and emotional expressiveness.
4. Agreeableness: Reflects kindness, cooperativeness, and empathy.
5. Neuroticism: Indicates emotional instability, anxiety, and moodiness.

These traits exist on a continuum, and individuals can be high, low, or somewhere in between on each trait. Understanding these traits can help marketers better understand consumer behavior and tailor their strategies accordingly.`,
      },
      visual: {
        title: "OCEAN Model Visualization",
        content: `Create a circular diagram with five sections, each representing one of the OCEAN traits:

1. Openness: Symbol of an open book or lightbulb
2. Conscientiousness: Symbol of a checklist or clock
3. Extraversion: Symbol of a group of people or a megaphone
4. Agreeableness: Symbol of a handshake or heart
5. Neuroticism: Symbol of a storm cloud or a yin-yang symbol

In the center, place the text "OCEAN Model" or "Big Five Personality Traits". Use different colors for each section to make them visually distinct.`,
      },
      exercise: {
        title: "Applying OCEAN to Consumer Behavior",
        content: `Consider how each of the Big Five personality traits might influence consumer behavior:

1. Choose a product category (e.g., cars, vacation packages, or smartphones).
2. For each of the five traits, describe how a person high in that trait might approach purchasing in your chosen category.
3. Suggest a marketing approach that might appeal to each trait.

Example for smartphones:
- Openness: Might be drawn to phones with unique features or designs. Marketing could emphasize innovation and creativity.
- Conscientiousness: Might research extensively before buying. Marketing could focus on reliability and practical benefits.
- Extraversion: Might prioritize social features. Marketing could highlight connectivity and social media capabilities.
- Agreeableness: Might be influenced by reviews and recommendations. Marketing could emphasize customer satisfaction and social responsibility.
- Neuroticism: Might be concerned about security features. Marketing could focus on safety and privacy protections.`,
      },
      recap: {
        title: "Key Takeaways",
        content: `- The Big Five (OCEAN) model is a comprehensive framework for understanding personality.
- The five traits are Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
- Each trait exists on a continuum, and individuals can vary in their levels of each trait.
- Understanding these traits can provide insights into consumer behavior and preferences.
- Marketers can use this knowledge to tailor their strategies and communications to appeal to different personality types.
- The OCEAN model has implications for product development, marketing messages, and customer segmentation.`,
      },
    },
  },
  {
    id: "3",
    title: "Brand Personality and Consumer-Brand Relationships",
    sections: {
      content: {
        title: "Understanding Brand Personality and Its Impact",
        content: `Brand personality is the set of human characteristics associated with a brand. It's a critical component of brand identity that helps create emotional connections with consumers. Key aspects include:

1. Formation: Brand personality is formed through all consumer touchpoints, including advertising, packaging, and customer service.
2. Consistency: A strong brand personality is consistent across all brand communications and experiences.
3. Differentiation: It helps brands stand out in crowded markets by creating unique identities.
4. Consumer-Brand Relationships: Brand personality facilitates the formation of relationships between consumers and brands, often mirroring interpersonal relationships.

Types of consumer-brand relationships include:
- Committed partnerships
- Best friendships
- Compartmentalized friendships
- Marriages of convenience
- Flings
- Childhood friendships

These relationships influence consumer loyalty, purchasing behavior, and brand advocacy.`,
      },
      visual: {
        title: "Brand Personality and Relationship Spectrum",
        content: `Create a visual spectrum of brand personalities and corresponding consumer-brand relationships:

Left side: Functional Brands
- Personality traits: Reliable, Efficient, Practical
- Relationship type: Marriage of convenience, Compartmentalized friendship

Middle: Balanced Brands
- Personality traits: Friendly, Trustworthy, Competent
- Relationship type: Committed partnership, Best friendship

Right side: Expressive Brands
- Personality traits: Exciting, Unique, Passionate
- Relationship type: Fling, Childhood friendship

Use icons or small illustrations to represent each personality trait and relationship type. Connect them with lines to show how brand personality influences the type of relationship consumers form with the brand.`,
      },
      exercise: {
        title: "Analyzing Brand Personalities",
        content: `Choose three well-known brands from different industries. For each brand:

1. Identify the key personality traits of the brand.
2. Describe the type of relationship the brand seems to be cultivating with its consumers.
3. Analyze how the brand's marketing and communication strategies reflect its personality.
4. Suggest how the brand could strengthen its personality or adjust it to build stronger consumer relationships.

Example:
Brand: Nike
1. Personality traits: Ambitious, Inspiring, Innovative
2. Relationship: Motivational partner or mentor
3. Marketing strategies: Use of athletes as brand ambassadors, inspirational slogans like "Just Do It", emphasis on performance and self-improvement
4. Strengthening suggestion: Incorporate more user-generated content to build a sense of community and shared achievement among consumers`,
      },
      recap: {
        title: "Key Takeaways",
        content: `- Brand personality is a set of human characteristics associated with a brand.
- It plays a crucial role in creating emotional connections with consumers.
- Brand personality should be consistent across all brand touchpoints.
- Consumer-brand relationships often mirror interpersonal relationships.
- Different types of relationships (e.g., committed partnerships, flings) can exist between consumers and brands.
- Understanding and cultivating the right brand personality can lead to stronger consumer loyalty and brand advocacy.
- Brand personality can be a powerful tool for differentiation in competitive markets.
- Marketers should align brand personality with target audience preferences and brand values.`,
      },
    },
  },
  {
    id: "4",
    title: "Brand Narratives and the Underdog Effect",
    sections: {
      content: {
        title: "The Power of Brand Stories and Underdog Narratives",
        content: `Brand narratives are the stories that brands tell about themselves, their origins, values, and mission. They are powerful tools for connecting with consumers on an emotional level. Key aspects of brand narratives include:

1. Authenticity: Successful brand stories feel genuine and align with the brand's actions.
2. Emotional appeal: They often tap into universal themes and emotions.
3. Consistency: The narrative should be consistent across all brand communications.
4. Memorability: A good brand story is easy for consumers to remember and share.

The Underdog Effect is a particular type of brand narrative that can be especially powerful. It involves portraying the brand as an underdog that overcomes challenges through determination and hard work. This narrative:

1. Creates empathy: Many people relate to the struggle against odds.
2. Builds loyalty: Consumers often want to support the 'little guy'.
3. Differentiates: It can set a brand apart from larger, more established competitors.
4. Motivates: It can inspire both employees and customers.

However, the underdog narrative must be used carefully and authentically to be effective.`,
      },
      visual: {
        title: "Elements of a Powerful Brand Narrative",
        content: `Create a circular diagram with "Brand Narrative" in the center, surrounded by key elements:

1. Origin Story: Symbol of a seedling or starting line
2. Values & Mission: Symbol of a compass or flag
3. Challenges Overcome: Symbol of a mountain or hurdle
4. Key Characters: Symbol of silhouettes or puzzle pieces
5. Vision for the Future: Symbol of a telescope or road ahead

Connect these elements with arrows to show how they interact to create a cohesive narrative. Add a separate section for "Underdog Effect" with a small David vs. Goliath illustration to represent its unique power in brand storytelling.`,
      },
      exercise: {
        title: "Crafting a Brand Narrative",
        content: `Create a brand narrative for a fictional company:

1. Choose a product or service category for your fictional brand.
2. Develop a brief origin story for the brand, incorporating elements of the underdog narrative if appropriate.
3. Identify the core values and mission of the brand.
4. Describe a significant challenge the brand has overcome or is facing.
5. Outline how this narrative could be communicated across different marketing channels (e.g., website, social media, advertising).

Example:
Product Category: Sustainable Fashion
Brand Name: GreenThread

Origin Story: Founded by two college friends who were frustrated with the environmental impact of fast fashion. They started by upcycling old clothes in their dorm room.

Values & Mission: Sustainability, creativity, and empowering consumers to make eco-friendly choices.

Challenge: Competing against established fast fashion brands with lower prices and bigger marketing budgets.

Communication Strategy:
- Website: Feature an interactive timeline of the brand's growth and impact
- Social Media: Share behind-the-scenes content of the upcycling process
- Advertising: Create a campaign showcasing the positive environmental impact of choosing GreenThread over fast fashion alternatives`,
      },
      recap: {
        title: "Key Takeaways",
        content: `- Brand narratives are powerful tools for creating emotional connections with consumers.
- Effective brand stories are authentic, emotionally appealing, consistent, and memorable.
- The Underdog Effect can be a particularly powerful narrative, creating empathy and loyalty.
- Key elements of a brand narrative include origin story, values, challenges, key characters, and vision.
- Brand narratives should be woven consistently through all brand communications.
- The underdog narrative must be used authentically to be effective.
- Crafting a compelling brand narrative can differentiate a brand in a crowded market.
- Brand stories can inspire both employees and customers, creating a shared sense of purpose.`,
      },
    },
  },
  {
    id: "5",
    title: "Applying Personality Concepts in Marketing",
    sections: {
      content: {
        title: "Leveraging Personality Insights in Marketing Strategies",
        content: `Understanding personality traits and brand personality can significantly enhance marketing strategies:

1. Market Segmentation: Use personality traits to segment your audience and tailor messages accordingly.

2. Product Development: Consider how different personality types might influence product preferences and design.

3. Brand Positioning: Align your brand personality with your target audience's traits or aspirational selves.

4. Communication Strategies: Craft messages that resonate with the personality traits of your target audience.

5. Customer Experience: Design experiences that appeal to different personality types.

6. Loyalty Programs: Structure rewards and communications based on personality insights.

7. Influencer Partnerships: Choose influencers whose personalities align with your brand and target audience.

8. Content Marketing: Create content that appeals to different personality types within your audience.

Remember, while personality insights are powerful, they should be used ethically and in combination with other marketing data for best results.`,
      },
      visual: {
        title: "Personality-Driven Marketing Funnel",
        content: `Create a marketing funnel diagram incorporating personality concepts:

Top of Funnel (Awareness):
- Show different personality types being reached through varied content and channels

Middle of Funnel (Consideration):
- Illustrate how brand personality aligns with consumer personalities

Bottom of Funnel (Conversion):
- Depict personalized experiences and communications based on personality insights

Add icons representing different marketing strategies (e.g., social media, email, advertising) at each stage, with personality symbols (e.g., OCEAN traits) influencing these strategies.`,
      },
      exercise: {
        title: "Developing a Personality-Driven Marketing Plan",
        content: `Choose a product or service and develop a basic marketing plan incorporating personality concepts:

1. Define your target audience using personality traits (e.g., high in openness and extraversion).

2. Describe your brand personality and how it appeals to this audience.

3. Outline a content marketing strategy that caters to the personality traits of your target audience.

4. Suggest personalized customer experience elements based on personality insights.

5. Propose a loyalty program structure that appeals to your target audience's personality traits.

Example:
Product: Fitness tracking smartwatch

1. Target Audience: Individuals high in conscientiousness and openness to experience.

2. Brand Personality: Innovative, reliable, and motivating. This appeals to conscientious individuals who value dependability and those open to new experiences and technologies.

3. Content Marketing Strategy: 
   - Blog posts about new fitness trends (appeals to openness)
   - Detailed guides on optimizing workouts (appeals to conscientiousness)
   - User success stories highlighting perseverance (appeals to both traits)

4. Personalized Experience:
   - Customizable goal-setting features (conscientiousness)
   - Regular introduction of new workout modes (openness)
   - Data-driven insights and recommendations (appeals to both traits)

5. Loyalty Program:
   - Points for consistent daily use (conscientiousness)
   - Bonus rewards for trying new features or workouts (openness)
   - Exclusive access to beta features for top users (appeals to both traits)
      },
      recap: {
        title: "Key Takeaways",
        content: \`- Personality insights can significantly enhance various aspects of marketing strategy.
- Market segmentation based on personality traits allows for more targeted and effective messaging.
- Brand personality should align with target audience traits or their aspirational selves.
- Product development and customer experience can be tailored to different personality types.
- Content marketing and communication strategies should consider the personality traits of the target audience.
- Loyalty programs and influencer partnerships can be optimized using personality insights.
- Ethical considerations are crucial when using personality data in marketing.
- Combining personality insights with other data sources provides a more comprehensive marketing approach.
- Personalization based on personality can significantly enhance customer engagement and loyalty.
- Continuous testing and refinement of personality-based strategies is essential for optimal results.`,
      },
    },
  },
]

export default function PersonalityAndBrandsCourse() {
  const [currentStage, setCurrentStage] = useState(0)
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set())
  const router = useRouter()

  const navigateStage = (direction: "next" | "prev") => {
    if (direction === "next" && currentStage < lessonStages.length - 1) {
      setCurrentStage(currentStage + 1)
      setCompletedStages(new Set(completedStages).add(currentStage))
    } else if (direction === "prev" && currentStage > 0) {
      setCurrentStage(currentStage - 1)
    }
  }

  const progress = ((completedStages.size + 1) / lessonStages.length) * 100

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Button variant="ghost" onClick={() => router.push("/student-dashboard")} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold mb-6">Personality and Brands</h1>

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
            {completedStages.has(index) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
            )}
          </Button>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{lessonStages[currentStage].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">
                <BookOpen className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="visual">
                <Image className="mr-2 h-4 w-4" alt="Visual Icon" />
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
        <Card className="bg-green-100 dark:bg-green-900 mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
            <p>You&apos;ve completed the Personality and Brands course. Great job!</p>
            <Button className="mt-4" onClick={() => router.push("/student-dashboard")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}

      <LessonChatbot />
    </div>
  )
}

