"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Play, Save, RotateCcw, Clock, Trophy, CheckCircle, XCircle, Users, BookOpen, Code2 } from "lucide-react"

// Mock challenge data
const challengeData = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  points: 100,
  timeLimit: "30 min",
  description:
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  starterCode: {
    javascript: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
    python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
    java: `public int[] twoSum(int[] nums, int target) {
    // Write your solution here
    
}`,
  },
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Hard: "bg-red-100 text-red-800 border-red-200",
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState(challengeData.starterCode.javascript)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(challengeData.starterCode[language as keyof typeof challengeData.starterCode])
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setShowResults(true)

    // Simulate test execution
    setTimeout(() => {
      setTestResults([
        { input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", actual: "[0,1]", passed: true },
        { input: "nums = [3,2,4], target = 6", expected: "[1,2]", actual: "[1,2]", passed: true },
        { input: "nums = [3,3], target = 6", expected: "[0,1]", actual: "[0,1]", passed: true },
      ])
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = () => {
    // Handle submission logic
    console.log("Submitting solution...")
  }

  const handleReset = () => {
    setCode(challengeData.starterCode[selectedLanguage as keyof typeof challengeData.starterCode])
    setTestResults([])
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        {/* Challenge Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">{challengeData.title}</h1>
              <Badge
                className={`text-xs font-medium border ${difficultyColors[challengeData.difficulty as keyof typeof difficultyColors]}`}
              >
                {challengeData.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                {challengeData.points} points
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {challengeData.timeLimit}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-pretty whitespace-pre-line">{challengeData.description}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Examples</h4>
                  <div className="space-y-4">
                    {challengeData.examples.map((example, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="font-mono text-sm space-y-1">
                          <div>
                            <strong>Input:</strong> {example.input}
                          </div>
                          <div>
                            <strong>Output:</strong> {example.output}
                          </div>
                          <div className="text-muted-foreground">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Constraints</h4>
                  <ul className="space-y-1 text-sm">
                    {challengeData.constraints.map((constraint, index) => (
                      <li key={index} className="font-mono">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            {showResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isRunning ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="ml-3">Running tests...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {testResults.map((result, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                          {result.passed ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1 font-mono text-sm">
                            <div className="mb-1">
                              <strong>Input:</strong> {result.input}
                            </div>
                            <div className="mb-1">
                              <strong>Expected:</strong> {result.expected}
                            </div>
                            <div>
                              <strong>Actual:</strong> {result.actual}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center text-green-800">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span className="font-semibold">All tests passed!</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Code2 className="h-5 w-5 mr-2" />
                    Code Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm min-h-[300px] resize-none"
                    placeholder="Write your solution here..."
                  />

                  <div className="flex gap-2">
                    <Button onClick={handleRunCode} disabled={isRunning} className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                    <Button variant="outline" onClick={handleSubmit}>
                      <Save className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">15,420</div>
                    <div className="text-sm text-muted-foreground">Total Attempts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
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
