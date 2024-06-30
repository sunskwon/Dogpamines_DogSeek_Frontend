import React from 'react';
import { useState, useEffect } from "react";

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

function DiscreteGraph({ counts, date }) {

    const [reverseCounts, setReverseCounts] = useState([]);

    useEffect(() => {
        const reverse = counts?.slice(0, date).reverse().map(num => num);
        setReverseCounts(reverse);
    }, [counts, date]);

    const labels = reverseCounts?.map(count => count?.countsDate);

    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: '가입자',
                backgroundColor: 'rgba(153, 153, 153, 1)',
                data: reverseCounts?.map(count => count?.countsSignup),
                borderColor: 'white',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: '접속자',
                backgroundColor: 'rgba(99, 197, 74, 1)',
                data: reverseCounts?.map(count => count?.countsSignin),
                borderColor: 'white',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: '사료 조회',
                backgroundColor: 'rgba(0, 86, 0, 1)',
                data: reverseCounts.map(count => count?.countsProducts),
                borderColor: 'white',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: '게시물',
                backgroundColor: 'rgba(212, 212, 212, 1)',
                data: reverseCounts.map(count => count?.countsBoards),
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
        <div>
            <Chart type='bar' data={data} options={options} />
        </div>
    );
}

export default DiscreteGraph;