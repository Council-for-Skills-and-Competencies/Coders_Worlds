import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Trophy, Users, BookOpen, ArrowRight, Star, Zap, Target } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Code2,
      title: "Interactive Challenges",
      description: "Solve coding problems with our built-in editor and instant feedback",
      color: "text-primary",
    },
    {
      icon: Trophy,
      title: "Compete & Rank",
      description: "Climb the leaderboard and earn achievements as you improve",
      color: "text-secondary",
    },
    {
      icon: BookOpen,
      title: "Learn & Grow",
      description: "Access tutorials, hints, and explanations for every challenge",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with developers worldwide and share your solutions",
      color: "text-secondary",
    },
  ]

  const stats = [
    { label: "Active Coders", value: "50K+", icon: Users },
    { label: "Challenges", value: "1,200+", icon: Target },
    { label: "Solutions", value: "2M+", icon: Code2 },
    { label: "Countries", value: "150+", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            New challenges added weekly
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Welcome to <span className="text-primary">Coders World</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Practice coding challenges, learn new skills, and compete with developers from around the globe. Your
            journey to becoming a better programmer starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Coding
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              View Challenges
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Everything you need to excel</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Our platform provides all the tools and resources you need to improve your coding skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-pretty">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Ready to start your coding journey?</h2>
          <p className="text-xl text-primary-foreground/90 text-pretty mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already improving their skills on Coders World
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">Coders World</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Coders World. Built for developers, by developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
