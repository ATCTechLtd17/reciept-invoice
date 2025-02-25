import  { forwardRef } from 'react';
import type { Receipt } from '../types/receipt';

interface ReceiptPreviewProps {
  receipt: Receipt;
  logoUrl?: string; // Add prop for logo URL
}

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  ({ receipt, logoUrl = '/path/to/default/logo.png' }, ref) => {
    const calculateSubtotal = () => {
      return receipt.services.reduce((acc, service) => acc + (service.unit * service.price), 0);
    };

    const subtotal = calculateSubtotal();
    const taxAmount = (subtotal * receipt.tax) / 100;
    const vatAmount = (subtotal * receipt.vat) / 100;
    const discountAmount = (subtotal * receipt.discount) / 100;
    
    const grossTotal = subtotal + taxAmount + vatAmount;
    const payableAmount = grossTotal - discountAmount;
    const dueAmount = payableAmount - (receipt.depositAmount || 0);

    return (
      <div ref={ref} className="bg-white p-4 max-w-md mx-auto text-sm">
        {/* Header with Logo */}
        <div className="mb-3 flex items-center justify-between">
          <div className="w-16">
            <img src={logoUrl} alt="ATC Tech Logo" className="w-full" />
          </div>
          <div className="text-right">
            <h1 className="text-lg font-bold">ATC Tech Limited</h1>
            <p className="text-xs">Silicon Tower, Hi-Tech Park, Rajshahi</p>
            <p className="text-xs">atcltd@gmail.com | +8801713050776</p>
          </div>
        </div>

        {/* Invoice Title */}
        <div className="text-center mb-3">
          <div className="inline-block border border-black px-4 py-0.5">
            <h2 className="text-base font-bold">Invoice</h2>
          </div>
        </div>

        {/* Invoice Details and Customer Info */}
        <div className="flex justify-between mb-3 text-xs">
          <div className="w-1/2">
            <p className="font-bold">Customer:</p>
            <p>{receipt.organization}</p>
            <p className="truncate">{receipt.address}</p>
            <p>{receipt.email}</p>
          </div>
          <div className="w-1/2 text-right">
            <p>Invoice No.: {receipt.id}</p>
            <p>Date: {receipt.date}</p>
            <p>Ref: {receipt.division}</p>
          </div>
        </div>

        {/* Services Table */}
        <table className="w-full mb-3 text-xs">
          <thead>
            <tr className="border border-black">
              <th className="border border-black p-1 w-8 text-center">SL.</th>
              <th className="border border-black p-1">Service Name</th>
              <th className="border border-black p-1 w-12 text-center">Unit</th>
              <th className="border border-black p-1 w-16 text-center">Price</th>
              <th className="border border-black p-1 w-16 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {receipt.services.map((service, index) => (
              <tr key={service.id} className="border border-black">
                <td className="border border-black p-1 text-center">{index + 1}</td>
                <td className="border border-black p-1">{service.name}</td>
                <td className="border border-black p-1 text-center">{service.unit}</td>
                <td className="border border-black p-1 text-right">৳{service.price.toLocaleString()}</td>
                <td className="border border-black p-1 text-right">৳{(service.unit * service.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculations */}
        <div className="w-full mb-3">
          <div className="flex justify-end">
            <table className="w-48 text-xs">
              <tbody>
                <tr className="border border-black">
                  <td className="p-1">Subtotal:</td>
                  <td className="p-1 text-right">৳{subtotal.toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1">TAX ({receipt.tax}%):</td>
                  <td className="p-1 text-right">৳{taxAmount.toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1">VAT ({receipt.vat}%):</td>
                  <td className="p-1 text-right">৳{vatAmount.toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1">Gross Total:</td>
                  <td className="p-1 text-right">৳{grossTotal.toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1">Discount ({receipt.discount}%):</td>
                  <td className="p-1 text-right">৳{discountAmount.toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1 font-bold">Payable Amount:</td>
                  <td className="p-1 text-right font-bold">৳{payableAmount.toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1">Deposit Amount:</td>
                  <td className="p-1 text-right">৳{(receipt.depositAmount || 0).toLocaleString()}</td>
                </tr>
                <tr className="border border-black">
                  <td className="p-1 font-bold">Due Amount:</td>
                  <td className="p-1 text-right font-bold">৳{dueAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs">
          <p className="mb-1"><strong>Disclaimer:</strong> This is a system-generated electronic invoice</p>
          <p className="text-center">Please reserve the invoice copy</p>
        </div>
      </div>
    );
  }
);

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;