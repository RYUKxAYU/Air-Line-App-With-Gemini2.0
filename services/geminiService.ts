
import { GoogleGenAI, Type } from "@google/genai";
import { MarketData } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock_key" });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    kpis: {
      type: Type.OBJECT,
      properties: {
        totalRoutes: { type: Type.INTEGER, description: "Total unique routes (origin-destination-airline combinations)." },
        overallAveragePrice: { type: Type.NUMBER, description: "The average price across all flights and dates." },
        mostPopularRoute: { type: Type.STRING, description: "The route with the highest flight count (e.g., JFK-LAX)." },
        highestDemandAirline: { type: Type.STRING, description: "The airline with the highest total flight count." },
      },
      required: ["totalRoutes", "overallAveragePrice", "mostPopularRoute", "highestDemandAirline"],
    },
    routes: {
      type: Type.ARRAY,
      description: "List of airline routes with their data.",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique ID for the route, e.g., JFK-LAX-DL" },
          origin: { type: Type.STRING, description: "Origin airport code, e.g., JFK" },
          destination: { type: Type.STRING, description: "Destination airport code, e.g., LAX" },
          airline: { type: Type.STRING, description: "Airline name, e.g., Delta" },
          flightCount: { type: Type.INTEGER, description: "Total number of flights on this route for the period." },
          averagePrice: { type: Type.NUMBER, description: "The average price for this route over the period." },
          priceTrend: {
            type: Type.ARRAY,
            description: "Daily price trend for the next 14 days.",
            items: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING, description: "Date in YYYY-MM-DD format." },
                price: { type: Type.NUMBER, description: "Simulated price for that day." },
              },
              required: ["date", "price"],
            },
          },
        },
        required: ["id", "origin", "destination", "airline", "flightCount", "averagePrice", "priceTrend"],
      },
    },
  },
  required: ["kpis", "routes"],
};

const createMockData = (): MarketData => {
  const today = new Date();
  const generatePriceTrend = (basePrice: number) => {
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        price: Math.round(basePrice + (Math.random() - 0.5) * 50),
      };
    });
  };
  return {
    kpis: {
      totalRoutes: 4,
      overallAveragePrice: 385,
      mostPopularRoute: "JFK-LAX",
      highestDemandAirline: "United"
    },
    routes: [
      { id: 'JFK-LAX-UA', origin: 'JFK', destination: 'LAX', airline: 'United', flightCount: 120, averagePrice: 410, priceTrend: generatePriceTrend(410) },
      { id: 'JFK-LAX-DL', origin: 'JFK', destination: 'LAX', airline: 'Delta', flightCount: 95, averagePrice: 425, priceTrend: generatePriceTrend(425) },
      { id: 'SFO-ORD-AA', origin: 'SFO', destination: 'ORD', airline: 'American', flightCount: 80, averagePrice: 350, priceTrend: generatePriceTrend(350) },
      { id: 'SFO-ORD-UA', origin: 'SFO', destination: 'ORD', airline: 'United', flightCount: 88, averagePrice: 340, priceTrend: generatePriceTrend(340) },
    ]
  };
}

export const fetchAirlineMarketData = async (origin: string, destination: string): Promise<MarketData> => {
    if (!process.env.API_KEY || process.env.API_KEY === "mock_key") {
        console.log("Using mock data generation.");
        return Promise.resolve(createMockData());
    }

    try {
        const prompt = `
        You are an expert airline market data analyst and simulator.
        Generate a realistic but fictional market demand and pricing dataset for flights between ${origin} and ${destination} for the next 14 days.
        Include data for 2-4 major competing airlines on this route.
        The data should reflect typical supply/demand dynamics, with some price variation between airlines and over time.
        Ensure the output is a valid JSON object that strictly adheres to the provided schema. Do not add any extra text or explanations outside the JSON object.

        Route: ${origin} to ${destination}
        Timeframe: Next 14 days
        Airlines: Include major US carriers like United, Delta, American, etc.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        // Basic validation
        if (!data.routes || !data.kpis) {
            throw new Error("Invalid data structure received from API.");
        }

        return data as MarketData;

    } catch (error) {
        console.error("Error fetching or parsing airline data from Gemini API:", error);
        throw new Error("Failed to generate market data. Please try again.");
    }
};
