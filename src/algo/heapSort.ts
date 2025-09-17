import { SortMetricSet, estimateMemoryKB } from "./metricsUtil";

export function measureHeapSort(input: number[]): SortMetricSet {
  const a = input.slice();
  const n = a.length;
  let comps = 0, swaps = 0;

  const t0 = Date.now();
  function heapify(size: number, i: number) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < size) { comps++; if (a[l] > a[largest]) largest = l; }
    if (r < size) { comps++; if (a[r] > a[largest]) largest = r; }
    if (largest !== i) {
      const tmp = a[i]; a[i] = a[largest]; a[largest] = tmp; swaps++;
      heapify(size, largest);
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    const tmp = a[0]; a[0] = a[i]; a[i] = tmp; swaps++;
    heapify(i, 0);
  }
  const t1 = Date.now();

  return {
    algo: "Heap Sort",
    n,
    execTimeMs: t1 - t0,
    comparisons: comps,
    swapsOrWrites: swaps,
    memoryKB: estimateMemoryKB("Heap Sort", n),
    sorted: a,
  };
}
