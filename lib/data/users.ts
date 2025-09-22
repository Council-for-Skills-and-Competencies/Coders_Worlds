export interface User {
  id: string
  username: string
  email: string
  password?: string // Only for backend, never sent to frontend
  avatar: string
  joinDate: string
  stats: {
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    totalPoints: number
    rank: number
    streak: number
    maxStreak: number
  }
  recentActivity: Array<{
    type: "solved" | "attempted" | "achievement"
    challengeId?: string
    challengeTitle?: string
    date: string
    points?: number
  }>
  achievements: Array<{
    id: string
    title: string
    description: string
    icon: string
    unlockedAt: string
  }>
  preferences: {
    language: "javascript" | "python" | "java"
    theme: "light" | "dark"
  }
}

export interface Submission {
  id: string
  userId: string
  challengeId: string
  code: string
  language: string
  status: "accepted" | "wrong_answer" | "time_limit_exceeded" | "runtime_error"
  runtime?: number
  memory?: number
  submittedAt: string
  testResults?: Array<{
    passed: boolean
    input: string
    expectedOutput: string
    actualOutput: string
  }>
}

// Mock users data
export const users: User[] = [
  {
    id: "1",
    username: "CodeMaster",
    email: "codemaster@example.com",
    avatar: "/developer-avatar.png",
    joinDate: "2024-01-15",
    stats: {
      totalSolved: 145,
      easySolved: 65,
      mediumSolved: 55,
      hardSolved: 25,
      totalPoints: 12450,
      rank: 1,
      streak: 15,
      maxStreak: 28,
    },
    recentActivity: [
      {
        type: "solved",
        challengeId: "3",
        challengeTitle: "Maximum Subarray",
        date: "2024-12-19",
        points: 200,
      },
      {
        type: "solved",
        challengeId: "2",
        challengeTitle: "Reverse Linked List",
        date: "2024-12-18",
        points: 150,
      },
    ],
    achievements: [
      {
        id: "1",
        title: "First Steps",
        description: "Solved your first challenge",
        icon: "🎯",
        unlockedAt: "2024-01-16",
      },
      {
        id: "2",
        title: "Speed Demon",
        description: "Solved 10 challenges in one day",
        icon: "⚡",
        unlockedAt: "2024-02-01",
      },
    ],
    preferences: {
      language: "javascript",
      theme: "dark",
    },
  },
]

// Mock submissions data
export const submissions: Submission[] = [
  {
    id: "1",
    userId: "1",
    challengeId: "1",
    code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    language: "javascript",
    status: "accepted",
    runtime: 68,
    memory: 42.1,
    submittedAt: "2024-12-17T10:30:00Z",
  },
]
