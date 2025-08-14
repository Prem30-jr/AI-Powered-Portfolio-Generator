import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Store the message in a database
    // 3. Send notifications to the portfolio owner

    // For now, we'll simulate a successful submission
    console.log("Contact form submission:", { name, email, subject, message })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}
