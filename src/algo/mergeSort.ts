import { SortMetricSet, estimateMemoryKB } from "./metricsUtil";

export function measureMergeSort(input: number[]): SortMetricSet {
  const n = input.length;
  let comps = 0, writes = 0;

  const t0 = Date.now();
  function merge(left: number[], right: number[]): number[] {
    const out: number[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      comps++;
      if (left[i] <= right[j]) out.push(left[i++]);
      else out.push(right[j++]);
      writes++;
    }
    while (i < left.length) { out.push(left[i++]); writes++; }
    while (j < right.length) { out.push(right[j++]); writes++; }
    return out;
  }
  function ms(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const l = ms(arr.slice(0, mid));
    const r = ms(arr.slice(mid));
    return merge(l, r);
  }
  const sorted = ms(input.slice());
  const t1 = Date.now();

  return {
    algo: "Merge Sort",
    n,
    execTimeMs: t1 - t0,
    comparisons: comps,
    swapsOrWrites: writes,
    memoryKB: estimateMemoryKB("Merge Sort", n),
    sorted,
  };
}
