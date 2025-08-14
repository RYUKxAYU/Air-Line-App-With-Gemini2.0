
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      <p className="ml-4 text-brand-gray-600">Generating market insights...</p>
    </div>
  );
};

export default Loader;
