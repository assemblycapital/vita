import Papa from 'papaparse';
import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { ChartBulkMetrics } from '../Global';

const timeFormatter = (tick: any) => {
  if (!tick) return ''
  return new Date(tick * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function MetricsLineChart(data: ChartBulkMetrics) {

  // const data = parseData(csvData);
  if (data.length === 0) {
    return <div>no data</div>
  }

  const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'time') : [];

  // Dynamically generate Line components
  const lines = keys.map((key, index) => {
    // Generate a random hue (from 0 to 360)
    const hue = Math.floor(Math.random() * 360);

    // Set a high saturation (80% in this example)
    const saturation = 80;

    // Set a lower lightness value (between 20% and 40% in this example)
    const lightness = 20 + Math.floor(Math.random() * 20);

    // Construct the HSL color string
    const strokeColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return <Line key={key} type="monotone" dataKey={key} stroke={strokeColor} />;
  });

  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time"
          tickFormatter={timeFormatter}
          allowDecimals={false}
        />
        <YAxis
          allowDecimals={false}
        />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    </div>
  );
}


