import Papa from 'papaparse';
import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

const timeFormatter = (tick: any) => {
  if (!tick) return ''
  return new Date(tick).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export function parseData(csvData: string) {

  let newCsvData = csvData.split('\n').filter((row: string) => {
    return !(row.length === 0)
  }).join('\n');

  let response: any = Papa.parse(newCsvData, {
    header: true,
    complete: function (results) {

      results.data = results.data.map((row: any) => {
        if (row.hasOwnProperty('')) {
          row['DATE'] = row['']; // Assign the value of the blank key to the new 'date' key
          delete row['']; // Remove the blank key
        }

        Object.keys(row).forEach(key => {
          if (key === 'DATE') {
            const date = new Date(row[key]);
            row[key] = date
          } else {
            row[key] = parseInt(row[key])
          }
        })
        return row;
      });
    }
  });

  return response.data;
}

export function MetricsLineChart(csvData: string) {

  const data = parseData(csvData);
  if (data.length === 0) {
    return <div>no data</div>
  }

  const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'DATE') : [];

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
        <XAxis dataKey="DATE"
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


