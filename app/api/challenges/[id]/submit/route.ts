import { type NextRequest, NextResponse } from "next/server"
import { challenges } from "@/lib/data/challenges"
import { submissions } from "@/lib/data/users"

// Simple code execution simulator
function executeCode(code: string, language: string, testCases: any[]): any {
  // This is a simplified simulation - in a real app you'd use a secure code execution service
  const results = testCases.map((testCase) => {
    // Simulate test execution
    const passed = Math.random() > 0.3 // 70% pass rate for demo
    return {
      passed,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: passed ? testCase.expectedOutput : "Wrong output",
    }
  })

  const allPassed = results.every((r) => r.passed)
  const status = allPassed ? "accepted" : "wrong_answer"

  return {
    status,
    testResults: results,
    runtime: Math.floor(Math.random() * 100) + 50, // Random runtime
    memory: Math.floor(Math.random() * 20) + 30, // Random memory usage
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { code, language, userId } = await request.json()

    if (!code || !language || !userId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const challenge = challenges.find((c) => c.id === params.id)
    if (!challenge) {
      return NextResponse.json({ success: false, error: "Challenge not found" }, { status: 404 })
    }

    // Execute code against test cases
    const executionResult = executeCode(code, language, challenge.testCases)

    // Create submission record
    const submission = {
      id: Date.now().toString(),
      userId,
      challengeId: params.id,
      code,
      language,
      status: executionResult.status,
      runtime: executionResult.runtime,
      memory: executionResult.memory,
      submittedAt: new Date().toISOString(),
      testResults: executionResult.testResults,
    }

    // In a real app, you'd save this to a database
    submissions.push(submission)

    return NextResponse.json({
      success: true,
      data: {
        submission,
        points: executionResult.status === "accepted" ? challenge.points : 0,
      },
    })
  } catch (error) {
    console.error("Error submitting solution:", error)
    return NextResponse.json({ success: false, error: "Failed to submit solution" }, { status: 500 })
  }
}
