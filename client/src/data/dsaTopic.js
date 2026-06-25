function q(id, title) {
  return { id, title };
}

function diff(id, title, questions) {
  return { id, title, questions };
}

function topic(id, title, difficulties) {
  return { id, title, difficulties };
}

const dsaTopics = [
  topic(1, "Arrays", [
    diff("easy", "Easy", [
      q(1, "Two Sum"),
      q(2, "Best Time to Buy and Sell Stock"),
      q(3, "Contains Duplicate"),
      q(4, "Maximum Subarray"),
      q(5, "Move Zeroes"),
    ]),
    diff("medium", "Medium", [
      q(6, "Product of Array Except Self"),
      q(7, "3Sum"),
    ]),
    diff("hard", "Hard", [q(8, "Trapping Rain Water")]),
  ]),

  topic(2, "Strings", [
    diff("easy", "Easy", [
      q(1, "Valid Anagram"),
      q(2, "Valid Palindrome"),
      q(3, "Longest Common Prefix"),
    ]),
    diff("medium", "Medium", [
      q(4, "Longest Substring Without Repeating Characters"),
      q(5, "Group Anagrams"),
      q(6, "String to Integer (atoi)"),
    ]),
    diff("hard", "Hard", [q(7, "Minimum Window Substring")]),
  ]),

  topic(3, "Linked List", [
    diff("easy", "Easy", [
      q(1, "Reverse Linked List"),
      q(2, "Merge Two Sorted Lists"),
      q(3, "Linked List Cycle"),
    ]),
    diff("medium", "Medium", [
      q(4, "Reorder List"),
      q(5, "Remove Nth Node From End of List"),
      q(6, "Add Two Numbers"),
    ]),
    diff("hard", "Hard", [q(7, "Merge k Sorted Lists")]),
  ]),

  topic(4, "Stack", [
    diff("easy", "Easy", [
      q(1, "Valid Parentheses"),
      q(2, "Min Stack"),
    ]),
    diff("medium", "Medium", [
      q(3, "Evaluate Reverse Polish Notation"),
      q(4, "Daily Temperatures"),
      q(5, "Car Fleet"),
    ]),
    diff("hard", "Hard", [q(6, "Largest Rectangle in Histogram")]),
  ]),

  topic(5, "Queue", [
    diff("easy", "Easy", [
      q(1, "Implement Queue using Stacks"),
      q(2, "Implement Stack using Queues"),
    ]),
    diff("medium", "Medium", [
      q(3, "Number of Recent Calls"),
      q(4, "Design Hit Counter"),
      q(5, "Task Scheduler"),
    ]),
    diff("hard", "Hard", [q(6, "Sliding Window Maximum")]),
  ]),

  topic(6, "Hashing", [
    diff("easy", "Easy", [
      q(1, "Ransom Note"),
      q(2, "Isomorphic Strings"),
    ]),
    diff("medium", "Medium", [
      q(3, "Top K Frequent Elements"),
      q(4, "Longest Consecutive Sequence"),
      q(5, "Insert Delete GetRandom O(1)"),
    ]),
    diff("hard", "Hard", [q(6, "Subarray Sum Equals K")]),
  ]),

  topic(7, "Sliding Window", [
    diff("easy", "Easy", [q(1, "Maximum Average Subarray I")]),
    diff("medium", "Medium", [
      q(2, "Longest Repeating Character Replacement"),
      q(3, "Permutation in String"),
      q(4, "Minimum Size Subarray Sum"),
      q(5, "Fruit Into Baskets"),
    ]),
    diff("hard", "Hard", [
      q(6, "Substring with Concatenation of All Words"),
    ]),
  ]),

  topic(8, "Two Pointer", [
    diff("easy", "Easy", [
      q(1, "Two Sum II - Input Array Is Sorted"),
      q(2, "Merge Sorted Array"),
      q(3, "Remove Duplicates from Sorted Array"),
    ]),
    diff("medium", "Medium", [
      q(4, "Container With Most Water"),
      q(5, "3Sum Closest"),
      q(6, "Sort Colors"),
    ]),
    diff("hard", "Hard", [q(7, "Boats to Save People")]),
  ]),

  topic(9, "Binary Search", [
    diff("easy", "Easy", [
      q(1, "Binary Search"),
      q(2, "Search Insert Position"),
      q(3, "First Bad Version"),
    ]),
    diff("medium", "Medium", [
      q(4, "Find Minimum in Rotated Sorted Array"),
      q(5, "Search in Rotated Sorted Array"),
      q(6, "Koko Eating Bananas"),
    ]),
    diff("hard", "Hard", [q(7, "Median of Two Sorted Arrays")]),
  ]),

  topic(10, "Recursion", [
    diff("easy", "Easy", [
      q(1, "Climbing Stairs"),
      q(2, "Fibonacci Number"),
      q(3, "Pow(x, n)"),
    ]),
    diff("medium", "Medium", [
      q(4, "Combination Sum"),
      q(5, "Permutations"),
      q(6, "Subsets"),
    ]),
    diff("hard", "Hard", [q(7, "Word Search")]),
  ]),

  topic(11, "Trees", [
    diff("easy", "Easy", [
      q(1, "Binary Tree Inorder Traversal"),
      q(2, "Maximum Depth of Binary Tree"),
      q(3, "Same Tree"),
      q(4, "Invert Binary Tree"),
    ]),
    diff("medium", "Medium", [
      q(5, "Binary Tree Level Order Traversal"),
      q(6, "Subtree of Another Tree"),
      q(7, "Count Good Nodes in Binary Tree"),
    ]),
    diff("hard", "Hard", [
      q(8, "Serialize and Deserialize Binary Tree"),
    ]),
  ]),

  topic(12, "BST", [
    diff("easy", "Easy", [
      q(1, "Search in a Binary Search Tree"),
      q(2, "Minimum Absolute Difference in BST"),
    ]),
    diff("medium", "Medium", [
      q(3, "Validate Binary Search Tree"),
      q(4, "Kth Smallest Element in a BST"),
      q(5, "Construct Binary Search Tree from Preorder Traversal"),
    ]),
    diff("hard", "Hard", [
      q(6, "Serialize and Deserialize BST"),
    ]),
  ]),

  topic(13, "Heap", [
    diff("easy", "Easy", [
      q(1, "Kth Largest Element in an Array"),
      q(2, "Last Stone Weight"),
    ]),
    diff("medium", "Medium", [
      q(3, "K Closest Points to Origin"),
      q(4, "Find K Pairs with Smallest Sums"),
      q(5, "Design Twitter"),
    ]),
    diff("hard", "Hard", [q(6, "Find Median from Data Stream")]),
  ]),

  topic(14, "Greedy", [
    diff("easy", "Easy", [
      q(1, "Assign Cookies"),
      q(2, "Lemonade Change"),
    ]),
    diff("medium", "Medium", [
      q(3, "Jump Game"),
      q(4, "Gas Station"),
      q(5, "Hand of Straights"),
    ]),
    diff("hard", "Hard", [q(6, "Candy")]),
  ]),

  topic(15, "Backtracking", [
    diff("easy", "Easy", [
      q(1, "Letter Combinations of a Phone Number"),
    ]),
    diff("medium", "Medium", [
      q(2, "Combination Sum II"),
      q(3, "Palindrome Partitioning"),
      q(4, "Subsets II"),
      q(5, "Combination Sum"),
    ]),
    diff("hard", "Hard", [q(6, "N-Queens")]),
  ]),

  topic(16, "Graphs", [
    diff("easy", "Easy", [
      q(1, "Number of Provinces"),
      q(2, "Find if Path Exists in Graph"),
    ]),
    diff("medium", "Medium", [
      q(3, "Number of Islands"),
      q(4, "Clone Graph"),
      q(5, "Course Schedule"),
      q(6, "Pacific Atlantic Water Flow"),
    ]),
    diff("hard", "Hard", [q(7, "Word Ladder")]),
  ]),

  topic(17, "Dynamic Programming", [
    diff("easy", "Easy", [
      q(1, "Min Cost Climbing Stairs"),
      q(2, "House Robber"),
    ]),
    diff("medium", "Medium", [
      q(3, "Coin Change"),
      q(4, "Longest Increasing Subsequence"),
      q(5, "Word Break"),
      q(6, "Decode Ways"),
    ]),
    diff("hard", "Hard", [q(7, "Edit Distance")]),
  ]),

  topic(18, "Trie", [
    diff("easy", "Easy", [q(1, "Implement Trie (Prefix Tree)")]),
    diff("medium", "Medium", [
      q(2, "Design Add and Search Words Data Structure"),
      q(3, "Word Search II"),
      q(4, "Replace Words"),
    ]),
    diff("hard", "Hard", [q(5, "Palindrome Pairs")]),
  ]),

  topic(19, "Bit Manipulation", [
    diff("easy", "Easy", [
      q(1, "Single Number"),
      q(2, "Number of 1 Bits"),
      q(3, "Counting Bits"),
    ]),
    diff("medium", "Medium", [
      q(4, "Reverse Bits"),
      q(5, "Missing Number"),
      q(6, "Sum of Two Integers"),
    ]),
    diff("hard", "Hard", [
      q(7, "Maximum XOR of Two Numbers in an Array"),
    ]),
  ]),
];

export default dsaTopics;

export function getTopicCounts(topic, questionProgress) {
  let solved = 0;
  let total = 0;

  topic.difficulties.forEach((difficulty) => {
    const counts = getDifficultyCounts(topic.id, difficulty, questionProgress);
    solved += counts.solved;
    total += counts.total;
  });

  return { solved, total };
}

export function getDifficultyCounts(topicId, difficulty, questionProgress) {
  let solved = 0;
  const total = difficulty.questions.length;

  difficulty.questions.forEach((question) => {
    const key = `${topicId}-${difficulty.id}-${question.id}`;
    if (questionProgress[key]?.completed) {
      solved += 1;
    }
  });

  return { solved, total };
}

export function getTotalQuestionCount(topics) {
  return topics.reduce((sum, topic) => {
    return (
      sum +
      topic.difficulties.reduce(
        (topicSum, difficulty) => topicSum + difficulty.questions.length,
        0,
      )
    );
  }, 0);
}
