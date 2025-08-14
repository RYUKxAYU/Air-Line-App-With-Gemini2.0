
import React, { useState, useEffect, useCallback } from 'react';
import { MarketData, RouteInfo, Kpi } from '../types';
import { fetchAirlineMarketData } from '../services/geminiService';
import FilterBar from './FilterBar';
import KpiCard from './KpiCard';
import PriceTrendChart from './PriceTrendChart';
import TopRoutesChart from './TopRoutesChart';
import RoutesTable from './RoutesTable';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { ChartBarIcon, TicketIcon, TrendingUpIcon, UsersIcon } from './icons';

const Dashboard: React.FC = () => {
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ origin: 'JFK', destination: 'LAX' });

    const loadData = useCallback(async (origin: string, destination: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAirlineMarketData(origin, destination);
            setMarketData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
            setMarketData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(filters.origin, filters.destination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only on initial mount

    const handleSearch = (newFilters: { origin: string; destination: string }) => {
        setFilters(newFilters);
        loadData(newFilters.origin, newFilters.destination);
    };

    const kpis: Kpi[] = marketData ? [
        { title: 'Total Routes Tracked', value: marketData.kpis.totalRoutes.toString() },
        { title: 'Overall Average Price', value: `$${marketData.kpis.overallAveragePrice.toFixed(2)}` },
        { title: 'Most Popular Route', value: marketData.kpis.mostPopularRoute },
        { title: 'Highest Demand Airline', value: marketData.kpis.highestDemandAirline },
    ] : [];
    
    const kpiIcons = [TicketIcon, TrendingUpIcon, ChartBarIcon, UsersIcon];

    return (
        <div className="space-y-6">
            <FilterBar onSearch={handleSearch} initialFilters={filters} isLoading={loading} />

            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}

            {!loading && !error && marketData && (
                <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {kpis.map((kpi, index) => (
                           <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} Icon={kpiIcons[index]} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium text-brand-gray-900 mb-4">Price Trends</h3>
                            <PriceTrendChart data={marketData.routes} />
                        </div>
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium text-brand-gray-900 mb-4">Demand by Airline</h3>
                            <TopRoutesChart data={marketData.routes} />
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium text-brand-gray-900 mb-4">Route Details</h3>
                        <RoutesTable data={marketData.routes} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
