
import React from 'react';
import Dashboard from './components/Dashboard';
import { PlaneIcon } from './components/icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-gray-50 text-brand-gray-800 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
          <PlaneIcon className="h-8 w-8 text-brand-blue" />
          <h1 className="ml-3 text-2xl font-bold text-brand-gray-900">
            Airline Market Demand Tracker
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Dashboard />
        </div>
      </main>
       <footer className="text-center py-4 text-brand-gray-500 text-sm">
          <p>Powered by AI. Data is for demonstration purposes only.</p>
        </footer>
    </div>
  );
};

export default App;
