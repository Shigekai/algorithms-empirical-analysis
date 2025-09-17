"use client";

import { useEffect, useRef, useState } from "react";
import { getEmpiricalData } from "@/app/actions/getEmpiricalData";
import { ChartBarInteractive } from "@/components/ChartBarInteractive";
import { EntryDataForm, FormData } from "@/components/EntryDataForm";
import { MetricData } from "@/mocks/algoDataMock";

export default function AlgorithmAnalysisPage() {
  const [metrics, setMetrics] = useState<MetricData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  const runAnalysis = async (formData: FormData) => {
    setLoading(true);
    try {
      const results = await getEmpiricalData(
        formData.entrySize,
        formData.entryType
      );
      setMetrics(results);
    } catch (error) {
      console.error("Error running analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (metrics && !loading && metricsRef.current) {
      metricsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", 
      });
    }
  }, [metrics, loading]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center mb-8 flex flex-col gap-8 h-screen justify-center">
        <h1 className="text-3xl text-white font-bold">
          Sorting Algorithm Analysis
        </h1>
        <p className="text-gray-400">
          Empirical analysis of sorting algorithms with configurable parameters
        </p>
        <div className="flex justify-center">
          <EntryDataForm onSubmit={runAnalysis} isLoading={loading} />
        </div>
      </div>

      {metrics && (
        <div ref={metricsRef} className="space-y-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl text-white font-semibold mb-2">
              Analysis Results
            </h2>
            <p className="text-gray-400">
              Performance metrics for each sorting algorithm
            </p>
          </div>

          {metrics.map((metricData, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-xl text-white font-semibold mb-2">
                {metricData.metric}
              </h3>
              <p className="text-gray-400 mb-4">{metricData.description}</p>
              <ChartBarInteractive metricData={metricData} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
