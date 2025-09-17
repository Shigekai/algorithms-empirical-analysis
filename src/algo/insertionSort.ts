import { estimateMemoryKB, SortMetricSet } from "./metricsUtil";

export function measureInsertionSort(input: number[]): SortMetricSet {
  const a = input.slice();
  const n = a.length;
  let comparisons = 0;
  let writes = 0;

  const t0 = Date.now();
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    comparisons++;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      writes++;
      j--;
      if (j >= 0) comparisons++; 
    }

    a[j + 1] = key;
    writes++;
  }
  const t1 = Date.now();

  return {
    algo: "Insertion Sort",
    n,
    execTimeMs: t1 - t0,
    comparisons,
    swapsOrWrites: writes,
    memoryKB: estimateMemoryKB("Insertion Sort", n),
    sorted: a,
  };
}
