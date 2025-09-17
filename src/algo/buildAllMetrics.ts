import { measureInsertionSort } from "@/algo/insertionSort";
import { measureSelectionSort } from "@/algo/selectionSort";
import { measureMergeSort } from "@/algo/mergeSort";
import { measureHeapSort } from "@/algo/heapSort";
import { measureQuickSort } from "@/algo/quickSort";
import type { MetricData } from "@/algo/metricsUtil";

export default function buildAllMetrics(
  n: number,
  baseArray: number[]
): MetricData[] {
  const i = measureInsertionSort(baseArray);
  const s = measureSelectionSort(baseArray);
  const m = measureMergeSort(baseArray);
  const h = measureHeapSort(baseArray);
  const q = measureQuickSort(baseArray);

  return [
    {
      metric: "Execution Time (ms)",
      description: `The time taken by each algorithm to sort an array with ${n.toLocaleString()} elements. Lower values indicate better performance.`,
      input: n,
      results: [
        { algo: i.algo, complexity: "O(n²)", value: i.execTimeMs },
        { algo: s.algo, complexity: "O(n²)", value: s.execTimeMs },
        { algo: m.algo, complexity: "O(n log n)", value: m.execTimeMs },
        { algo: h.algo, complexity: "O(n log n)", value: h.execTimeMs },
        { algo: q.algo, complexity: "O(n log n)", value: q.execTimeMs },
      ],
    },
    {
      metric: "Comparisons",
      description: `Number of key comparisons performed while sorting ${n.toLocaleString()} elements. Fewer comparisons generally mean better efficiency.`,
      input: n,
      results: [
        { algo: i.algo, complexity: "O(n²)", value: i.comparisons },
        { algo: s.algo, complexity: "O(n²)", value: s.comparisons },
        { algo: m.algo, complexity: "O(n log n)", value: m.comparisons },
        { algo: h.algo, complexity: "O(n log n)", value: h.comparisons },
        { algo: q.algo, complexity: "O(n log n)", value: q.comparisons },
      ],
    },
    {
      metric: "Swaps",
      description: `Number of element swaps performed during sorting of ${n.toLocaleString()} elements. Fewer swaps typically indicate less overhead.`,
      input: n,
      results: [
        { algo: i.algo, complexity: "O(n²)", value: i.swapsOrWrites },
        { algo: s.algo, complexity: "O(n²)", value: s.swapsOrWrites },
        { algo: m.algo, complexity: "O(n log n)", value: m.swapsOrWrites },
        { algo: h.algo, complexity: "O(n log n)", value: h.swapsOrWrites },
        { algo: q.algo, complexity: "O(n log n)", value: q.swapsOrWrites },
      ],
    },
    {
      metric: "Memory Usage (KB)",
      description: `Additional memory space required by each algorithm beyond the input array when sorting ${n.toLocaleString()} elements.`,
      input: n,
      results: [
        { algo: i.algo, complexity: "O(1)", value: i.memoryKB },
        { algo: s.algo, complexity: "O(1)", value: s.memoryKB },
        { algo: m.algo, complexity: "O(n)", value: m.memoryKB },
        { algo: h.algo, complexity: "O(1)", value: h.memoryKB },
        { algo: q.algo, complexity: "O(log n)", value: q.memoryKB },
      ],
    },
  ];
}
