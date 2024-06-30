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

function AccumulateGraph({ counts, date }) {

    const [reverseCounts, setReverseCounts] = useState([]);
    const [signup, setSignup] = useState(0);
    const [signin, setSignin] = useState(0);
    const [products, setProducts] = useState(0);
    const [boards, setBoards] = useState(0);

    useEffect(() => {
        const reverse = counts?.slice(0, date).reverse().map(num => num);
        const remains = counts?.slice(date).map(num => num);

        let i = 0;
        let remainSignup = 0;
        let remainSignin = 0;
        let remainProducts = 0;
        let remainBoards = 0;

        for (i; i < remains.length; i++) {
            remainSignup += remains[i].countsSignup;
            remainSignin += remains[i].countsSignin;
            remainProducts += remains[i].countsProducts;
            remainBoards += remains[i].countsBoards;
        }

        setReverseCounts(reverse);
        setSignup(remainSignup);
        setSignin(remainSignin);
        setProducts(remainProducts);
        setBoards(remainBoards);
    }, [counts, date]);

    let accumSignup = 0;
    let accumSignin = 0;
    let accumProducts = 0;
    let accumBoards = 0;

    const labels = reverseCounts?.map(count => count?.countsDate);

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: '누적 가입자',
                borderColor: 'rgba(212, 212, 212, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts?.map(count => {
                    accumSignup += count?.countsSignup
                    return signup + accumSignup;
                }),
            },
            {
                type: 'line',
                label: '누적 접속자',
                borderColor: 'rgba(99, 197, 74, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts?.map(count => {
                    accumSignin += count?.countsSignin
                    return signin + accumSignin;
                }),
            },
            {
                type: 'line',
                label: '누적 사료 조회',
                borderColor: 'rgba(0, 86, 0, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts?.map(count => {
                    accumProducts += count?.countsProducts
                    return products + accumProducts;
                }),
            },
            {
                type: 'line',
                label: '누적 게시물',
                borderColor: 'rgba(212, 212, 212, 1)',
                borderWidth: 2,
                fill: false,
                data: reverseCounts.map(count => {
                    accumBoards += count?.countsBoards
                    return boards + accumBoards;
                }),
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

export default AccumulateGraph;