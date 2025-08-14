"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, Sparkles, User, Bot, Download, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
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

export function PortfolioGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI portfolio assistant. I'll help you create a stunning portfolio website. To get started, tell me what kind of portfolio you'd like to create. For example: 'Create a portfolio for a frontend developer' or 'I need a portfolio for a UX designer with 3 years experience'.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPortfolio, setGeneratedPortfolio] = useState<GeneratedPortfolio | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          currentPortfolio: generatedPortfolio,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // If portfolio data is returned, update the generated portfolio
      if (data.portfolio) {
        setGeneratedPortfolio(data.portfolio)
        setIsGenerating(false)
      }

      // If the assistant indicates it's generating the portfolio
      if (data.generating) {
        setIsGenerating(true)
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    if (generatedPortfolio) {
      // Store portfolio data in localStorage for preview
      localStorage.setItem("previewPortfolio", JSON.stringify(generatedPortfolio))
      window.open("/preview", "_blank")
    }
  }

  const handleDownload = async () => {
    if (!generatedPortfolio) return

    try {
      const response = await fetch("/api/export-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolio: generatedPortfolio }),
      })

      if (!response.ok) throw new Error("Failed to export portfolio")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${generatedPortfolio.name.toLowerCase().replace(/\s+/g, "-")}-portfolio.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Success!",
        description: "Portfolio downloaded successfully!",
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to download portfolio. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <section id="generator" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Creating Your Portfolio</h2>
            <p className="text-xl text-muted-foreground">
              Chat with our AI to create your personalized portfolio website
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Portfolio Assistant
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[450px] p-6">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-3 max-w-[80%] ${
                              message.role === "user" ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div
                              className={`rounded-lg p-4 ${
                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              <span className="text-xs opacity-70 mt-2 block">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {isGenerating && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                          </div>
                          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              <span className="text-sm font-medium">Generating your portfolio...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  <div className="border-t p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isLoading || !input.trim()}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Preview/Actions */}
            <div className="space-y-6">
              {generatedPortfolio ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Generated Portfolio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{generatedPortfolio.name}</h3>
                      <p className="text-muted-foreground">{generatedPortfolio.title}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {generatedPortfolio.skills.slice(0, 6).map((skill, index) => (
                          <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {generatedPortfolio.skills.length > 6 && (
                          <span className="text-xs text-muted-foreground">
                            +{generatedPortfolio.skills.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Projects:</p>
                      <p className="text-sm">{generatedPortfolio.projects.length} projects included</p>
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                      <Button onClick={handlePreview} variant="outline" className="w-full bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Portfolio
                      </Button>
                      <Button onClick={handleDownload} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">1</span>
                        </div>
                        <p>Describe the type of portfolio you want to create</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">2</span>
                        </div>
                        <p>Answer questions about your background and experience</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">3</span>
                        </div>
                        <p>Preview and download your generated portfolio</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
