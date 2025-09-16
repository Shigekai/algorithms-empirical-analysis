import { ChartBarInteractive } from "@/components/ChartBarInteractive";
import { algorithmMetrics } from "@/mocks/algoDataMock";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Sorting Algorithm Analysis
        </h1>
        <p className="text-gray-300 mb-8">
          Comparison of different sorting algorithms across key performance
          metrics.
        </p>

        {algorithmMetrics.map((metricData, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {metricData.metric}
            </h2>
            <p className="text-gray-400 mb-4">{metricData.description}</p>
            <div className="bg-[#0A0A0A] rounded-lg overflow-hidden">
              <ChartBarInteractive metricData={metricData} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
