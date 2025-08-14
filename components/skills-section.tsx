import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 95, color: "bg-blue-500" },
        { name: "TypeScript", level: 90, color: "bg-blue-600" },
        { name: "Tailwind CSS", level: 88, color: "bg-cyan-500" },
        { name: "Vue.js", level: 75, color: "bg-green-500" },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 92, color: "bg-green-600" },
        { name: "Python", level: 85, color: "bg-yellow-500" },
        { name: "PostgreSQL", level: 80, color: "bg-blue-700" },
        { name: "MongoDB", level: 78, color: "bg-green-700" },
      ],
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Docker", level: 82, color: "bg-blue-400" },
        { name: "AWS", level: 75, color: "bg-orange-500" },
        { name: "Git", level: 95, color: "bg-red-500" },
        { name: "CI/CD", level: 70, color: "bg-purple-500" },
      ],
    },
  ]

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Tailwind CSS",
    "GraphQL",
    "REST APIs",
    "Jest",
    "Cypress",
    "Figma",
    "Git",
    "Linux",
    "Vercel",
  ]

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="animate-slide-up hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
