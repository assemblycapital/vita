import { useContext, useEffect } from 'react';
import { GlobalStateContext } from '../Global';
import React from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Metrics() {

  const { bulkMetrics } = useContext(GlobalStateContext);

  // console.log('bulkMetrics', bulkMetrics)
  // if (!bulkMetrics) {
  //   return (
  //     <div>
  //       <Link to="/"> home</Link>
  //       <h1>vita / metrics</h1>
  //       <hr />
  //       <div>metrics unavailable...</div>
  //     </div>
  //   )
  // }
  // let activityData = Papa.parse(bulkMetrics.activityCsv, { header: true });
  // console.log(activityData)

  // let downloadsData = Papa.parse(bulkMetrics.downloadsCsv, {
  //   header: true,
  //   complete: function (results) {
  //     // results.data is the array of objects representing each row
  //     results.data = results.data.map((row: any) => {
  //       if (row.hasOwnProperty('')) {
  //         row['DATE'] = row['']; // Assign the value of the blank key to the new 'date' key
  //         delete row['']; // Remove the blank key
  //       }

  //       Object.keys(row).forEach(key => {
  //         if (key !== 'DATE') {
  //           row[key] = parseInt(row[key])
  //         }

  //       })
  //       return row;
  //     });

  //     // Continue with your code, now results.data has 'date' instead of ''
  //     console.log(results.data);
  //   }
  // });



  return (
    <div>
      <Link to="/"> home</Link>
      <h1>vita / metrics</h1>
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