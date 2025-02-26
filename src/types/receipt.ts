import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Service name is required"),
  unit: z.number().min(1, "Unit must be at least 1"),
  price: z.number().min(0, "Price cannot be negative")
});

export const receiptFormSchema = z.object({
  division: z.string().min(1, "Division is required"),
  organization: z.string().min(1, "Organization name is required"),
  contact: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  services: z.array(serviceSchema).min(1, "At least one service is required"),
  tax: z.number().min(0, "Tax cannot be negative").max(100, "Tax cannot exceed 100%"),
  vat: z.number().min(0, "VAT cannot be negative").max(100, "VAT cannot exceed 100%"),
  discount: z.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%"),
  total: z.number()
});

export type Service = z.infer<typeof serviceSchema>;
export type ReceiptFormData = z.infer<typeof receiptFormSchema>;

export interface Receipt extends ReceiptFormData {
  payableAmount: number;
  depositAmount: number;
  id: string;
  date: string;
  status: 'Pending' | 'Paid';
}