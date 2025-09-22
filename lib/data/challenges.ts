export interface Challenge {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  testCases: Array<{
    input: string
    expectedOutput: string
    hidden?: boolean
  }>
  starterCode: {
    javascript: string
    python: string
    java: string
  }
  tags: string[]
  points: number
  submissions: number
  acceptanceRate: number
}

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]", hidden: true },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
}`,
    },
    tags: ["Array", "Hash Table"],
    points: 100,
    submissions: 1250,
    acceptanceRate: 85.2,
  },
  {
    id: "2",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 ≤ Node.val ≤ 5000"],
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1,2]", expectedOutput: "[2,1]" },
      { input: "[]", expectedOutput: "[]", hidden: true },
    ],
    starterCode: {
      javascript: `function reverseList(head) {
    // Your code here
}`,
      python: `def reverse_list(head):
    # Your code here
    pass`,
      java: `public ListNode reverseList(ListNode head) {
    // Your code here
}`,
    },
    tags: ["Linked List", "Recursion"],
    points: 150,
    submissions: 980,
    acceptanceRate: 78.5,
  },
  {
    id: "3",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", hidden: true },
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
    // Your code here
}`,
      python: `def max_sub_array(nums):
    # Your code here
    pass`,
      java: `public int maxSubArray(int[] nums) {
    // Your code here
}`,
    },
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    points: 200,
    submissions: 750,
    acceptanceRate: 65.8,
  },
]
