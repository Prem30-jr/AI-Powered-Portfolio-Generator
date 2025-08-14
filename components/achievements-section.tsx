import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrophyIcon, AwardIcon, StarIcon, BadgeIcon as CertificateIcon } from "lucide-react"

export function AchievementsSection() {
  const achievements = [
    {
      icon: <TrophyIcon className="h-8 w-8" />,
      title: "Best Innovation Award 2023",
      description: "Recognized for developing an AI-powered solution that improved user engagement by 150%",
      date: "2023",
      category: "Award",
    },
    {
      icon: <CertificateIcon className="h-8 w-8" />,
      title: "AWS Solutions Architect",
      description: "Professional certification in cloud architecture and deployment strategies",
      date: "2023",
      category: "Certification",
    },
    {
      icon: <StarIcon className="h-8 w-8" />,
      title: "Open Source Contributor",
      description: "Active contributor to popular React and Node.js libraries with 500+ GitHub stars",
      date: "Ongoing",
      category: "Community",
    },
    {
      icon: <AwardIcon className="h-8 w-8" />,
      title: "Tech Lead of the Year",
      description: "Led a team of 8 developers to deliver 5 major projects ahead of schedule",
      date: "2022",
      category: "Leadership",
    },
  ]

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "15+", label: "Technologies Mastered" },
    { number: "100%", label: "Client Satisfaction" },
  ]

  const certifications = [
    "AWS Solutions Architect",
    "Google Cloud Professional",
    "MongoDB Certified Developer",
    "React Advanced Patterns",
    "Node.js Application Developer",
    "Kubernetes Administrator",
  ]

  return (
    <section id="achievements" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Achievements & Recognition</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Milestones and accomplishments that define my professional journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Major Achievements */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-primary bg-primary/10 p-3 rounded-lg">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{achievement.date}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Professional Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
