import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useData } from '@/providers/DataContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const isMobileDevice = () => {
    return window.innerWidth <= 768;
};

const BarChart: React.FC = () => {
    const { data } = useData();

    if (!data) return null;

    const grades = ['A', 'AB', 'B', 'BC', 'C', 'D', 'F'];

    const gradeCount = data.all_courses.reduce((acc, course) => {
        if (grades.includes(course.status)) {
            acc[course.status] = (acc[course.status] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const sortedGrades = grades.map(grade => [grade, gradeCount[grade] || 0]);

    const chartData = {
        labels: sortedGrades.map(([grade]) => grade),
        datasets: [
            {
                label: 'Number of Courses',
                data: sortedGrades.map(([, count]) => count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const optionsTrue = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Course Distribution by Letter Grade',
                font: {
                    size: 14,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Courses',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Letter Grade',
                },
            },
        },
    };

    const optionsFalse = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Course Distribution by Letter Grade',
                font: {
                    size: 14,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Number of Courses',
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Letter Grade',
                },
            },
        },
    };

    return (
      <>
          <div className='md:block hidden w-full h-96'>
                  <Bar data={chartData} options={optionsTrue} />
          </div>
          <div className='md:hidden block w-full h-96'>
                  <Bar data={chartData} options={optionsFalse} />
          </div>
      </>
    );
};

export default BarChart;