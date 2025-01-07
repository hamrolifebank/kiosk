'use client';

import LiveDot from '@/assets/live_dot.gif';
import { LabelList, Pie, PieChart } from 'recharts';
import '../styles/app.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
const chartData = [
  { gender: 'male', count: 275, fill: 'var(--color-male)' },
  { gender: 'female', count: 200, fill: 'var(--color-female)' },
  { gender: 'others', count: 187, fill: 'var(--color-others)' },
];

const chartConfig = {
  male: {
    label: 'Male',
    color: 'hsl(var(--chart-1))',
  },
  female: {
    label: 'Female',
    color: 'hsl(var(--chart-3))',
  },
  others: {
    label: 'Others',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

function convertDataFormat(input: Record<string, string>): any {
  const genderMapping: Record<string, { gender: string; fill: string }> = {
    Male: { gender: 'male', fill: 'var(--color-male)' },
    Female: { gender: 'female', fill: 'var(--color-female)' },
    Other: { gender: 'others', fill: 'var(--color-others)' },
  };

  return Object.entries(input)
    .map(([key, count]) => {
      const parsedCount = parseInt(count, 10);
      if (parsedCount === 0) return null; // Skip items with count of zero
      const mappedData = genderMapping[key] || {
        gender: key.toLowerCase(),
        fill: 'var(--color-default)',
      };
      return {
        gender: mappedData.gender,
        count: parsedCount,
        fill: mappedData.fill,
      };
    })
    .filter(Boolean); // Remove null entries
}

export function StatsGender() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/gender`
        );
        const rdata = await response.json();
        setData(convertDataFormat(rdata));
        //setSlideList(data);
      } catch (error) {
        console.error('Error fetching slide list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Donor Gender Statistics</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <img src={LiveDot} width="12" alt="Live Dot" />
            <div className="live-text">Live</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0" style={{ marginTop: -40 }}>
        <ChartContainer
          config={chartConfig}
          className="w-screen h-screen max-h-none aspect-[1] mx-auto [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={data} dataKey="count">
              <LabelList
                dataKey="gender"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
