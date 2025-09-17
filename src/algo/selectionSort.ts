import { SortMetricSet, estimateMemoryKB } from "./metricsUtil";

export function measureSelectionSort(input: number[]): SortMetricSet {
  const a = input.slice();
  const n = a.length;
  let comps = 0, swaps = 0;

  const t0 = Date.now();
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comps++;
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      const tmp = a[i]; a[i] = a[minIdx]; a[minIdx] = tmp; swaps++;
    }
  }
  const t1 = Date.now();

  return {
    algo: "Selection Sort",
    n,
    execTimeMs: t1 - t0,
    comparisons: comps,
    swapsOrWrites: swaps,
    memoryKB: estimateMemoryKB("Selection Sort", n),
    sorted: a,
  };
}
