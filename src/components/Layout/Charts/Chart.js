import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import Navbar from '../Navbar/Navbar';
import BarChart from './BarChart';
import './Charts.css';

const DemoLine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const chartData = async () => {
            try {
                const response = await fetch('https://d4ad-2405-205-1482-fa00-943c-798-b5a8-1b5a.in.ngrok.io/shop');
                const json = await response.json();
                console.log(json);

                const arr = json.split(" ");
                console.log(arr);

                const regex = /([0-9]{1,4}[-][0-9]{1,}[-][0-9]{1,})|([0-9]{1,}[.][0-9]{1,})/;
                const filtered = arr.filter((data) => regex.test(data));
                console.log(filtered);

                const regexDate = /[0-9]{1,4}[-][0-9]{1,}[-][0-9]{1,}/;
                const dates = [];
                const values = [];

                filtered.forEach(item => {
                    if (regexDate.test(item)) {
                        dates.push(item);
                    } else {
                        values.push(parseFloat(item.split(",")[0]));
                    }
                });

                if (dates.length > 0 && values.length > 0) {
                    const chartData = dates.map((date, index) => ({
                        Date: date,
                        scales: values[index],
                    }));
                    setData(chartData);
                }
            } catch (error) {
                console.log('fetch data failed', error);
            }
        };

        chartData();
    }, []);

    const config = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
    };

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    const day = weekday[d.getDay()];
    const year = d.getFullYear();

    return (
        <>
            <Navbar />
            <div className='charts-analytics'>
                <div className='bar'>
                    <br />
                    <BarChart />
                    <div>
                        <h3><span>{day} </span>prediction</h3>
                    </div>
                </div>
                <div className='line'>
                    <br />
                    <br />
                    <Line {...config} />
                    <div>
                        <h3><span>{year + 1} </span>prediction</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DemoLine;
