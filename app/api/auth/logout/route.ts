import { type NextRequest, NextResponse } from "next/server"
import { deleteSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("session")?.value

    if (token) {
      deleteSession(token)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete("session")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 })
  }
}
