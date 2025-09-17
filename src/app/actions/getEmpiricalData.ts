"use server";

import buildAllMetrics from "@/algo/buildAllMetrics";

export async function getEmpiricalData(arr: number[]) {
  try {
    const n = arr.length;
    
    return buildAllMetrics(n, arr);
  } catch (error) {
    console.error("[getEmpiricalData] failed:", error);
    throw new Error("Failed to analyze sorting algorithms");
  }
}