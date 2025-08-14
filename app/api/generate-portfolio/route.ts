import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

interface Message {
  role: "user" | "assistant"
  content: string
}

interface GeneratedPortfolio {
  name: string
  title: string
  bio: string
  skills: string[]
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  experience: Array<{
    company: string
    role: string
    duration: string
    description: string
  }>
  contact: {
    email: string
    linkedin?: string
    github?: string
    website?: string
  }
}

const SYSTEM_PROMPT = `You are an AI portfolio assistant that helps users create personalized portfolio websites. Your job is to:

1. Ask intelligent follow-up questions to gather information about the user's:
   - Name and professional title
   - Skills and technologies they work with
   - Work experience and projects
   - Contact information and social links
   - Career goals and target audience

2. Be conversational and friendly, asking one question at a time
3. When you have enough information, generate a complete portfolio data structure
4. Always be encouraging and professional

When you have gathered sufficient information (name, title, skills, at least 2-3 projects, and contact info), respond with a JSON object containing the portfolio data wrapped in <PORTFOLIO_DATA> tags.

Example response when ready to generate:
"Perfect! I have all the information I need to create your portfolio. Let me generate it now...

<PORTFOLIO_DATA>
{
  "name": "John Doe",
  "title": "Frontend Developer",
  "bio": "Passionate frontend developer with 3 years of experience...",
  "skills": ["React", "TypeScript", "Next.js"],
  "projects": [...],
  "experience": [...],
  "contact": {...}
}
</PORTFOLIO_DATA>"

Keep questions focused and don't ask for too much at once. Be natural and conversational.`

export async function POST(request: NextRequest) {
  try {
    const { messages, currentPortfolio } = await request.json()

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    // Prepare the conversation for Gemini
    const conversationHistory = messages.map((msg: Message) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: conversationHistory,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I could not generate a response."

    // Check if the response contains portfolio data
    const portfolioMatch = aiResponse.match(/<PORTFOLIO_DATA>(.*?)<\/PORTFOLIO_DATA>/s)
    let portfolio: GeneratedPortfolio | null = null
    let message = aiResponse

    if (portfolioMatch) {
      try {
        portfolio = JSON.parse(portfolioMatch[1].trim())
        // Remove the portfolio data from the message
        message = aiResponse.replace(/<PORTFOLIO_DATA>.*?<\/PORTFOLIO_DATA>/s, "").trim()
      } catch (error) {
        console.error("Error parsing portfolio data:", error)
      }
    }

    return NextResponse.json({
      message,
      portfolio,
      generating: portfolioMatch ? true : false,
    })
  } catch (error) {
    console.error("Error in generate-portfolio API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
