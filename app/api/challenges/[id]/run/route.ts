import { type NextRequest, NextResponse } from "next/server"
import { challenges } from "@/lib/data/challenges"
import { executeCode } from "@/lib/code-executor"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { code, language, input } = await request.json()

    if (!code || !language) {
      return NextResponse.json({ success: false, error: "Code and language are required" }, { status: 400 })
    }

    const challenge = challenges.find((c) => c.id === params.id)
    if (!challenge) {
      return NextResponse.json({ success: false, error: "Challenge not found" }, { status: 404 })
    }

    // If custom input is provided, run against that
    if (input) {
      const customTestCase = {
        input,
        expectedOutput: "Custom test", // We don't know the expected output for custom input
      }

      const result = executeCode(code, language, [customTestCase])

      return NextResponse.json({
        success: true,
        data: {
          output: result.testResults[0]?.actualOutput || "",
          error: result.testResults[0]?.error,
          executionTime: result.testResults[0]?.executionTime || 0,
          isCustomInput: true,
        },
      })
    }

    // Run against sample test cases (non-hidden ones)
    const sampleTestCases = challenge.testCases.filter((tc) => !tc.hidden)
    const result = executeCode(code, language, sampleTestCases)

    return NextResponse.json({
      success: true,
      data: {
        status: result.status,
        testResults: result.testResults,
        runtime: result.runtime,
        memory: result.memory,
        passedTests: result.passedTests,
        totalTests: result.totalTests,
      },
    })
  } catch (error) {
    console.error("Error running code:", error)
    return NextResponse.json({ success: false, error: "Failed to run code" }, { status: 500 })
  }
}
