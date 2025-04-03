
import { EquityData } from './calculatorUtils';
import { generateEquityDilutionPDF } from './pdfUtils';
import { toast } from "@/components/ui/use-toast";

export interface EmailFormData {
  to: string;
  subject?: string;
  message?: string;
}

export const sendEquityCalculationByEmail = async (
  emailData: EmailFormData,
  equityData: EquityData
): Promise<boolean> => {
  try {
    // In a real application, this would call your backend API to send the email
    // For demo purposes, we'll simulate a successful email sending
    
    // Normally, you would:
    // 1. Generate the PDF on the server
    // 2. Attach it to an email
    // 3. Send via a service like SendGrid, AWS SES, etc.
    
    console.log('Sending email to:', emailData.to);
    console.log('With equity data:', equityData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    toast({
      title: "Email Sent Successfully!",
      description: `The equity dilution report has been sent to ${emailData.to}`,
      duration: 5000,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Show error message
    toast({
      title: "Failed to Send Email",
      description: "There was an error sending your email. Please try again.",
      variant: "destructive",
      duration: 5000,
    });
    
    return false;
  }
};
