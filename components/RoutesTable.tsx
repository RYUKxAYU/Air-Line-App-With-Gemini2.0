
import React from 'react';
import { RouteInfo } from '../types';
import { TrendingUpIcon, TrendingDownIcon } from './icons';

interface RoutesTableProps {
    data: RouteInfo[];
}

const RoutesTable: React.FC<RoutesTableProps> = ({ data }) => {
     if (!data || data.length === 0) {
        return <p className="text-center text-brand-gray-500">No route data available.</p>;
    }

    const calculatePriceChange = (trend: RouteInfo['priceTrend']) => {
        if (trend.length < 2) return { change: 0, type: 'neutral' };
        const firstPrice = trend[0].price;
        const lastPrice = trend[trend.length - 1].price;
        const change = ((lastPrice - firstPrice) / firstPrice) * 100;
        return {
            change: change,
            type: change > 0 ? 'increase' : (change < 0 ? 'decrease' : 'neutral')
        };
    };

    return (
        <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-brand-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brand-gray-900 sm:pl-0">Airline</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-gray-900">Route</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-gray-900">Demand (Flights)</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-gray-900">Avg. Price</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-gray-900">14-Day Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-gray-200 bg-white">
                            {data.map((route) => {
                                const trend = calculatePriceChange(route.priceTrend);
                                return (
                                    <tr key={route.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-brand-gray-900 sm:pl-0">{route.airline}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-gray-500">{route.origin} &rarr; {route.destination}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-gray-500">{route.flightCount}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-gray-500">${route.averagePrice.toFixed(2)}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-gray-500">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                trend.type === 'increase' ? 'bg-red-100 text-red-800' :
                                                trend.type === 'decrease' ? 'bg-green-100 text-green-800' :
                                                'bg-brand-gray-100 text-brand-gray-800'
                                            }`}>
                                                {trend.type === 'increase' && <TrendingUpIcon className="-ml-0.5 mr-0.5 h-4 w-4 text-red-500" />}
                                                {trend.type === 'decrease' && <TrendingDownIcon className="-ml-0.5 mr-0.5 h-4 w-4 text-green-500" />}
                                                {trend.change.toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoutesTable;
