import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import type { MoneyReceipt } from '../types';

export function NewMoneyReceipt() {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<MoneyReceipt>({
    serialNumber: '39',
    date: new Date().toISOString().split('T')[0],
    name: '',
    applicantId: '39',
    mobile: '',
    course: '',
    fees: 0,
    feesAfterDiscount: 0,
    paymentMethod: 'Full',
    paidAmount: 0,
    referrerName: '',
    referrerContact: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReceipt(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
    toast.success('Receipt generated successfully!');
    navigate('/receipts');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(16);
    doc.text('ATC SOFT ACADEMY', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('Rajshahi Office: Silicon Tower, Level # 7, Suit # A, Hi-Tech Park, Rajshahi, Bangladesh', 105, 30, { align: 'center' });
    doc.text('TECH Limited', 105, 35, { align: 'center' });
    doc.text('WEB: www.atctechltd.com, Email: academy.atc.info@gmail.com', 105, 40, { align: 'center' });
    doc.text('TELE: 02588878917-18, Mobile: +8801731805079 (WhatsApp)', 105, 45, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Money Receipt', 105, 55, { align: 'center' });
    
    // Receipt Details
    doc.setFontSize(12);
    doc.text(`M.R. Serial No.: ${receipt.serialNumber}`, 20, 70);
    doc.text(`Date: ${new Date(receipt.date).toLocaleDateString()}`, 20, 80);
    
    doc.text(`Name: ${receipt.name}`, 20, 95);
    doc.text(`Applicant ID: ${receipt.applicantId}`, 20, 105);
    doc.text(`Mobile: ${receipt.mobile}`, 20, 115);
    doc.text(`Course: ${receipt.course}`, 20, 125);
    
    doc.text(`Fees: BDT ${receipt.fees.toLocaleString()}`, 20, 140);
    doc.text(`Fees (After discount): BDT ${receipt.feesAfterDiscount.toLocaleString()}`, 20, 150);
    doc.text(`Payment Method: ${receipt.paymentMethod}`, 20, 160);
    doc.text(`Paid Amount: BDT ${receipt.paidAmount.toLocaleString()}`, 20, 170);
    
    doc.text(`Referrer Name: ${receipt.referrerName}`, 20, 185);
    doc.text(`Referrer Contact: ${receipt.referrerContact}`, 20, 195);
    
    // Disclaimer
    doc.setFontSize(10);
    doc.text('Disclaimer: This is a system-generated electronic receipt, hence no physical', 20, 220);
    doc.text('signature is required for the purpose of authentication.', 20, 225);
    
    doc.text('Please reserve the money receipt copy.', 20, 235);
    
    doc.save(`money-receipt-${receipt.serialNumber}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/receipts')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">New Money Receipt</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">M.R. Serial No.</label>
            <input
              type="text"
              name="serialNumber"
              value={receipt.serialNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={receipt.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={receipt.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Applicant ID</label>
            <input
              type="text"
              name="applicantId"
              value={receipt.applicantId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={receipt.mobile}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={receipt.course}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fees</label>
            <input
              type="number"
              name="fees"
              value={receipt.fees}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fees (After discount)</label>
            <input
              type="number"
              name="feesAfterDiscount"
              value={receipt.feesAfterDiscount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={receipt.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Full">Full</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
            <input
              type="number"
              name="paidAmount"
              value={receipt.paidAmount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Referrer Name</label>
            <input
              type="text"
              name="referrerName"
              value={receipt.referrerName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Referrer Contact</label>
            <input
              type="text"
              name="referrerContact"
              value={receipt.referrerContact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/receipts')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Generate Receipt
          </button>
        </div>
      </form>
    </div>
  );
}