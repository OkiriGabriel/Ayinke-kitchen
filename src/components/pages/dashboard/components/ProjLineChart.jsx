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
          Transactions: 4000,
          Orders: 2400,
          amt: 2400
        },
        {
          name: "Tuesday",
          Transactions: 3000,
          Orders: 1398,
          amt: 2210
        },
        {
          name: "Wednesday",
          Transactions: 2000,
          Orders: 9800,
          amt: 2290
        },
        {
          name: "Thursday",
          Transactions: 2780,
          Orders: 3908,
          amt: 2000
        },
        {
          name: "Friday",
          Transactions: 1890,
          Orders: 4800,
          amt: 2181
        },
        {
          name: "Saturday",
          Transactions: 2390,
          Orders: 3800,
          amt: 2500
        },
        {
          name: "Sunday",
          Transactions: 3490,
          Orders: 4300,
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
                    dataKey="Orders"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Transactions" stroke="#82ca9d" />
            </LineChart>
            
        </>
    )
}

export default ProjLineChart;
