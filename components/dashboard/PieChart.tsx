import React, { useState } from 'react';
import Chart from 'react-apexcharts';

interface PieChartProps {
  data: {
    statusMetrics: { status: string; count: string }[];
    total: number;
  };
  colors: string[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, colors, title }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Transform the data into series and labels
  const series = data?.statusMetrics.map((metric) => Number(metric.count));
  const labels = data?.statusMetrics.map((metric) => metric.status);

  const options = {
    labels: labels,
    colors: colors,
    legend: {
      show: false, // Hide the legends
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            show: false,
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div>
      <p className="text-sm mb-3">Metrics</p>

      <div className="flex flex-col justify-between md:items-start items-center mb-5">
        <p className="text-lg font-bold text-[#000000]">{title}</p>
        <div className="flex">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 mr-2 text-xs rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 text-xs rounded-md"
          />
        </div>
      </div>
      <Chart options={options} series={series} type="pie" height={500} />
      <div className="mt-5">
        {labels?.map((label, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div
                style={{ backgroundColor: colors[index] }}
                className="h-[10px] w-[10px] rounded-full"
              />
              <p>{label}</p>
            </div>
            <p>{series[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
