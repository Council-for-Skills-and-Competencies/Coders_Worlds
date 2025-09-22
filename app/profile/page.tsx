"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Code2, TrendingUp, Clock, CheckCircle, Award, Flame } from "lucide-react"

// Mock user data
const userData = {
  name: "Alex Johnson",
  username: "alexcodes",
  email: "alex@example.com",
  avatar: "/developer-avatar.png",
  level: 5,
  xp: 2450,
  xpToNext: 3000,
  rank: 1247,
  totalUsers: 50000,
  joinDate: "January 2024",
  streak: 12,
  totalSolved: 89,
  easyCount: 45,
  mediumCount: 32,
  hardCount: 12,
}

const recentActivity = [
  {
    id: 1,
    type: "solved",
    title: "Two Sum",
    difficulty: "Easy",
    date: "2 hours ago",
    points: 100,
  },
  {
    id: 2,
    type: "solved",
    title: "Binary Tree Traversal",
    difficulty: "Medium",
    date: "1 day ago",
    points: 200,
  },
  {
    id: 3,
    type: "attempted",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    date: "2 days ago",
    points: 0,
  },
  {
    id: 4,
    type: "solved",
    title: "Valid Parentheses",
    difficulty: "Easy",
    date: "3 days ago",
    points: 100,
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Solve your first challenge",
    icon: Target,
    earned: true,
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    title: "Speed Demon",
    description: "Solve 5 challenges in one day",
    icon: Flame,
    earned: true,
    date: "Feb 3, 2024",
  },
  {
    id: 3,
    title: "Problem Solver",
    description: "Solve 50 challenges",
    icon: Trophy,
    earned: true,
    date: "Mar 12, 2024",
  },
  {
    id: 4,
    title: "Hard Mode",
    description: "Solve 10 hard challenges",
    icon: Award,
    earned: false,
    date: null,
  },
]

const skillsData = [
  { skill: "Arrays", solved: 25, total: 30, percentage: 83 },
  { skill: "Strings", solved: 18, total: 25, percentage: 72 },
  { skill: "Trees", solved: 12, total: 20, percentage: 60 },
  { skill: "Dynamic Programming", solved: 8, total: 15, percentage: 53 },
  { skill: "Graphs", solved: 6, total: 18, percentage: 33 },
]

export default function ProfilePage() {
  const progressPercentage = (userData.xp / userData.xpToNext) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback className="text-lg">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">@{userData.username}</p>
                    <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        Level {userData.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {userData.xp} / {userData.xpToNext} XP
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Trophy className="h-4 w-4" />
                      Rank #{userData.rank.toLocaleString()} of {userData.totalUsers.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="h-4 w-4 text-orange-500" />
                      {userData.streak} day streak
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Level {userData.level + 1}</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </div>

                <Button>Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userData.totalSolved}</div>
                <div className="text-sm text-muted-foreground">Total Solved</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userData.easyCount}</div>
                <div className="text-sm text-muted-foreground">Easy</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{userData.mediumCount}</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{userData.hardCount}</div>
                <div className="text-sm text-muted-foreground">Hard</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest coding challenges and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {activity.type === "solved" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Code2 className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.type === "solved" ? "Solved" : "Attempted"} • {activity.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            activity.difficulty === "Easy"
                              ? "border-green-200 text-green-800"
                              : activity.difficulty === "Medium"
                                ? "border-yellow-200 text-yellow-800"
                                : "border-red-200 text-red-800"
                          }
                        >
                          {activity.difficulty}
                        </Badge>
                        {activity.points > 0 && (
                          <div className="text-sm text-muted-foreground">+{activity.points} XP</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Skills Progress
                </CardTitle>
                <CardDescription>Your progress across different programming topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsData.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.solved} / {skill.total} solved
                        </span>
                      </div>
                      <Progress value={skill.percentage} className="h-2" />
                      <div className="text-right text-sm text-muted-foreground">{skill.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
                <CardDescription>Milestones and badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 border rounded-lg ${
                          achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-muted opacity-60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon
                            className={`h-8 w-8 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                            {achievement.earned && achievement.date && (
                              <div className="text-xs text-muted-foreground">Earned on {achievement.date}</div>
                            )}
                          </div>
                          {achievement.earned && <CheckCircle className="h-5 w-5 text-green-600" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
