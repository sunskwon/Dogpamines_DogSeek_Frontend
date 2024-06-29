import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    plugins,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { color } from 'chart.js/helpers';
// import faker from 'faker';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

function UserGraph({ counts }) {

    const reverseCounts = counts.slice(0).reverse().map(num => num);

    let accumSignup = 0;
    let accumSignin = 0;

    const labels = reverseCounts.map(count => count?.countsDate);

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: '누적 가입자 수',
                borderColor: 'rgba(99, 197, 74, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts.map(count => {
                    accumSignup += count?.countsSignup
                    return accumSignup;
                }),
            },
            {
                type: 'line',
                label: '누적 접속자 수',
                borderColor: 'rgba(0, 86, 0, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts.map(count => {
                    accumSignin += count?.countsSignin
                    return accumSignin;
                }),
            },
            {
                type: 'bar',
                label: '가입자 수',
                backgroundColor: 'rgba(99, 197, 74, 1)',
                data: reverseCounts.map(count => count?.countsSignup),
                borderColor: 'white',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: '접속자 수',
                backgroundColor: 'rgba(0, 86, 0, 1)',
                data: reverseCounts.map(count => count?.countsSignin),
                borderColor: 'white',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'left',
                labels: {
                    padding: 20,
                    color: 'rgba(153, 153, 153, 1)',
                    usePointStyle: true,
                    pointStyle: 'rect',
                }
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    // display: false,
                    // color: 'rgba(153, 153, 153, 1)',
                }
            },
            y: {
                grid: {
                    // display: false,
                    // color: 'rgba(153, 153, 153, 1)',
                }
            },
        },
    };

    return (
        <div style={{ height: "240px", }}>
            <Chart type='bar' data={data} options={options} />
        </div>
    );
}

export default UserGraph;