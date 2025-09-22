import { type NextRequest, NextResponse } from "next/server"
import { users } from "@/lib/data/users"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    // Sort users by total points (in a real app, you'd filter by timeframe)
    const sortedUsers = [...users]
      .sort((a, b) => b.stats.totalPoints - a.stats.totalPoints)
      .slice(0, limit)
      .map((user, index) => ({
        rank: index + 1,
        username: user.username,
        avatar: user.avatar,
        totalPoints: user.stats.totalPoints,
        totalSolved: user.stats.totalSolved,
        streak: user.stats.streak,
      }))

    return NextResponse.json({
      success: true,
      data: sortedUsers,
      timeframe,
    })
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
