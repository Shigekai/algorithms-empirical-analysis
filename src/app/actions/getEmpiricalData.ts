"use server";

import { MetricData, algorithmMetrics } from "@/mocks/algoDataMock";

export async function getEmpiricalData(
  inputArray: number[]
): Promise<MetricData[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const modifiedMetrics = algorithmMetrics.map((metric) => ({
      ...metric,
      input: inputArray.length,
      description: metric.description.replace(
        "5,000",
        inputArray.length.toLocaleString()
      ),
    }));

    return modifiedMetrics;
  } catch (error) {
    console.error("Error processing algorithm metrics:", error);
    throw new Error("Failed to analyze sorting algorithms");
  }
}
