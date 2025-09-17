"use client";

import { useState } from "react";
import { getEmpiricalData } from "@/app/actions/getEmpiricalData";
import { ChartBarInteractive } from "@/components/ChartBarInteractive";
import { MetricData } from "@/mocks/algoDataMock";

export default function AlgorithmAnalysisPage() {
  const [metrics, setMetrics] = useState<MetricData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const randomArray = Array.from({ length: 5000 }, () =>
        Math.floor(Math.random() * 10000)
      );

      const results = await getEmpiricalData(randomArray);
      setMetrics(results);
    } catch (error) {
      console.error("Error running analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold mb-4">
        Sorting Algorithm Analysis
      </h1>

      <button
        onClick={runAnalysis}
        disabled={loading}
        className="px-4 py-2 bg-white text-black font-semibold rounded mb-8 cursor-pointer"
      >
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

      {metrics && (
        <div className="space-y-8">
          {metrics.map((metricData, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-xl text-white font-semibold mb-2">
                {metricData.metric}
              </h2>
              <p className="text-gray-400 mb-4">{metricData.description}</p>
              <ChartBarInteractive metricData={metricData} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
