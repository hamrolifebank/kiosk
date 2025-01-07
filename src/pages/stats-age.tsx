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

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

function convertDataFormat(
  input: Record<string, string>
): { age: string; count: number }[] {
  return Object.entries(input).map(([age, count]) => ({
    age,
    count: parseInt(count, 10),
  }));
}

export function StatsAge() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/age`
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
            <CardTitle>Realtime Data: Donation by Age</CardTitle>
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
                dataKey="age"
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
