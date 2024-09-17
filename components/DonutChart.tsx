import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useData } from '@/providers/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
    const { data } = useData();

    const sampleData = {
        labels: ['Completed', 'Incomplete'],
        datasets: [
            {
                data: [16, 9],
                backgroundColor: ['#429b70', '#e15864'],
                borderColor: ['#429b70', '#e15864'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Degree Requirements',
                font: {
                    size: 14,
                },
            },
        },
    };

    if (!data) return (
        <div className='w-full h-96'>
            <Doughnut data={sampleData} options={options} />
        </div>
    );

    const completedCount = data.completed_requirements.length;
    const unfulfilledCount = data.unfulfilled_requirements.length;

    const chartData = {
        labels: ['Completed', 'Incomplete'],
        datasets: [
            {
                data: [completedCount, unfulfilledCount],
                backgroundColor: ['#429b70', '#e15864'], // Green for completed, Red for unfulfilled
                borderColor: ['#429b70', '#e15864'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='w-full h-96'>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DonutChart;
