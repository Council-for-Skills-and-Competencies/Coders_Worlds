import { type NextRequest, NextResponse } from "next/server"
import { challenges } from "@/lib/data/challenges"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const challenge = challenges.find((c) => c.id === params.id)

    if (!challenge) {
      return NextResponse.json({ success: false, error: "Challenge not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: challenge,
    })
  } catch (error) {
    console.error("Error fetching challenge:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch challenge" }, { status: 500 })
  }
}
