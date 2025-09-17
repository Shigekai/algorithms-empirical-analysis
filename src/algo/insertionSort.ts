// src/algo/insertionSort.ts
import { SortMetricSet, estimateMemoryKB } from "./metricsUtil";

/**
 * Mede o Insertion Sort e devolve todas as métricas necessárias
 * (tempo, comparações, escritas, memória estimada e array ordenado).
 */
export function measureInsertionSort(input: number[]): SortMetricSet {
    const a = input.slice();
    const n = a.length;
    let comparisons = 0;
    let writes = 0;

    const t0 = Date.now();
    for (let i = 1; i < n; i++) {
        const key = a[i];
        let j = i - 1;
        while (j >= 0) {
            comparisons++;
            if (a[j] > key) {
                a[j + 1] = a[j];
                writes++;
                j--;
            } else {
                break;
            }
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

/** (Opcional) implementação “pura” do sort, caso queira reusar em testes */
export function insertionSortInPlace(a: number[]): number[] {
    for (let i = 1; i < a.length; i++) {
        const key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
    return a;
}
