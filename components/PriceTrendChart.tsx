
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RouteInfo } from '../types';

interface PriceTrendChartProps {
    data: RouteInfo[];
}

const colors = ['#0052E1', '#FF6B6B', '#4ECDC4', '#F7D754'];

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-brand-gray-500">No price data available.</p>;
    }

    const chartData = data[0].priceTrend.map(pt => {
        const entry: { date: string; [key: string]: string | number } = { date: new Date(pt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
        data.forEach(route => {
            const pricePoint = route.priceTrend.find(p => p.date === pt.date);
            if (pricePoint) {
                entry[route.airline] = pricePoint.price;
            }
        });
        return entry;
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 20,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  labelStyle={{ color: '#111827' }} 
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                {data.map((route, index) => (
                    <Line
                        key={route.id}
                        type="monotone"
                        dataKey={route.airline}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceTrendChart;
