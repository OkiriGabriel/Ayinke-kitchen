import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

const ProjLineChart = () => {

    const data = [
        {
          name: "Monday",
          transactions: 4000,
          orders: 2400,
          amt: 2400
        },
        {
          name: "Tuesday",
          transactions: 3000,
          orders: 1398,
          amt: 2210
        },
        {
          name: "Wednesday",
          transactions: 2000,
          orders: 9800,
          amt: 2290
        },
        {
          name: "Thursday",
          transactions: 2780,
          orders: 3908,
          amt: 2000
        },
        {
          name: "Friday",
          transactions: 1890,
          orders: 4800,
          amt: 2181
        },
        {
          name: "Saturday",
          transactions: 2390,
          orders: 3800,
          amt: 2500
        },
        {
          name: "Sunday",
          transactions: 3490,
          orders: 4300,
          amt: 2100
        }
      ];

    return (
        <>

            <LineChart
                width={600}
                height={350}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="transactions" stroke="#82ca9d" />
            </LineChart>
            
        </>
    )
}

export default ProjLineChart;
