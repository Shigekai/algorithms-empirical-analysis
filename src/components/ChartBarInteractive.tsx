"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MetricData } from "@/mocks/algoDataMock";

const chartConfig = {
  "Insertion Sort": {
    label: "Insertion Sort",
    color: "var(--chart-mono-1)",
  },
  "Selection Sort": {
    label: "Selection Sort",
    color: "var(--chart-mono-2)",
  },
  "Merge Sort": {
    label: "Merge Sort",
    color: "var(--chart-mono-3)",
  },
  "Heap Sort": {
    label: "Heap Sort",
    color: "var(--chart-mono-4)",
  },
  "Quick Sort": {
    label: "Quick Sort",
    color: "var(--chart-mono-5)",
  },
} satisfies ChartConfig;

interface ChartBarInteractiveProps {
  metricData: MetricData;
}

export function ChartBarInteractive({ metricData }: ChartBarInteractiveProps) {
  const chartData = React.useMemo(() => {
    return metricData.results.map((result) => ({
      name: result.algo,
      value: result.value,
      complexity: result.complexity,
    }));
  }, [metricData]);

  return (
    <Card className="py-0 text-white bg-[#171717]">
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Legend />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px] bg-black"
                  nameKey="name"
                  labelFormatter={(value: string) => value}
                />
              }
            />
            <Bar
              dataKey="value"
              name={metricData.metric}
              fill="var(--chart-mono-1)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
