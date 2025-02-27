import { forwardRef } from 'react';
import type { Receipt } from '../../types/receipt';

interface ReceiptPreviewProps {
  receipt: Receipt;
  logoUrl?: string;
  companyName?: string;
  showWatermark?: boolean;
}

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  ({ 
    receipt, 
    logoUrl = 'https://i.ibb.co.com/pBFDhLV8/ATC.png',
    companyName = 'ATC Tech Limited',
    showWatermark = true
  }, ref) => {
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
      <div ref={ref} className="bg-white p-4 max-w-[600px] mx-auto text-xs relative overflow-hidden" style={{ minHeight: '27.7cm', maxHeight: '27.7cm', width: '21cm' }}>
        {/* Watermark */}
        {showWatermark && (
          <div className="absolute inset-0 flex items-start  justify-center opacity-5 pointer-events-none">
            <div className="transform rotate-45 text-gray-800 text-6xl font-bold whitespace-nowrap">
              {companyName}
            </div>
          </div>
        )}
        {showWatermark && (
          <div className="absolute inset-0 flex items-end  justify-center opacity-5 pointer-events-none">
            <div className="transform rotate-45 text-gray-800 text-6xl font-bold whitespace-nowrap">
              {companyName}
            </div>
          </div>
        )}
        {showWatermark && (
          <div className="absolute inset-0 flex items-center  justify-center opacity-5 pointer-events-none">
            <div className="transform rotate-45 -translate-y-40 text-gray-800 text-6xl font-bold whitespace-nowrap">
              {companyName}
            </div>
          </div>
        )}
        
        {/* Header with Logo */}
        <div className="mb-3 flex items-center justify-between">
          <div className="w-28">
            <img src={logoUrl} alt={`${companyName} Logo`} className="w-full" />
          </div>
          <div className="text-right">
            <h1 className="text-lg font-bold text-gray-800">{companyName}</h1>
            <p className="text-xs text-gray-600">Level-7, Suit-A, Silicon Tower, Hi-Tech Park, Rajshahi</p>
            <p className="text-xs text-gray-600">atctechltdbd@gmail.com | +8801713050776</p>
          </div>
        </div>

        <hr className="border-gray-300 my-2" />

        {/* Invoice Title */}
        <div className="text-center mb-2">
          <div className="inline-block border border-gray-800 px-4 py-0.5">
            <h2 className="text-base font-bold text-gray-800">INVOICE</h2>
          </div>
        </div>

        {/* Invoice Details and Customer Info */}
        <div className="flex justify-between mb-3 text-xs">
          <div className="w-1/2">
            <p className="font-bold text-gray-700">Bill To:</p>
            <p>{receipt.organization}</p>
            <p className="truncate text-gray-600">{receipt.address}</p>
            <p className="text-gray-600">{receipt.email}</p>
          </div>
          <div className="w-1/2 text-right">
            <p><span className="font-bold text-gray-700">Invoice No.:</span> {receipt.id}</p>
            <p><span className="font-bold text-gray-700">Date:</span> {receipt.date}</p>
            <p><span className="font-bold text-gray-700">Reference:</span> {receipt.division}</p>
          </div>
        </div>

        {/* Services Table */}
        <table className="w-full mb-3 text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1 w-8 text-center">SL.</th>
              <th className="border border-gray-300 p-1 text-left">Description</th>
              <th className="border border-gray-300 p-1 w-10 text-center">Qty</th>
              <th className="border border-gray-300 p-1 w-16 text-right">Unit Price(৳)</th>
              <th className="border border-gray-300 p-1 w-20 text-right">Amount (৳)</th>
            </tr>
          </thead>
          <tbody>
            {receipt.services.map((service, index) => (
              <tr key={service.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 p-1 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-1">{service.name}</td>
                <td className="border border-gray-300 p-1 text-center">{service.unit}</td>
                <td className="border border-gray-300 p-1 text-right">{service.price.toLocaleString()}</td>
                <td className="border border-gray-300 p-1 text-right">{(service.unit * service.price).toLocaleString()}</td>
              </tr>
            ))}
            
            {/* Removed empty rows */}
          </tbody>
        </table>

        {/* Calculations */}
        <div className="w-full mb-3">
          <div className="flex justify-end">
            <table className="w-48 text-xs">
              <tbody>
                <tr>
                  <td className="p-0.5 text-gray-700">Subtotal:</td>
                  <td className="p-0.5 text-right">{subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-gray-700">TAX ({receipt.tax}%):</td>
                  <td className="p-0.5 text-right">{taxAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-gray-700">VAT ({receipt.vat}%):</td>
                  <td className="p-0.5 text-right">{vatAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-gray-700">Gross Total:</td>
                  <td className="p-0.5 text-right">{grossTotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-gray-700">Discount ({receipt.discount}%):</td>
                  <td className="p-0.5 text-right">{discountAmount.toLocaleString()}</td>
                </tr>
                <tr className="border-t border-b border-gray-400">
                  <td className="p-1 font-bold text-gray-800">Payable Amount:</td>
                  <td className="p-1 text-right font-bold text-gray-800">৳{payableAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-0.5 text-gray-700">Deposit Amount:</td>
                  <td className="p-0.5 text-right">৳{(receipt.depositAmount || 0).toLocaleString()}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-1 font-bold text-gray-800">Due Amount:</td>
                  <td className="p-1 text-right font-bold text-gray-800">৳{dueAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-gray-300 my-2" />

        {/* Footer */}
       

        {/* Disclaimer */}
        <div className="mt-3 pt-2 border-t border-gray-300 text-xs text-gray-500">
          <p><strong>Disclaimer:</strong> This is a system-generated electronic invoice. Please retain this invoice for your records.</p>
          <p className="text-center mt-1">Thank you for your business!</p>
        </div>
      </div>
    );
  }
);

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;