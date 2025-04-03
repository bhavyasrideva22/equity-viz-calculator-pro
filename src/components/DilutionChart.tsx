
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EquityData } from '../utils/calculatorUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DilutionChartProps {
  data: EquityData | null;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const DilutionChart: React.FC<DilutionChartProps> = ({ data }) => {
  const [beforeDilutionData, setBeforeDilutionData] = useState<ChartData[]>([]);
  const [afterDilutionData, setAfterDilutionData] = useState<ChartData[]>([]);
  const [barChartData, setBarChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;
    
    // Prepare pie chart data
    setBeforeDilutionData([
      {
        name: 'Your Equity',
        value: data.equityPercentage,
        color: '#245e4f' // Dark Green
      },
      {
        name: 'Other Shareholders',
        value: 100 - data.equityPercentage,
        color: '#7ac9a7' // Mint Green
      }
    ]);
    
    setAfterDilutionData([
      {
        name: 'Your Equity',
        value: data.newEquityPercentage,
        color: '#245e4f' // Dark Green
      },
      {
        name: 'Other Existing Shareholders',
        value: 100 - data.equityPercentage - (data.newInvestmentAmount / data.postMoneyValuation * 100),
        color: '#7ac9a7' // Mint Green
      },
      {
        name: 'New Investor',
        value: data.newInvestmentAmount / data.postMoneyValuation * 100,
        color: '#e9c46a' // Gold
      }
    ]);
    
    // Prepare bar chart data
    setBarChartData([
      {
        name: 'Before Investment',
        'Your Equity (%)': data.equityPercentage,
        'Your Value (₹)': data.equityValueBeforeDilution,
        'Company Value (₹)': data.companyValuation,
      },
      {
        name: 'After Investment',
        'Your Equity (%)': data.newEquityPercentage,
        'Your Value (₹)': data.equityValueAfterDilution,
        'Company Value (₹)': data.postMoneyValuation,
      }
    ]);
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500">Enter values to see visualization</p>
      </div>
    );
  }

  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
          <p className="font-medium text-brand-darkGreen">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('%') ? formatPercent(entry.value) : formatINR(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <h3 className="subsection-title">Equity Visualization</h3>
      
      <Tabs defaultValue="pie" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="pie">Ownership Structure</TabsTrigger>
          <TabsTrigger value="bar">Comparison</TabsTrigger>
          <TabsTrigger value="value">Value Change</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pie" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-center font-medium mb-4">Before Investment</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={beforeDilutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {beforeDilutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="text-center font-medium mb-4">After Investment</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={afterDilutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {afterDilutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bar">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#245e4f" />
              <YAxis yAxisId="right" orientation="right" stroke="#e9c46a" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="Your Equity (%)" name="Your Equity (%)" fill="#245e4f" />
              <Bar yAxisId="right" dataKey="Company Value (₹)" name="Company Value (₹)" fill="#e9c46a" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="value">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Your Value (₹)" name="Your Equity Value (₹)" fill="#7ac9a7" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DilutionChart;
