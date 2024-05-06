import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="cost" nameKey="name" label>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.colour} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);

export default PieChartComponent;
