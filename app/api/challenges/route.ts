import { type NextRequest, NextResponse } from "next/server"
import { challenges } from "@/lib/data/challenges"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get("difficulty")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let filteredChallenges = [...challenges]

    // Filter by difficulty
    if (difficulty && difficulty !== "all") {
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.difficulty.toLowerCase() === difficulty.toLowerCase(),
      )
    }

    // Filter by category
    if (category && category !== "all") {
      filteredChallenges = filteredChallenges.filter(
        (challenge) => challenge.category.toLowerCase() === category.toLowerCase(),
      )
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredChallenges = filteredChallenges.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchLower) ||
          challenge.description.toLowerCase().includes(searchLower) ||
          challenge.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredChallenges,
      total: filteredChallenges.length,
    })
  } catch (error) {
    console.error("Error fetching challenges:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch challenges" }, { status: 500 })
  }
}
