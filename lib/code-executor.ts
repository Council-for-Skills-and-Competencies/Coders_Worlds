// Enhanced code execution simulator with better test case handling
export interface TestResult {
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput: string
  error?: string
  executionTime?: number
}

export interface ExecutionResult {
  status: "accepted" | "wrong_answer" | "time_limit_exceeded" | "runtime_error" | "compilation_error"
  testResults: TestResult[]
  runtime: number
  memory: number
  totalTests: number
  passedTests: number
}

// Simple JavaScript code execution in a sandboxed environment
function executeJavaScript(code: string, input: string): { output: string; error?: string; executionTime: number } {
  const startTime = Date.now()

  try {
    // Create a sandboxed function
    const wrappedCode = `
      ${code}
      
      // Parse input and call the main function
      const parseInput = (input) => {
        try {
          // Handle array inputs like "[2,7,11,15], 9"
          if (input.includes('[') && input.includes(']')) {
            const parts = input.split('], ')
            if (parts.length === 2) {
              const arr = JSON.parse(parts[0] + ']')
              const target = parseInt(parts[1])
              return [arr, target]
            } else {
              return [JSON.parse(input)]
            }
          }
          // Handle simple number inputs
          if (!isNaN(Number(input))) {
            return [Number(input)]
          }
          // Handle string inputs
          return [input]
        } catch (e) {
          return [input]
        }
      }
      
      const args = parseInput("${input.replace(/"/g, '\\"')}")
      
      // Try to find and call the main function
      if (typeof twoSum === 'function') {
        return JSON.stringify(twoSum(...args))
      } else if (typeof reverseList === 'function') {
        return JSON.stringify(reverseList(...args))
      } else if (typeof maxSubArray === 'function') {
        return JSON.stringify(maxSubArray(...args))
      } else {
        return "Function not found"
      }
    `

    // Execute the code
    const result = new Function(wrappedCode)()
    const executionTime = Date.now() - startTime

    return {
      output: result,
      executionTime,
    }
  } catch (error) {
    const executionTime = Date.now() - startTime
    return {
      output: "",
      error: error instanceof Error ? error.message : "Runtime error",
      executionTime,
    }
  }
}

// Python code execution simulator
function executePython(code: string, input: string): { output: string; error?: string; executionTime: number } {
  const startTime = Date.now()

  // This is a simplified Python execution simulator
  // In a real application, you would use a secure Python execution environment
  try {
    // Simulate Python execution with some basic pattern matching
    if (code.includes("def two_sum")) {
      // Simulate two sum execution
      const match = input.match(/\[([^\]]+)\], (\d+)/)
      if (match) {
        const arr = match[1].split(",").map((n) => Number.parseInt(n.trim()))
        const target = Number.parseInt(match[2])

        // Simple two sum implementation
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
              return {
                output: `[${i}, ${j}]`,
                executionTime: Date.now() - startTime,
              }
            }
          }
        }
      }
    }

    // Default simulation
    return {
      output: "Simulated Python execution",
      executionTime: Date.now() - startTime,
    }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Runtime error",
      executionTime: Date.now() - startTime,
    }
  }
}

export function executeCode(code: string, language: string, testCases: any[]): ExecutionResult {
  const testResults: TestResult[] = []
  let totalRuntime = 0

  for (const testCase of testCases) {
    let result: { output: string; error?: string; executionTime: number }

    switch (language.toLowerCase()) {
      case "javascript":
        result = executeJavaScript(code, testCase.input)
        break
      case "python":
        result = executePython(code, testCase.input)
        break
      case "java":
        // Java execution would be implemented similarly
        result = {
          output: "Java execution not implemented",
          executionTime: Math.random() * 100,
        }
        break
      default:
        result = {
          output: "",
          error: "Unsupported language",
          executionTime: 0,
        }
    }

    totalRuntime += result.executionTime

    const testResult: TestResult = {
      passed: !result.error && result.output === testCase.expectedOutput,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: result.error ? `Error: ${result.error}` : result.output,
      error: result.error,
      executionTime: result.executionTime,
    }

    testResults.push(testResult)
  }

  const passedTests = testResults.filter((r) => r.passed).length
  const totalTests = testResults.length

  let status: ExecutionResult["status"] = "accepted"

  if (testResults.some((r) => r.error)) {
    status = "runtime_error"
  } else if (passedTests < totalTests) {
    status = "wrong_answer"
  } else if (totalRuntime > 5000) {
    // 5 second limit
    status = "time_limit_exceeded"
  }

  return {
    status,
    testResults,
    runtime: Math.round(totalRuntime),
    memory: Math.floor(Math.random() * 20) + 30, // Simulated memory usage
    totalTests,
    passedTests,
  }
}
