
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EquityData } from '../utils/calculatorUtils';
import { EmailFormData, sendEquityCalculationByEmail } from '../utils/emailUtils';
import { toast } from "@/components/ui/use-toast";

interface EmailFormProps {
  equityData: EquityData | null;
}

const emailFormSchema = z.object({
  to: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().optional(),
  message: z.string().optional(),
});

const EmailForm: React.FC<EmailFormProps> = ({ equityData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      subject: 'Equity Dilution Calculation Results',
      message: 'Please find attached the equity dilution calculation results you requested.',
    },
  });
  
  const onSubmit = async (data: EmailFormData) => {
    if (!equityData) {
      toast({
        title: "No Data Available",
        description: "Please complete the calculation first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await sendEquityCalculationByEmail(data, equityData);
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to Send Email",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-50 border-brand-darkGreen text-brand-darkGreen hover:text-brand-darkGreen"
          disabled={!equityData}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Report
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Equity Calculation Report</DialogTitle>
          <DialogDescription>
            Send the equity dilution calculation results to any email address.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="to" className="text-right">
              Recipient Email
            </Label>
            <Input
              id="to"
              placeholder="recipient@example.com"
              {...register('to')}
            />
            {errors.to && (
              <p className="text-sm text-red-500">{errors.to.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              {...register('subject')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              rows={3}
              {...register('message')}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-brand-darkGreen hover:bg-opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Report'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailForm;
