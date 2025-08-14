"use client"

import { Button } from "@/components/ui/button"
import { ArrowDownIcon, MessageCircleIcon } from "lucide-react"

export function HeroSection() {
  const scrollToChatbot = () => {
    // This will trigger the chatbot to open
    const chatButton = document.querySelector("[data-chatbot-trigger]") as HTMLButtonElement
    if (chatButton) {
      chatButton.click()
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 dark:to-secondary/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Empowering Solutions
            <br />
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Through Code
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Showcasing My Journey as a Developer
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover how I transform user experiences with innovative solutions, powered by cutting-edge technologies
            and AI integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground theme-transition"
              asChild
            >
              <a href="#projects">
                Explore My Projects
                <ArrowDownIcon className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent theme-transition"
              onClick={scrollToChatbot}
              data-chatbot-trigger
            >
              <MessageCircleIcon className="mr-2 h-5 w-5" />
              Chat with AI
            </Button>
          </div>

          <div className="animate-bounce">
            <ArrowDownIcon className="h-6 w-6 text-muted-foreground mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
