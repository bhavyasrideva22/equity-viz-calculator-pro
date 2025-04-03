
import React from 'react';
import { IndianRupee, ChartPie } from 'lucide-react';
import EquityCalculator from '../components/EquityCalculator';
import InfoSection from '../components/InfoSection';
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-creamWhite">
      <header className="bg-brand-darkGreen text-white py-6 shadow-md">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartPie className="h-8 w-8 text-brand-gold" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">Equity-Viz Calculator Pro</h1>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-brand-gold" />
              <span className="text-sm md:text-base font-medium">INR</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 mx-auto py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen animate-fade-in">
              Startup Equity Dilution Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Visualize how new investment rounds affect your equity ownership and value. 
              Make informed decisions about your startup equity with our interactive calculator.
            </p>
          </div>

          <EquityCalculator />
          
          <Separator className="my-10" />
          
          <InfoSection />
          
          <footer className="mt-16 text-center text-sm text-gray-500">
            <p className="mb-2">© {new Date().getFullYear()} Equity-Viz Calculator Pro. All rights reserved.</p>
            <p>This calculator is for informational purposes only and should not be considered financial advice.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
