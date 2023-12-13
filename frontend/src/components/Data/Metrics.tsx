import { useContext, useEffect } from 'react';
import { GlobalStateContext } from '../Global';
import React from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Metrics() {

  const { bulkMetrics } = useContext(GlobalStateContext);

  console.log('bulkMetrics', bulkMetrics)
  if (!bulkMetrics) {
    return (
      <div>
        <Link to="/"> home</Link>
        <h1>vita / metrics</h1>
        <hr />
        <div>metrics unavailable...</div>
      </div>
    )
  }
  let activityData = Papa.parse(bulkMetrics.activityCsv, { header: true });
  console.log(activityData)

  let downloadsData: any = Papa.parse(bulkMetrics.downloadsCsv, {
    header: true,
    complete: function (results) {
      // results.data is the array of objects representing each row
      results.data = results.data.filter((row: any) => {
        return !(Object.keys(row).length === 1 && row.hasOwnProperty(''));
      })

      results.data = results.data.map((row: any) => {
        if (row.hasOwnProperty('')) {
          row['DATE'] = row['']; // Assign the value of the blank key to the new 'date' key
          delete row['']; // Remove the blank key
        }


        Object.keys(row).forEach(key => {
          if (key === 'DATE') {
            const date = new Date(row[key]);
            row[key] = date
            // row[key] = date.getTime();
          } else {
            row[key] = parseInt(row[key])
          }

        })
        return row;
      });


      // Continue with your code, now results.data has 'date' instead of ''
      console.log(results.data);
    }
  });


  const data = downloadsData.data;
  const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'DATE') : [];

  // Dynamically generate Line components
  const lines = keys.map((key, index) => {
    const strokeColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Random color for each line
    return <Line key={key} type="monotone" dataKey={key} stroke={strokeColor} />;
  });

  return (
    <div>
      <Link to="/"> home</Link>
      <h1>vita / metrics</h1>
      <hr />
      <div>

        <h3>downloads</h3>
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
      <hr />
      <div>
        <p>
          <a href="/~/scry/vita/activity.csv">activity.csv</a>
        </p>
        <p>
          <a href="/~/scry/vita/downloads.csv">downloads.csv</a>
        </p>
      </div>
      <hr />
      <Footer />
    </div>
  );
}


const now = new Date();
const timeFormatter = (tick: any) => {
  if (!tick) return ''
  return new Date(tick).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })


}