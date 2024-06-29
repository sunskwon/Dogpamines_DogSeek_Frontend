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

function ActGraph({ counts }) {

    const [reverseCounts, setReverseCounts] = useState([]);

    useEffect(() => {
        const reverse = counts?.slice(0, 7).reverse().map(num => num);
        setReverseCounts(reverse);
    }, [counts]);

    let accumProducts = 1;
    let accumBoards = 0;

    const labels = reverseCounts?.map(count => count?.countsDate);

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: '누적 사료 조회',
                borderColor: 'rgba(212, 212, 212, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts?.map(count => {
                    accumProducts += count?.countsProducts
                    return accumProducts;
                }),
            },
            {
                type: 'line',
                label: '누적 게시물',
                borderColor: 'rgba(153, 153, 153, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts?.map(count => {
                    accumBoards += count?.countsBoards
                    return accumBoards;
                }),
            },
            {
                type: 'bar',
                label: '사료 조회 수',
                backgroundColor: 'rgba(212, 212, 212, 1)',
                data: reverseCounts.map(count => count?.countsProducts),
                borderColor: 'white',
                borderWidth: 1,
            },
            {
                type: 'bar',
                label: '게시물 작성',
                backgroundColor: 'rgba(153, 153, 153, 1)',
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

export default ActGraph;