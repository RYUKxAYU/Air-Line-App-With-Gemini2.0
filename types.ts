
export interface PriceDataPoint {
  date: string; // "YYYY-MM-DD"
  price: number; // Price proxy
}

export interface RouteInfo {
  id: string; // e.g., "JFK-LAX-DL"
  origin: string; // "JFK"
  destination: string; // "LAX"
  airline: string; // "Delta"
  flightCount: number; // Demand proxy
  averagePrice: number;
  priceTrend: PriceDataPoint[];
}

export interface Kpi {
    title: string;
    value: string;
    change?: string;
    changeType?: 'increase' | 'decrease';
}

export interface MarketData {
  routes: RouteInfo[];
  kpis: {
    totalRoutes: number;
    overallAveragePrice: number;
    mostPopularRoute: string; // "JFK-LAX"
    highestDemandAirline: string; // "United"
  };
}
