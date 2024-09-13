import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useData } from '@/providers/DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
    const { data } = useData();

    if (!data) return null;

    const completedCount = data.completed_requirements.length;
    const unfulfilledCount = data.unfulfilled_requirements.length;

    const chartData = {
        labels: ['Completed', 'Incomplete'],
        datasets: [
            {
                data: [completedCount, unfulfilledCount],
                backgroundColor: ['#198755', '#dc3545'], // Green for completed, Red for unfulfilled
                borderColor: ['#198755', '#dc3545'],
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
        },
    };

    return (
        <div className='w-full h-96'>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DonutChart;
