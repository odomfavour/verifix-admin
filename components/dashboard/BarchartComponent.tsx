import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Count {
  RESOLVED?: number;
  IN_PROGRESS?: number;
  PENDING?: number;
  [key: string]: number | undefined;
}

interface DataItem {
  year: string;
  data: {
    month: string;
    count: Count;
  }[];
}

interface BarChartProps {
  data: DataItem[];
  title: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, title }) => {
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

  const filterDataByDate = () => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filteredData = data?.filter((item) => {
      return item.data.some((monthData) => {
        const monthIndex = months.indexOf(monthData.month.substring(0, 3));
        const date = new Date(Number(item.year), monthIndex);
        return (!start || date >= start) && (!end || date <= end);
      });
    });

    // Aggregate data by month
    const monthlyData = months.map((month, index) => {
      const monthData = filteredData?.flatMap((item) =>
        item.data.filter((monthItem) => monthItem.month.startsWith(month))
      );

      const aggregatedCount: Count = {
        RESOLVED: 0,
        IN_PROGRESS: 0,
        PENDING: 0,
      };
      monthData?.forEach((monthItem) => {
        Object.entries(monthItem.count)?.forEach(([key, value]) => {
          aggregatedCount[key] = (aggregatedCount[key] || 0) + (value || 0);
        });
      });

      return aggregatedCount;
    });

    return monthlyData;
  };

  const filteredMonthlyData = filterDataByDate();

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    colors: ['#354A1A', '#506F27', '#E7F1D9'], // Colors for RESOLVED, IN_PROGRESS, and PENDING
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      title: {
        text: 'Tasks Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' tasks';
        },
      },
    },
  };

  const series = [
    {
      name: 'Resolved',
      data: filteredMonthlyData.map((item) => item.RESOLVED || 0),
    },
    {
      name: 'In Progress',
      data: filteredMonthlyData.map((item) => item.IN_PROGRESS || 0),
    },
    {
      name: 'Pending',
      data: filteredMonthlyData.map((item) => item.PENDING || 0),
    },
  ];

  const labels = ['Resolved', 'In Progress', 'Pending'];
  const colors = ['#354A1A', '#506F27', '#E7F1D9'];

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
        <Chart options={options} series={series} type="bar" height={350} />
      </div>

      <div className="mt-5">
        {labels.map((label, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex gap-2 items-center">
              <div
                style={{ backgroundColor: colors[index] }}
                className="h-[10px] w-[10px] rounded-full"
              />
              <p>{label}</p>
            </div>
            <p>{series[index].data.reduce((acc, val) => acc + val, 0)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartComponent;
