import { SortMetricSet, estimateMemoryKB } from "./metricsUtil";

export function measureQuickSort(input: number[]): SortMetricSet {
  const a = input.slice();
  const n = a.length;
  let comps = 0,
    swaps = 0;

  const t0 = Date.now();

  function quickSortIterative() {
    if (n <= 1) return;

    const stack: [number, number][] = [[0, n - 1]];

    while (stack.length > 0) {
      const [lo, hi] = stack.pop()!;

      if (lo < hi) {
        const p = partition(lo, hi);

        const leftSize = p - lo;
        const rightSize = hi - p;

        if (leftSize > rightSize) {
          if (lo < p - 1) stack.push([lo, p - 1]);
          if (p + 1 < hi) stack.push([p + 1, hi]);
        } else {
          if (p + 1 < hi) stack.push([p + 1, hi]);
          if (lo < p - 1) stack.push([lo, p - 1]);
        }
      }
    }
  }

  function partition(lo: number, hi: number): number {
    const mid = Math.floor((lo + hi) / 2);

    // Sort lo, mid, hi
    if (a[mid] < a[lo]) {
      [a[lo], a[mid]] = [a[mid], a[lo]];
      swaps++;
    }
    if (a[hi] < a[lo]) {
      [a[lo], a[hi]] = [a[hi], a[lo]];
      swaps++;
    }
    if (a[hi] < a[mid]) {
      [a[mid], a[hi]] = [a[hi], a[mid]];
      swaps++;
    }

    const pivot = a[mid];
    [a[mid], a[hi]] = [a[hi], a[mid]];
    swaps++;

    let i = lo;
    for (let j = lo; j < hi; j++) {
      comps++;
      if (a[j] <= pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          swaps++;
        }
        i++;
      }
    }

    if (i !== hi) {
      [a[i], a[hi]] = [a[hi], a[i]];
      swaps++;
    }

    return i;
  }

  quickSortIterative();
  const t1 = Date.now();

  return {
    algo: "Quick Sort",
    n,
    execTimeMs: t1 - t0,
    comparisons: comps,
    swapsOrWrites: swaps,
    memoryKB: estimateMemoryKB("Quick Sort", n),
    sorted: a,
  };
}
