
import React, { useState } from 'react';

interface FilterBarProps {
    onSearch: (filters: { origin: string; destination: string }) => void;
    initialFilters: { origin: string; destination: string };
    isLoading: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, initialFilters, isLoading }) => {
    const [origin, setOrigin] = useState(initialFilters.origin);
    const [destination, setDestination] = useState(initialFilters.destination);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ origin, destination });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="origin" className="block text-sm font-medium text-brand-gray-700">Origin</label>
                    <input
                        type="text"
                        id="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                        placeholder="e.g., JFK"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-300 rounded-md shadow-sm placeholder-brand-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        required
                    />
                </div>
                <div className="w-full sm:w-auto flex-grow">
                    <label htmlFor="destination" className="block text-sm font-medium text-brand-gray-700">Destination</label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value.toUpperCase())}
                        placeholder="e.g., LAX"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-300 rounded-md shadow-sm placeholder-brand-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        required
                    />
                </div>
                <div className="w-full sm:w-auto sm:self-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-brand-gray-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterBar;
