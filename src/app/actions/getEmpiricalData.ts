"use server";

import buildAllMetrics from "@/algo/buildAllMetrics";
import { EntryType } from "@/components/EntryDataForm";
import { generateEntry } from "@/functions/generateEntry";

export async function getEmpiricalData(
  entry: number | number[],
  entryType?: EntryType
) {
  try {
    let arr: number[], n: number;

    if (Array.isArray(entry)) {
      arr = entry.slice();
      n = arr.length;
    } else {
      n = Math.max(1, Math.min(50000, Math.floor(entry)));
      arr = generateEntry(n, entryType ?? EntryType.RANDOM);
    }

    return buildAllMetrics(n, arr);
  } catch (error) {
    console.error("[getEmpiricalData] failed:", error);
    throw new Error("Failed to analyze sorting algorithms");
  }
}
