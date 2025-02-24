import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, Trash, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/invoiceSlice';
import type { Invoice, InvoiceItem } from '../types';

export function NewInvoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState<Invoice>({
    id: crypto.randomUUID(),
    invoiceNumber: '33',
    date: new Date().toISOString().split('T')[0],
    customerName: 'ATC',
    customerEmail: 'abdulwahab22400@gmail.com',
    customerAddress: '0123456789',
    items: [{
      id: crypto.randomUUID(),
      description: 'App development\nmust be well developed',
      quantity: 1,
      unitPrice: 1000,
      total: 990
    }],
    subtotal: 1000,
    tax: 50,
    vat: 50,
    discount: 110,
    total: 1100,
    status: 'pending'
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add ATC logo and header
    doc.setFontSize(24);
    doc.text('ATC', 20, 20);
    doc.setFontSize(10);
    doc.text('TECH Limited', 20, 25);

    // Company header
    doc.setFontSize(16);
    doc.text('ATC Tech Limited', 105, 20, { align: 'center' });
    
    // Address and contact details
    doc.setFontSize(10);
    doc.text('Rajshahi Office: Silicon Tower, Level # 7, Suit # A, Hi-Tech Park, Rajshahi, Bangladesh', 105, 30, { align: 'center' });
    doc.text('WEB: www.atctechltd.com, Email: academy.atc.info@gmail.com,', 105, 35, { align: 'center' });
    doc.text('TELE: 02588878917-18, Mobile: +8801731805079 (WhatsApp)', 105, 40, { align: 'center' });

    // Invoice title
    doc.setFontSize(14);
    doc.text('Invoice', 105, 50, { align: 'center' });

    // Customer and Invoice Details
    doc.setFontSize(12);
    doc.text('Customer Details:', 20, 70);
    doc.text(`${invoice.customerName}`, 20, 80);
    doc.text(`${invoice.customerAddress}`, 20, 85);
    doc.text(`${invoice.customerEmail}`, 20, 90);

    doc.text(`Invoice No.: ${invoice.invoiceNumber}`, 150, 70);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 150, 75);
    doc.text('Ref:', 150, 80);
    doc.text('Mridul', 150, 85);
    doc.text('0123456789', 150, 90);
    doc.text('Executive', 150, 95);

    // Table headers
    doc.setFontSize(12);
    const tableTop = 110;
    doc.text('SL.', 20, tableTop);
    doc.text('Service Name & Details', 40, tableTop);
    doc.text('Unit', 130, tableTop);
    doc.text('Price', 150, tableTop);
    doc.text('Total', 180, tableTop);

    // Table content
    let y = tableTop + 10;
    invoice.items.forEach((item, index) => {
      doc.text((index + 1).toString(), 20, y);
      doc.text(item.description, 40, y);
      doc.text(item.quantity.toString(), 130, y);
      doc.text(`BDT ${item.unitPrice}`, 150, y);
      doc.text(`BDT ${item.total}`, 180, y);
      y += 10;
    });

    // Totals
    y += 20;
    doc.text(`Subtotal:`, 150, y);
    doc.text(`BDT ${invoice.subtotal}`, 180, y);
    
    y += 10;
    doc.text(`TAX (5%):`, 150, y);
    doc.text(`${invoice.tax}`, 180, y);
    
    y += 10;
    doc.text(`VAT (5%):`, 150, y);
    doc.text(`${invoice.vat}`, 180, y);
    
    y += 10;
    doc.text(`Gross Total:`, 150, y);
    doc.text(`BDT ${invoice.total}`, 180, y);
    
    y += 10;
    doc.text(`Discount (10%):`, 150, y);
    doc.text(`${invoice.discount}`, 180, y);
    
    y += 10;
    doc.text(`Payable Amount:`, 150, y);
    doc.text(`BDT ${invoice.items[0].total}`, 180, y);

    // Disclaimer
    y += 30;
    doc.setFontSize(10);
    doc.text('Disclaimer:- This is a system-generated electronic invoice, hence no physical signature is required for the purpose of authentication', 20, y);
    
    y += 20;
    doc.text('Please reserve the invoice copy', 105, y, { align: 'center' });

    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addInvoice(invoice));
    generatePDF();
    toast.success('Invoice generated successfully!');
    navigate('/invoices');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/invoices')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">New Invoice</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={e => setInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={invoice.date}
                onChange={e => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                value={invoice.customerName}
                onChange={e => setInvoice(prev => ({ ...prev, customerName: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Email</label>
              <input
                type="email"
                value={invoice.customerEmail}
                onChange={e => setInvoice(prev => ({ ...prev, customerEmail: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Phone</label>
              <input
                type="text"
                value={invoice.customerAddress}
                onChange={e => setInvoice(prev => ({ ...prev, customerAddress: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Services</h2>
          </div>

          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={item.description}
                    onChange={e => {
                      const newItems = [...invoice.items];
                      newItems[index] = { ...item, description: e.target.value };
                      setInvoice(prev => ({ ...prev, items: newItems }));
                    }}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => {
                      const newItems = [...invoice.items];
                      newItems[index] = { 
                        ...item, 
                        quantity: parseInt(e.target.value),
                        total: parseInt(e.target.value) * item.unitPrice
                      };
                      setInvoice(prev => ({ ...prev, items: newItems }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={e => {
                      const newItems = [...invoice.items];
                      newItems[index] = { 
                        ...item, 
                        unitPrice: parseInt(e.target.value),
                        total: item.quantity * parseInt(e.target.value)
                      };
                      setInvoice(prev => ({ ...prev, items: newItems }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Total</label>
                  <input
                    type="number"
                    value={item.total}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-end space-y-2">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="text-gray-900">BDT {invoice.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">TAX (5%):</span>
                  <span className="text-gray-900">{invoice.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">VAT (5%):</span>
                  <span className="text-gray-900">{invoice.vat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Total:</span>
                  <span className="text-gray-900">BDT {invoice.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount (10%):</span>
                  <span className="text-gray-900">{invoice.discount}</span>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900">Payable Amount:</span>
                  <span className="text-gray-900">BDT {invoice.items[0].total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/invoices')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Generate Invoice
          </button>
        </div>
      </form>
    </div>
  );
}