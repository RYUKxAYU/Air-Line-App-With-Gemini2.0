
import React from 'react';

interface KpiCardProps {
    title: string;
    value: string;
    Icon: React.ElementType;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, Icon }) => {
    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-5 flex items-center">
                <div className="flex-shrink-0">
                    <div className="bg-brand-blue-light p-3 rounded-full">
                        <Icon className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                    </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-brand-gray-500 truncate">{title}</dt>
                        <dd>
                            <div className="text-lg font-bold text-brand-gray-900">{value}</div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default KpiCard;
