import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Zap, Download, Palette, Code2, Globe } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Intelligent Questioning",
      description: "AI asks smart follow-up questions to understand your background, skills, and goals.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Get a complete portfolio website generated in minutes, not hours or days.",
    },
    {
      icon: Palette,
      title: "Beautiful Designs",
      description: "Modern, responsive designs that look professional across all devices.",
    },
    {
      icon: Code2,
      title: "Clean Code",
      description: "Generated with Next.js, TypeScript, and Tailwind CSS for optimal performance.",
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Download your complete portfolio as a ready-to-deploy project.",
    },
    {
      icon: Globe,
      title: "SEO Optimized",
      description: "Built-in SEO optimization to help your portfolio rank well in search results.",
    },
  ]

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system makes creating a professional portfolio effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
