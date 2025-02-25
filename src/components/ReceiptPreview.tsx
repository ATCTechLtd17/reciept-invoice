import React, { forwardRef } from 'react';
import type { Receipt } from '../types/receipt';

interface ReceiptPreviewProps {
  receipt: Receipt;
}

const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(({ receipt }, ref) => {
  const calculateSubtotal = () => {
    return receipt.services.reduce((acc, service) => acc + (service.unit * service.price), 0);
  };

  const subtotal = calculateSubtotal();
  const taxAmount = (subtotal * receipt.tax) / 100;
  const vatAmount = (subtotal * receipt.vat) / 100;
  const discountAmount = (subtotal * receipt.discount) / 100;
  const total = receipt.total;

  return (
    <div ref={ref} className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-24">
            <h2 className="text-2xl font-bold">ATC</h2>
            <p className="text-sm font-semibold">TECH Limited</p>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold mb-2">ATC Tech Limited</h1>
            <p className="text-sm mb-1">Rajshahi Office: Silicon Tower, Level # 7, Suit # A, Hi-Tech Park, Rajshahi, Bangladesh</p>
            <p className="text-sm">
              <span className="mr-2">WEB: www.atcltd.com</span>
              <span className="mr-2">Email: atcltd@gmail.com</span>
              <span className="mr-2">TELE: 02589879717-15</span>
              <span>Mobile: +8801713050776(WhatsApp)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Title */}
      <div className="text-center mb-6">
        <div className="inline-block border-2 border-black px-8 py-1">
          <h2 className="text-xl font-bold">Invoice</h2>
        </div>
      </div>

      {/* Invoice Details and Customer Info */}
      <div className="flex justify-between mb-6">
        <div className="w-1/2">
          <h3 className="font-bold mb-2">Customer Details:</h3>
          <p>{receipt.organization}</p>
          <p>{receipt.address}</p>
          <p>{receipt.email}</p>
        </div>
        <div className="w-1/2 text-right">
          <p>Invoice No.: {receipt.id}</p>
          <p>Date: {receipt.date}</p>
          <p>Ref: {receipt.division}</p>
        </div>
      </div>

      {/* Services Table */}
      <table className="w-full mb-6">
        <thead>
          <tr className="border border-black">
            <th className="border border-black p-2 w-16 text-center">SL.</th>
            <th className="border border-black p-2">Service Name & Details</th>
            <th className="border border-black p-2 w-24 text-center">Unit</th>
            <th className="border border-black p-2 w-24 text-center">Price</th>
            <th className="border border-black p-2 w-24 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {receipt.services.map((service, index) => (
            <tr key={service.id} className="border border-black">
              <td className="border border-black p-2 text-center">{index + 1}</td>
              <td className="border border-black p-2">{service.name}</td>
              <td className="border border-black p-2 text-center">{service.unit}</td>
              <td className="border border-black p-2 text-right">৳ {service.price.toLocaleString()}</td>
              <td className="border border-black p-2 text-right">৳ {(service.unit * service.price).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Calculations */}
      <div className="w-full">
        <div className="flex justify-end">
          <table className="w-64">
            <tbody>
              <tr className="border border-black">
                <td className="p-2">Subtotal:</td>
                <td className="p-2 text-right">৳ {subtotal.toLocaleString()}</td>
              </tr>
              <tr className="border border-black">
                <td className="p-2">TAX ({receipt.tax}%):</td>
                <td className="p-2 text-right">৳ {taxAmount.toLocaleString()}</td>
              </tr>
              <tr className="border border-black">
                <td className="p-2">VAT ({receipt.vat}%):</td>
                <td className="p-2 text-right">৳ {vatAmount.toLocaleString()}</td>
              </tr>
              <tr className="border border-black">
                <td className="p-2">Gross Total:</td>
                <td className="p-2 text-right">৳ {(subtotal + taxAmount + vatAmount).toLocaleString()}</td>
              </tr>
              <tr className="border border-black">
                <td className="p-2">Discount ({receipt.discount}%):</td>
                <td className="p-2 text-right">৳ {discountAmount.toLocaleString()}</td>
              </tr>
              <tr className="border border-black">
                <td className="p-2 font-bold">Due Amount:</td>
                <td className="p-2 text-right font-bold">৳ {total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-sm">
        <p className="mb-4"><strong>Disclaimer:</strong> This is a system-generated electronic invoice, hence no physical signature is required for the purpose of authentication</p>
        <p className="text-center">Please reserve the invoice copy</p>
      </div>
    </div>
  );
});

ReceiptPreview.displayName = 'ReceiptPreview';

export default ReceiptPreview;