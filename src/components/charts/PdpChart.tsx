import React from 'react';
import {
  Chart,
  AxisOptions,
  SeriesOptions,
  LineSeries,
} from '@tanstack/react-charts';

const PDPLineChart = ({ data }: { data: { x: number; y: number }[] }) => {
  // Transform backend data into the format React Charts expects
  const chartData = [
    {
      label: 'PDP',
      data: data.map(point => ({ primary: point.x, secondary: point.y })),
    },
  ];

  const primaryAxis = {
    getValue:  (datum: { primary: number }) => datum.primary,
  };

  const secondaryAxis = {
    getValue: (datum: { secondary: number }) => datum.secondary,
  };

  const series = {
    type: 'line',
    showPoints: true,
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Chart
        options={{
          data: chartData,
          primaryAxis,
          secondaryAxis,
          series,
        }}
      />
    </div>
  );
};

export default PDPLineChart;

import React, { useEffect, useState } from 'react';
import PDPLineChart from './PDPLineChart';

const App = () => {
  const [pdpData, setPdpData] = useState([]);

  useEffect(() => {
    fetch('/api/pdp?feature=X1')
      .then(res => res.json())
      .then(data => setPdpData(data));
  }, []);

  return (
    <div>
      <h1>PDP Line Chart</h1>
      {pdpData.length > 0 && <PDPLineChart data={pdpData} />}
    </div>
  );
};

export default App;
