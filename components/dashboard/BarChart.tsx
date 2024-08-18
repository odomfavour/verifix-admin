import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BarChartProps {
  data: { date: string; value: number }[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: months,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '70%',
            },
          },
        },
      },
    ],
    colors: ['#506F27'], // Specify the color for the bars
  };

  const filteredData = data?.filter((item) => {
    const date = new Date(item.date);
    return (
      (!startDate || date >= new Date(startDate)) &&
      (!endDate || date <= new Date(endDate))
    );
  });

  const monthlyData = months.map((month, index) => {
    const monthData = filteredData?.filter(
      (item) => item.date.split('-')[1] === month
    );
    const totalValue = monthData?.reduce((sum, item) => sum + item.value, 0);
    return totalValue;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
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
      <div style={{ width: '700px', margin: '0 auto' }}>
        <Chart
          options={options}
          series={[{ name: 'Values', data: monthlyData }]}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default BarChart;
