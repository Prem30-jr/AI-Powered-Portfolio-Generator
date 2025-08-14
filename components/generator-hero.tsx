"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, Code, Palette } from "lucide-react"

export function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">AI-Powered</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
            Portfolio Website Generator
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create stunning, personalized portfolio websites in minutes using AI. Just describe what you need, and our
            intelligent system will ask the right questions and generate a complete portfolio tailored to your skills
            and experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              onClick={scrollToGenerator}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate My Portfolio
            </Button>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Clean Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Modern Design</span>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <Button variant="ghost" size="sm" onClick={scrollToGenerator} className="animate-bounce">
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
