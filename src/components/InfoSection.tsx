
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const InfoSection: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in mt-8">
      <h2 className="section-title">Understanding Equity Dilution in Startups</h2>
      
      <div className="prose max-w-none text-brand-charcoal">
        <p className="mb-4">
          Equity dilution is a critical concept for startup founders, employees, and investors to understand. 
          When you own shares in a company and the company issues new shares, your ownership percentage decreases—this is dilution. 
          While your number of shares remains the same, they now represent a smaller piece of a larger pie.
        </p>
        
        <p className="mb-6">
          Our Equity Dilution Calculator helps you visualize how new funding rounds affect your ownership stake and, importantly, 
          the value of your equity. Use this tool to make informed decisions about your equity compensation and to understand 
          the impact of upcoming investment rounds.
        </p>
        
        <h3 className="subsection-title">Key Concepts in Equity Dilution</h3>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="pre-money-valuation">
            <AccordionTrigger>Pre-Money vs. Post-Money Valuation</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                <strong>Pre-money valuation</strong> is the company's value before receiving new investment. It's used to determine how much equity investors receive for their money.
              </p>
              <p>
                <strong>Post-money valuation</strong> is simply the pre-money valuation plus the new investment amount. This reflects the company's value immediately after funding.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="percentage-vs-value">
            <AccordionTrigger>Percentage Ownership vs. Actual Value</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                While dilution reduces your percentage ownership, it doesn't necessarily reduce the value of your equity. If the new investment significantly increases the company's valuation, your smaller percentage might be worth more in absolute terms.
              </p>
              <p>
                Example: If you own 2% of a ₹10 crore company (worth ₹20 lakhs), and after investment you own 1.5% of a ₹20 crore company, your equity is now worth ₹30 lakhs—despite the dilution.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="anti-dilution">
            <AccordionTrigger>Anti-Dilution Provisions</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Some shareholders, particularly investors, may have anti-dilution provisions in their agreements. These provisions protect them from dilution by automatically issuing them additional shares when new equity is sold at a lower price.
              </p>
              <p>
                As an employee, it's important to understand that you typically won't have these protections, making it even more important to understand how dilution affects your equity.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="option-pool">
            <AccordionTrigger>Employee Option Pools</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Companies often set aside a portion of their equity (typically 10-20%) as an "option pool" for future employees. This dilutes existing shareholders, including founders.
              </p>
              <p>
                When negotiating equity compensation, ask about the existing option pool and any planned expansions, as these will affect your ownership percentage.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <h3 className="subsection-title mt-6">Why Equity Dilution Matters for Employees</h3>
        
        <p className="mb-4">
          As a startup employee receiving equity compensation, understanding dilution is crucial for several reasons:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>
            <strong>Accurate valuation of compensation:</strong> When evaluating job offers with equity components, you need to accurately assess the potential future value of your equity grant.
          </li>
          <li>
            <strong>Decision-making during fundraising:</strong> If you're in a leadership role, understanding dilution helps you make strategic decisions about fundraising rounds and their impact on the cap table.
          </li>
          <li>
            <strong>Exercise timing for options:</strong> Knowledge of dilution helps you make informed decisions about when to exercise stock options, especially if you're considering early exercise.
          </li>
          <li>
            <strong>Career planning:</strong> Understanding the potential future value of your equity can inform decisions about how long to stay at a company and when might be the optimal time to join a new venture.
          </li>
        </ul>
        
        <h3 className="subsection-title">Common Scenarios That Cause Dilution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-brand-creamWhite p-4 rounded-lg">
            <h4 className="font-semibold text-brand-darkGreen mb-2">Funding Rounds</h4>
            <p>
              The most common cause of dilution. Each time a company raises capital by issuing new shares, all existing shareholders get diluted proportionally.
            </p>
          </div>
          
          <div className="bg-brand-creamWhite p-4 rounded-lg">
            <h4 className="font-semibold text-brand-darkGreen mb-2">Option Pool Creation/Expansion</h4>
            <p>
              Setting aside or increasing shares reserved for future employees dilutes current shareholders, though it's necessary for hiring and retention.
            </p>
          </div>
          
          <div className="bg-brand-creamWhite p-4 rounded-lg">
            <h4 className="font-semibold text-brand-darkGreen mb-2">Stock-Based Acquisitions</h4>
            <p>
              When companies acquire other businesses using stock as payment, they issue new shares, causing dilution for existing shareholders.
            </p>
          </div>
          
          <div className="bg-brand-creamWhite p-4 rounded-lg">
            <h4 className="font-semibold text-brand-darkGreen mb-2">Convertible Notes</h4>
            <p>
              When debt instruments like convertible notes convert to equity (usually during a funding round), they create new shares and cause dilution.
            </p>
          </div>
        </div>
        
        <h3 className="subsection-title">Tips for Managing Equity Dilution</h3>
        
        <p className="mb-4">
          While dilution is a natural part of a growing company, here are strategies to manage its impact:
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>
            <strong>Understand your equity grant fully.</strong> Know the total number of shares outstanding, not just your number of shares or percentage.
          </li>
          <li>
            <strong>Ask about the company's funding plans.</strong> Understanding when and how much capital the company plans to raise can help you estimate future dilution.
          </li>
          <li>
            <strong>Consider refresh grants.</strong> Many companies offer additional equity grants over time to offset dilution for key employees.
          </li>
          <li>
            <strong>Stay informed about company valuation.</strong> Higher valuations mean investors get less equity for their money, resulting in less dilution.
          </li>
          <li>
            <strong>Focus on value growth, not just percentage ownership.</strong> A smaller piece of a much more valuable company is often better than a larger piece of a less valuable one.
          </li>
        </ol>
        
        <hr className="my-8 border-t border-gray-200" />
        
        <h3 className="subsection-title">How to Use This Calculator</h3>
        
        <p className="mb-6">
          Our Equity Dilution Calculator is designed to help you understand how new investments affect your equity stake:
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Enter the total number of shares currently outstanding in the company.</li>
          <li>Enter the number of shares you own personally.</li>
          <li>Input the current company valuation (pre-money).</li>
          <li>Enter the amount of new investment being raised.</li>
          <li>Click "Calculate" to see how the investment affects your equity percentage and value.</li>
          <li>Use the visualization tabs to see different representations of the dilution effect.</li>
          <li>Download or email the report to save your calculations for future reference.</li>
        </ol>
        
        <div className="bg-brand-mintGreen bg-opacity-20 p-6 rounded-lg border-l-4 border-brand-darkGreen my-8">
          <h3 className="font-bold text-lg text-brand-darkGreen mb-2">Disclaimer</h3>
          <p className="text-sm">
            This calculator provides estimates based on simplified assumptions and should be used for general informational purposes only. 
            It does not account for complex cap table structures, different share classes, liquidation preferences, anti-dilution provisions, or other terms that might affect actual equity outcomes. 
            For important financial decisions, please consult with financial and legal advisors who can provide advice tailored to your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
