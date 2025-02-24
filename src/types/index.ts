export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Receipt {
  id: string;
  serialNumber: string;
  applicantId: string;
  mobileNumber: string;
  amount: number;
  discount: number;
  finalAmount: number;
  createdAt: string;
  items: ReceiptItem[];
}

export interface ReceiptItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DashboardStats {
  totalReceipts: number;
  totalAmount: number;
  totalDiscounts: number;
  recentReceipts: Receipt[];
}

export interface MoneyReceipt {
  serialNumber: string;
  date: string;
  name: string;
  applicantId: string;
  mobile: string;
  course: string;
  fees: number;
  feesAfterDiscount: number;
  paymentMethod: 'Full' | 'Partial';
  paidAmount: number;
  referrerName: string;
  referrerContact: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  vat: number;
  total: number;
  discount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}