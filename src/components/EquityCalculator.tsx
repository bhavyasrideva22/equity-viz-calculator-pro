
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, IndianRupee } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DilutionChart from './DilutionChart';
import EmailForm from './EmailForm';
import { EquityData, calculateEquityDilution, formatCurrency, formatPercentage, formatNumber } from '../utils/calculatorUtils';
import { downloadPDF } from '../utils/pdfUtils';

const formSchema = z.object({
  initialShares: z.coerce.number().positive({ message: "Total shares must be positive" }).int(),
  yourShares: z.coerce.number().positive({ message: "Your shares must be positive" }).int(),
  companyValuation: z.coerce.number().positive({ message: "Company valuation must be positive" }),
  investmentAmount: z.coerce.number().positive({ message: "Investment amount must be positive" }),
});

const EquityCalculator: React.FC = () => {
  const [calculationResult, setCalculationResult] = useState<EquityData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialShares: 1000000,
      yourShares: 50000,
      companyValuation: 100000000, // 10 crore INR
      investmentAmount: 50000000, // 5 crore INR
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const result = calculateEquityDilution(
        values.initialShares,
        values.yourShares,
        values.companyValuation,
        values.investmentAmount
      );
      
      setCalculationResult(result);
      setIsCalculating(false);
    }, 800); // Simulate a delay for UX purposes
  };
  
  const handleDownload = async () => {
    if (!calculationResult) return;
    await downloadPDF(calculationResult);
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="calculator-container">
          <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Equity Dilution Calculator</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="initialShares"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Company Shares</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter total shares" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Total number of shares currently outstanding
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="yourShares"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Shares</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter your shares" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Number of shares you currently own
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyValuation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Company Valuation (₹)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">
                            <IndianRupee className="h-4 w-4" />
                          </span>
                          <Input 
                            type="number" 
                            className="pl-10" 
                            placeholder="Enter valuation" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Current (pre-money) valuation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="investmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Investment Amount (₹)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">
                            <IndianRupee className="h-4 w-4" />
                          </span>
                          <Input 
                            type="number" 
                            className="pl-10" 
                            placeholder="Enter investment amount" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Amount of new investment
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-gold hover:bg-opacity-90 text-brand-charcoal"
                disabled={isCalculating}
              >
                {isCalculating ? "Calculating..." : "Calculate Dilution"}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="calculator-container">
          <h2 className="text-2xl font-bold mb-6 text-brand-darkGreen">Results</h2>
          
          {calculationResult ? (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Before Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Equity</p>
                        <p className="text-2xl font-bold text-brand-darkGreen">{formatPercentage(calculationResult.equityPercentage)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Equity Value</p>
                        <p className="text-xl font-bold">{formatCurrency(calculationResult.equityValueBeforeDilution)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">After Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Your Equity</p>
                        <p className="text-2xl font-bold text-brand-darkGreen">{formatPercentage(calculationResult.newEquityPercentage)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Equity Value</p>
                        <p className="text-xl font-bold">{formatCurrency(calculationResult.equityValueAfterDilution)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Company Valuation</p>
                      <p className="font-medium">
                        {formatCurrency(calculationResult.companyValuation)} → {formatCurrency(calculationResult.postMoneyValuation)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Total Shares</p>
                      <p className="font-medium">
                        {formatNumber(calculationResult.initialShares)} → {formatNumber(calculationResult.totalSharesAfterDilution)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">New Shares Issued</p>
                      <p className="font-medium">{formatNumber(calculationResult.newSharesIssued)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Dilution</p>
                      <p className="font-medium text-brand-darkGreen">
                        {formatPercentage(calculationResult.equityPercentage - calculationResult.newEquityPercentage)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-4">
                  <EmailForm equityData={calculationResult} />
                  
                  <Button 
                    variant="outline" 
                    className="bg-white hover:bg-gray-50 border-brand-darkGreen text-brand-darkGreen hover:text-brand-darkGreen"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-10 text-gray-500">
              <p className="mb-2">Enter values and calculate to see results</p>
            </div>
          )}
        </div>
      </div>
      
      {calculationResult && (
        <DilutionChart data={calculationResult} />
      )}
    </div>
  );
};

export default EquityCalculator;
