import { z } from 'zod';

const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Service name is required'),
  unit: z.number().min(1, 'Unit must be at least 1'),
  price: z.number().min(0, 'Price must be non-negative')
});

export const receiptFormSchema = z.object({
  division: z.string().min(1, 'Division is required'),
  organization: z.string().min(1, 'Organization is required'),
  contact: z.string().min(1, 'Contact is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  services: z.array(serviceSchema).min(1, 'At least one service is required'),
  tax: z.number().min(0, 'Tax must be non-negative'),
  vat: z.number().min(0, 'VAT must be non-negative'),
  discount: z.number().min(0, 'Discount must be non-negative'),
  subtotal: z.number(),
  grossTotal: z.number(),
  payableAmount: z.number(),
  depositAmount: z.number().min(0, 'Deposit amount must be non-negative'),
  dueAmount: z.number(),
  total: z.number()
});

export type ReceiptFormData = z.infer<typeof receiptFormSchema>;

export interface Receipt extends ReceiptFormData {
  id: string;
  date: string;
  status: 'Pending' | 'Paid' | 'Cancelled';
}
export interface Receipt {
  id: string;
  serialNo: string;
  date: string;
  name: string;
  applicantId: string;
  mobile: string;
  course: string;
  fees: string;
  feesAfterDiscount: string;
  paymentMethod: string;
  paidAmount: string;
  referrerName: string;
  referrerContact: string;
}