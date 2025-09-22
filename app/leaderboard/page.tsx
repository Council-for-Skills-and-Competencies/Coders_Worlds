"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Calendar, Target } from "lucide-react"

// Mock leaderboard data
const globalLeaderboard = [
  {
    rank: 1,
    name: "Sarah Chen",
    username: "sarahcodes",
    avatar: "/developer-working.png",
    points: 15420,
    solved: 234,
    level: 12,
    country: "🇺🇸",
    streak: 45,
  },
  {
    rank: 2,
    name: "Marcus Johnson",
    username: "marcusdev",
    avatar: "/programmer.png",
    points: 14890,
    solved: 221,
    level: 11,
    country: "🇨🇦",
    streak: 32,
  },
  {
    rank: 3,
    name: "Elena Rodriguez",
    username: "elenacode",
    avatar: "/coder.png",
    points: 14250,
    solved: 208,
    level: 11,
    country: "🇪🇸",
    streak: 28,
  },
  {
    rank: 4,
    name: "David Kim",
    username: "davidk",
    avatar: "/developer-working.png",
    points: 13780,
    solved: 195,
    level: 10,
    country: "🇰🇷",
    streak: 41,
  },
  {
    rank: 5,
    name: "Alex Johnson",
    username: "alexcodes",
    avatar: "/programmer.png",
    points: 12450,
    solved: 189,
    level: 10,
    country: "🇬🇧",
    streak: 12,
    isCurrentUser: true,
  },
]

const weeklyLeaderboard = [
  {
    rank: 1,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/developer-working.png",
    points: 1250,
    solved: 18,
    level: 8,
    country: "🇦🇺",
    streak: 7,
  },
  {
    rank: 2,
    name: "Alex Johnson",
    username: "alexcodes",
    avatar: "/programmer.png",
    points: 1100,
    solved: 16,
    level: 10,
    country: "🇬🇧",
    streak: 12,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Ryan Park",
    username: "ryanp",
    avatar: "/coder.png",
    points: 950,
    solved: 14,
    level: 7,
    country: "🇺🇸",
    streak: 5,
  },
]

const monthlyLeaderboard = [
  {
    rank: 1,
    name: "Sarah Chen",
    username: "sarahcodes",
    avatar: "/developer-working.png",
    points: 4250,
    solved: 62,
    level: 12,
    country: "🇺🇸",
    streak: 45,
  },
  {
    rank: 2,
    name: "Alex Johnson",
    username: "alexcodes",
    avatar: "/programmer.png",
    points: 3890,
    solved: 58,
    level: 10,
    country: "🇬🇧",
    streak: 12,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Marcus Johnson",
    username: "marcusdev",
    avatar: "/programmer.png",
    points: 3650,
    solved: 54,
    level: 11,
    country: "🇨🇦",
    streak: 32,
  },
]

const topCountries = [
  { country: "🇺🇸 United States", users: 12450, avgPoints: 8920 },
  { country: "🇨🇳 China", users: 9870, avgPoints: 9240 },
  { country: "🇮🇳 India", users: 8650, avgPoints: 7850 },
  { country: "🇬🇧 United Kingdom", users: 5420, avgPoints: 8650 },
  { country: "🇨🇦 Canada", users: 4890, avgPoints: 9120 },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-muted-foreground font-semibold">#{rank}</span>
  }
}

function LeaderboardTable({ data }: { data: typeof globalLeaderboard }) {
  return (
    <div className="space-y-2">
      {data.map((user) => (
        <Card
          key={user.username}
          className={`transition-colors ${user.isCurrentUser ? "bg-primary/5 border-primary/20" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-sm">{user.country}</span>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">@{user.username}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-primary">{user.points.toLocaleString()}</div>
                  <div className="text-muted-foreground">Points</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{user.solved}</div>
                  <div className="text-muted-foreground">Solved</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Level {user.level}</div>
                  <div className="text-muted-foreground">{user.streak} streak</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("global")

  const getLeaderboardData = () => {
    switch (selectedPeriod) {
      case "weekly":
        return weeklyLeaderboard
      case "monthly":
        return monthlyLeaderboard
      default:
        return globalLeaderboard
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Leaderboard</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            See how you rank against other coders from around the world
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">50,247</div>
                <div className="text-sm text-muted-foreground">Active Coders</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">2.1M</div>
                <div className="text-sm text-muted-foreground">Solutions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">8,450</div>
                <div className="text-sm text-muted-foreground">Avg Points</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2" />
                      Rankings
                    </CardTitle>
                    <CardDescription>Top performers across the platform</CardDescription>
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">All Time</SelectItem>
                      <SelectItem value="monthly">This Month</SelectItem>
                      <SelectItem value="weekly">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <LeaderboardTable data={getLeaderboardData()} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Top Countries
                </CardTitle>
                <CardDescription>Most active coding communities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                        <div>
                          <div className="font-medium text-sm">{country.country}</div>
                          <div className="text-xs text-muted-foreground">{country.users.toLocaleString()} users</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{country.avgPoints.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">avg points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Rank */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Trophy className="h-5 w-5 mr-2" />
                  Your Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">#1,247</div>
                    <div className="text-sm text-muted-foreground">Global Ranking</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">2,450</div>
                      <div className="text-xs text-muted-foreground">Total Points</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">89</div>
                      <div className="text-xs text-muted-foreground">Problems Solved</div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">You're in the top 2.5% of all users!</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <div>
                      <div className="text-sm font-medium">Problem Solver</div>
                      <div className="text-xs text-muted-foreground">Solved 50 challenges</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <Medal className="h-6 w-6 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">Speed Demon</div>
                      <div className="text-xs text-muted-foreground">5 challenges in one day</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
