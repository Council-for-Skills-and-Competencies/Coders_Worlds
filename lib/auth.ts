import { users, type User } from "@/lib/data/users"
import { cookies } from "next/headers"

export interface AuthUser {
  id: string
  username: string
  email: string
  avatar: string
}

// Simple session management (in production, use proper JWT or session store)
const sessions = new Map<string, { userId: string; expiresAt: number }>()

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function createSession(userId: string): string {
  const token = generateSessionToken()
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  sessions.set(token, { userId, expiresAt })
  return token
}

export function validateSession(token: string): { userId: string } | null {
  const session = sessions.get(token)
  if (!session || session.expiresAt < Date.now()) {
    if (session) sessions.delete(token)
    return null
  }
  return { userId: session.userId }
}

export function deleteSession(token: string): void {
  sessions.delete(token)
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return null

    const session = validateSession(token)
    if (!session) return null

    const user = users.find((u) => u.id === session.userId)
    if (!user) return null

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    }
  } catch {
    return null
  }
}

export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  return Buffer.from(password).toString("base64")
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

export function authenticateUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email)
  if (!user || !user.password) return null

  if (verifyPassword(password, user.password)) {
    return user
  }
  return null
}

export function createUser(username: string, email: string, password: string): User {
  const newUser: User = {
    id: (users.length + 1).toString(),
    username,
    email,
    password: hashPassword(password),
    avatar: "/developer-avatar.png",
    joinDate: new Date().toISOString().split("T")[0],
    stats: {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      totalPoints: 0,
      rank: users.length + 1,
      streak: 0,
      maxStreak: 0,
    },
    recentActivity: [],
    achievements: [
      {
        id: "welcome",
        title: "Welcome to Coders World",
        description: "Joined the community",
        icon: "🎉",
        unlockedAt: new Date().toISOString(),
      },
    ],
    preferences: {
      language: "javascript",
      theme: "light",
    },
  }

  users.push(newUser)
  return newUser
}
