import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { CodeIcon, RocketIcon, UsersIcon, TrophyIcon } from "lucide-react"

export function AboutSection() {
  const highlights = [
    {
      icon: <CodeIcon className="h-6 w-6" />,
      title: "5+ Years Experience",
      description: "Building scalable web applications",
    },
    {
      icon: <RocketIcon className="h-6 w-6" />,
      title: "50+ Projects",
      description: "Delivered across various industries",
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: "Team Leadership",
      description: "Led cross-functional development teams",
    },
    {
      icon: <TrophyIcon className="h-6 w-6" />,
      title: "Award Winner",
      description: "Recognized for innovative solutions",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate developer crafting digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="relative">
              <OptimizedImage
                src="/placeholder.svg?height=500&width=400"
                alt="Professional developer portrait showcasing expertise in full-stack development"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                priority={true}
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg">
                <p className="font-semibold">Available for Projects</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Hello, I'm a Full-Stack Developer</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                With over 5 years of experience in web development, I specialize in creating robust, scalable
                applications using modern technologies. My passion lies in solving complex problems and delivering
                exceptional user experiences that drive business growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe in the power of clean code, innovative design, and collaborative teamwork. When I'm not
                coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring
                aspiring developers.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                Problem Solver
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Team Player
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Innovation Focused
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Continuous Learner
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="text-primary mb-4 flex justify-center">{highlight.icon}</div>
                <h4 className="font-semibold text-foreground mb-2">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
