import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const TwoPieChart = () => {

    const data01 = [
        { name: 'Orders', value: 400 },
        { name: 'Transactions', value: 300 },
      ];

    return (
        <>

            <PieChart width={1000} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data01}
                    cx={150}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
            
        </>
    )
}

export default TwoPieChart;
