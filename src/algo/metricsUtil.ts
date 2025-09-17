export type SortName = "Insertion Sort" | "Selection Sort" | "Merge Sort" | "Heap Sort" | "Quick Sort";

export interface SortMetricSet {
  algo: SortName;
  n: number;
  execTimeMs: number;
  comparisons: number;
  swapsOrWrites: number;
  memoryKB: number;
  sorted: number[];
}

export interface AlgorithmResult { algo: string; complexity: string; value: number; }
export interface MetricData { metric: string; description: string; input: number; results: AlgorithmResult[]; }

export const COMPLEXITY_TIME: Record<SortName,string> = {
  "Insertion Sort":"O(n²)",
  "Selection Sort":"O(n²)",
  "Merge Sort":"O(n log n)",
  "Heap Sort":"O(n log n)",
  "Quick Sort":"O(n log n)",
};

export const COMPLEXITY_MEM: Record<SortName,string> = {
  "Insertion Sort":"O(1)",
  "Selection Sort":"O(1)",
  "Merge Sort":"O(n)",
  "Heap Sort":"O(1)",
  "Quick Sort":"O(log n)",
};

export function estimateMemoryKB(algo: SortName, n: number): number {
  if (algo === "Merge Sort") return (n * 8) / 1024;
  if (algo === "Quick Sort") {
    const depth = Math.max(1, Math.log2(Math.max(2, n)));
    return Number((depth * 0.45).toFixed(1));
  }
  return 4.0;
}

export function toMetricDataForSingleAlgorithm(n: number, sm: SortMetricSet): MetricData[] {
  return [
    {
      metric: "Execution Time (ms)",
      description: `The time taken by each algorithm to sort an array with ${n.toLocaleString()} elements. Lower values indicate better performance.`,
      input: n,
      results: [{ algo: sm.algo, complexity: COMPLEXITY_TIME[sm.algo], value: sm.execTimeMs }],
    },
    {
      metric: "Comparisons",
      description: `Number of key comparisons performed while sorting ${n.toLocaleString()} elements. Fewer comparisons generally mean better efficiency.`,
      input: n,
      results: [{ algo: sm.algo, complexity: COMPLEXITY_TIME[sm.algo], value: sm.comparisons }],
    },
    {
      metric: "Swaps",
      description: `Number of element swaps performed during sorting of ${n.toLocaleString()} elements. Fewer swaps typically indicate less overhead.`,
      input: n,
      results: [{ algo: sm.algo, complexity: COMPLEXITY_TIME[sm.algo], value: sm.swapsOrWrites }],
    },
    {
      metric: "Memory Usage (KB)",
      description: `Additional memory space required by each algorithm beyond the input array when sorting ${n.toLocaleString()} elements.`,
      input: n,
      results: [{ algo: sm.algo, complexity: COMPLEXITY_MEM[sm.algo], value: Number(sm.memoryKB.toFixed(1)) }],
    },
  ];
}
