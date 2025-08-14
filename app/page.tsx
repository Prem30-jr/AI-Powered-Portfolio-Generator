import { PortfolioGenerator } from "@/components/portfolio-generator"
import { HeroSection } from "@/components/generator-hero"
import { FeaturesSection } from "@/components/features-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PortfolioGenerator />
    </main>
  )
}
