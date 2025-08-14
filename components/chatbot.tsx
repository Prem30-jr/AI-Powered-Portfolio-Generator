"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircleIcon, XIcon, SendIcon, BotIcon, UserIcon } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm here to help you learn more about this developer's skills, projects, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-accent hover:bg-accent/90"
        }`}
        size="icon"
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <MessageCircleIcon className="h-6 w-6 animate-pulse" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] shadow-2xl animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BotIcon className="h-5 w-5 text-accent" />
              Portfolio AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[420px]">
            {/* Messages */}
            <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <BotIcon className="h-4 w-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[280px] rounded-lg px-3 py-2 text-sm ${
                        message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <UserIcon className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <BotIcon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, projects, experience..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="icon"
                  className="bg-accent hover:bg-accent/90"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
