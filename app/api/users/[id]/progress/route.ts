import { type NextRequest, NextResponse } from "next/server"
import { users, submissions } from "@/lib/data/users"
import { challenges } from "@/lib/data/challenges"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = users.find((u) => u.id === params.id)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Get user's submissions
    const userSubmissions = submissions.filter((s) => s.userId === params.id)

    // Calculate progress statistics
    const solvedChallenges = userSubmissions
      .filter((s) => s.status === "accepted")
      .map((s) => s.challengeId)
      .filter((id, index, arr) => arr.indexOf(id) === index) // Remove duplicates

    const progressByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    }

    solvedChallenges.forEach((challengeId) => {
      const challenge = challenges.find((c) => c.id === challengeId)
      if (challenge) {
        progressByDifficulty[challenge.difficulty.toLowerCase() as keyof typeof progressByDifficulty]++
      }
    })

    // Recent submissions
    const recentSubmissions = userSubmissions
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 10)
      .map((submission) => {
        const challenge = challenges.find((c) => c.id === submission.challengeId)
        return {
          ...submission,
          challengeTitle: challenge?.title || "Unknown Challenge",
        }
      })

    return NextResponse.json({
      success: true,
      data: {
        totalSolved: solvedChallenges.length,
        progressByDifficulty,
        recentSubmissions,
        totalSubmissions: userSubmissions.length,
        acceptanceRate:
          userSubmissions.length > 0 ? Math.round((solvedChallenges.length / userSubmissions.length) * 100) : 0,
      },
    })
  } catch (error) {
    console.error("Error fetching user progress:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch user progress" }, { status: 500 })
  }
}
