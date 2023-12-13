import { useContext, useEffect } from 'react';
import { GlobalStateContext } from '../Global';
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

import { MetricsLineChart } from './MetricsLineChart';

export function Metrics() {

  const { bulkMetrics } = useContext(GlobalStateContext);

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
  let activityChart = (MetricsLineChart(bulkMetrics.activityCsv));
  let downloadsChart = (MetricsLineChart(bulkMetrics.downloadsCsv));

  return (
    <div>
      <Link to="/"> home</Link>
      <h1>vita / metrics</h1>
      <hr />
      <div>
        <h3>downloads</h3>
        {downloadsChart}
        <p>
          <a href="/~/scry/vita/downloads.csv">downloads.csv</a>
        </p>
      </div>
      <hr />
      <div>
        <h3>activity</h3>
        {activityChart}
        <p>
          <a href="/~/scry/vita/activity.csv">activity.csv</a>
        </p>
      </div>
      <hr />
      <Footer />
    </div>
  );
}