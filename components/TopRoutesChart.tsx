
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { RouteInfo } from '../types';

interface TopRoutesChartProps {
    data: RouteInfo[];
}

const TopRoutesChart: React.FC<TopRoutesChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-brand-gray-500">No demand data available.</p>;
    }
    
    const sortedData = [...data].sort((a, b) => b.flightCount - a.flightCount);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                layout="vertical"
                data={sortedData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis dataKey="airline" type="category" stroke="#6b7280" fontSize={12} width={80} />
                <Tooltip 
                  formatter={(value: number) => `${value} flights`}
                  labelStyle={{ color: '#111827' }} 
                  itemStyle={{ fontWeight: 'bold', color: '#0052E1' }}
                  cursor={{ fill: 'rgba(230, 240, 255, 0.5)' }}
                />
                <Bar dataKey="flightCount" fill="#0052E1" barSize={30}>
                    <LabelList dataKey="flightCount" position="right" style={{ fill: '#374151', fontSize: 12 }} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopRoutesChart;
