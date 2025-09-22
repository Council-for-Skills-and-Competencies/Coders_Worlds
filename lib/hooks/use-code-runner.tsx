"use client"

import { useState } from "react"

interface RunResult {
  output?: string
  error?: string
  executionTime?: number
  status?: string
  testResults?: Array<{
    passed: boolean
    input: string
    expectedOutput: string
    actualOutput: string
    error?: string
  }>
  passedTests?: number
  totalTests?: number
  runtime?: number
  memory?: number
  isCustomInput?: boolean
}

export function useCodeRunner() {
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const runCode = async (
    challengeId: string,
    code: string,
    language: string,
    customInput?: string,
  ): Promise<RunResult | null> => {
    setIsRunning(true)
    try {
      const response = await fetch(`/api/challenges/${challengeId}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, input: customInput }),
      })

      const data = await response.json()

      if (data.success) {
        return data.data
      } else {
        console.error("Run failed:", data.error)
        return null
      }
    } catch (error) {
      console.error("Error running code:", error)
      return null
    } finally {
      setIsRunning(false)
    }
  }

  const submitCode = async (challengeId: string, code: string, language: string, userId: string): Promise<any> => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, userId }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error submitting code:", error)
      return { success: false, error: "Submission failed" }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    runCode,
    submitCode,
    isRunning,
    isSubmitting,
  }
}
