// components/StatsChart.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js for auto registration
import CertificateNavbar from './certificatenavbar';
import "./Certificate.css";

const StatsChart = () => {
  const [data, setData] = useState({ left: 0, right: 0, Voice: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('usersdatatoken'); // Get token from localStorage
        const response = await fetch('https://first-project-backend-ycff.onrender.com/user/stats', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Left', 'Right', 'Voice'],
    datasets: [
      {
        label: 'Counts',
        data: [data.left, data.right, data.Voice],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { label, raw } = tooltipItem;
            return `${label}: ${raw}`;
          },
        },
      },
    },
  };

  return (
<div className='dashboard-container'>
  <div className='navbar-container'>
    <CertificateNavbar />
  </div>
  <div className='chart-container'>
    <h2>User Stats</h2>
    <Doughnut data={chartData} options={options} />
  </div>
</div>

  );
};

export default StatsChart;
