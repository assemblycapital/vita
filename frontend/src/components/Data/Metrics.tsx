import { useContext, useEffect } from 'react';
import { GlobalStateContext } from '../Global';
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../Footer';

import { MetricsLineChart } from './MetricsLineChart';
import { processBulkMetrics } from '../../lib/lib';

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
  let [activityMetrics, downloadMetrics] = processBulkMetrics(bulkMetrics);

  let activityChart = MetricsLineChart(activityMetrics);
  let downloadsChart = MetricsLineChart(downloadMetrics);

  const handleDownload = () => {
    const json = JSON.stringify(bulkMetrics, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bulk-metrics.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Link to="/"> home</Link>
      <h1>vita / metrics</h1>
      <hr />
      <div>
        <h3>downloads</h3>
        {downloadsChart}
      </div>
      <hr />
      <div>
        <h3>activity</h3>
        {activityChart}
      </div>
        <p>
          Activity collection requires backend integration with your app.
          For more info, check out the <a href="https://github.com/assemblycapital/vita">github repo</a> and/or contact ~bacwyl-samweg.
        </p>
      <hr />
      <div>
        <button onClick={handleDownload}>download all metrics</button>
      </div>
      <Footer />
    </div>
  );
}