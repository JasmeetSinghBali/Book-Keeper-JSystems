import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Credit',
            backgroundColor: '#4FD1C5',
            borderColor: '#F687B3',
            lineTension: 0.4,
            pointRadius: 5,
            pointHitRadius: 20,
            pointBorderWidth: 1,
            pointBorderColor: '#4FD1C5',
            pointBackgroundColor: '#4FD1C5',
            pointHoverRadius: 2,
            pointHoverBorderWidth:100,
            pointHoverBorderColor:'#4FD1C5',
            data: [500, 300, 400, 500, 800, 650, 700, 690, 1000, 1200, 1050, 1300],
        },
        {
            label: 'Debit',
            backgroundColor: '#E53E3E',
            borderColor: '#FEB2B2',
            lineTension: 0.4,
            pointRadius: 5,
            pointHitRadius: 20,
            pointBorderWidth: 1,
            pointBorderColor: '#E53E3E',
            pointBackgroundColor: '#E53E3E',
            pointHoverRadius: 2,
            pointHoverBorderWidth:100,
            pointHoverBorderColor:'#E53E3E',
            data: [200, 400, 200, 400, 0, 700, 100, 690, 100, 0, 500, 800],
        },
    ],
}
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    maintainAspectRatio: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                borderDash: [5, 10],
            },
            beginAtZero: true,
        },
    },
    plugins: {
        legend: {
            display: false
        },
        title:{
            display: true,
            text: 'Your Monthly Credit v/s Debit Portfolio',
            color: '#1A202C'
        }
    },
};

const BKChartMain = () => {
    return(
        <Line
            data={data}
            options={options as any}
        />
    )
}

export default BKChartMain;