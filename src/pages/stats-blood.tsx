'use client';

import LiveDot from '@/assets/live_dot.gif';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import '../styles/app.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

function convertDataFormat(
  input: Record<string, string>
): { blood: string; count: number }[] {
  // Define a mapping for blood group transformations
  const bloodGroupMapping: Record<string, string> = {
    A_POSITIVE: 'A+',
    B_POSITIVE: 'B+',
    O_POSITIVE: 'O+',
    AB_POSITIVE: 'AB+',
    A_NEGATIVE: 'A-',
    B_NEGATIVE: 'B-',
    O_NEGATIVE: 'O-',
    AB_NEGATIVE: 'AB-',
  };

  return Object.entries(input).map(([blood, count]) => ({
    blood: bloodGroupMapping[blood] || blood, // Use the mapped value or fallback to the original key
    count: parseInt(count, 10),
  }));
}

export function StatsBlood() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/blood`
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
    <div className="max-h-screen overflow-auto p-4 flex justify-center items-center">
      <Card className="w-full max-w-4xl max-h-full overflow-hidden border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Realtime Data: Blood Group Statistics</CardTitle>
            <div className="flex items-center gap-2">
              <img src={LiveDot} width="12" alt="Live Dot" />
              <div className="live-text">Live</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="blood"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                tick={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fill: 'var(--foreground)',
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={24}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
