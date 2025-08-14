import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Interactive dashboard with machine learning insights, real-time data visualization, and predictive analytics.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Social Media Management Tool",
      description:
        "Comprehensive platform for managing multiple social media accounts with scheduling and analytics features.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Redis", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Real-Time Chat Application",
      description: "Scalable chat application with file sharing, group conversations, and end-to-end encryption.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Socket.io", "Node.js", "JWT", "AWS S3"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Task Management System",
      description:
        "Collaborative project management tool with kanban boards, time tracking, and team collaboration features.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Weather Forecast App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React Native", "OpenWeather API", "Redux", "Maps API"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how I transformed user experiences with innovative solutions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
            >
              <div className="relative overflow-hidden">
                <OptimizedImage
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} - ${project.description}`}
                  width={500}
                  height={300}
                  className="w-full h-64 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLinkIcon className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 animate-slide-up">
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - ${project.description}`}
                    width={400}
                    height={240}
                    className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="w-3 h-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
