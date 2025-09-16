export interface AlgorithmResult {
  algo: string;
  complexity: string;
  value: number;
}

export interface MetricData {
  metric: string;
  description: string;
  input: number;
  results: AlgorithmResult[];
}

export const algorithmMetrics: MetricData[] = [
  {
    metric: "Execution Time (ms)",
    description: "The time taken by each algorithm to sort an array with 5,000 elements. Lower values indicate better performance.",
    input: 5000,
    results: [
      { algo: "Insertion Sort", complexity: "O(n²)", value: 280.3 },
      { algo: "Selection Sort", complexity: "O(n²)", value: 210.8 },
      { algo: "Merge Sort", complexity: "O(n log n)", value: 8.4 },
      { algo: "Heap Sort", complexity: "O(n log n)", value: 11.2 },
      { algo: "Quick Sort", complexity: "O(n log n)", value: 5.7 },
    ],
  },

  {
    metric: "Comparisons",
    description: "Number of key comparisons performed while sorting 5,000 elements. Fewer comparisons generally mean better efficiency.",
    input: 5000,
    results: [
      { algo: "Insertion Sort", complexity: "O(n²)", value: 12497500 },
      { algo: "Selection Sort", complexity: "O(n²)", value: 12497500 },
      { algo: "Merge Sort", complexity: "O(n log n)", value: 61438 },
      { algo: "Heap Sort", complexity: "O(n log n)", value: 72890 },
      { algo: "Quick Sort", complexity: "O(n log n)", value: 53214 },
    ],
  },

  {
    metric: "Swaps",
    description: "Number of element swaps performed during sorting of 5,000 elements. Fewer swaps typically indicate less overhead.",
    input: 5000,
    results: [
      { algo: "Insertion Sort", complexity: "O(n²)", value: 6248750 },
      { algo: "Selection Sort", complexity: "O(n²)", value: 4999 },
      { algo: "Merge Sort", complexity: "O(n log n)", value: 0 },
      { algo: "Heap Sort", complexity: "O(n log n)", value: 56789 },
      { algo: "Quick Sort", complexity: "O(n log n)", value: 34567 },
    ],
  },
  
  {
    metric: "Memory Usage (KB)",
    description: "Additional memory space required by each algorithm beyond the input array when sorting 5,000 elements.",
    input: 5000,
    results: [
      { algo: "Insertion Sort", complexity: "O(1)", value: 4.0 },
      { algo: "Selection Sort", complexity: "O(1)", value: 4.0 },
      { algo: "Merge Sort", complexity: "O(n)", value: 40.0 },
      { algo: "Heap Sort", complexity: "O(1)", value: 4.0 },
      { algo: "Quick Sort", complexity: "O(log n)", value: 5.6 },
    ],
  },
];