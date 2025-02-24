import { useState } from 'react';
import { Plus, Search, FileDown, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

const mockReceipts = [
  {
    id: '1',
    serialNumber: 'REC-001',
    applicantId: 'APP-001',
    mobileNumber: '1234567890',
    amount: 1000,
    discount: 100,
    finalAmount: 900,
    createdAt: new Date().toISOString(),
    items: [
      {
        id: '1',
        description: 'Item 1',
        quantity: 2,
        unitPrice: 500,
        total: 1000
      }
    ]
  },
  // Add more mock receipts as needed
];

export function Receipts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDownloadPDF = (receipt: any) => {
    const doc = new jsPDF();
    
    // Add receipt header
    doc.setFontSize(20);
    doc.text('Receipt', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Serial Number: ${receipt.serialNumber}`, 20, 40);
    doc.text(`Applicant ID: ${receipt.applicantId}`, 20, 50);
    doc.text(`Mobile: ${receipt.mobileNumber}`, 20, 60);
    doc.text(`Date: ${format(new Date(receipt.createdAt), 'MMM dd, yyyy')}`, 20, 70);
    
    // Add items table
    let y = 90;
    doc.text('Description', 20, y);
    doc.text('Qty', 100, y);
    doc.text('Price', 130, y);
    doc.text('Total', 160, y);
    
    y += 10;
    receipt.items.forEach((item: any) => {
      doc.text(item.description, 20, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`$${item.unitPrice}`, 130, y);
      doc.text(`$${item.total}`, 160, y);
      y += 10;
    });
    
    // Add totals
    y += 10;
    doc.text(`Subtotal: $${receipt.amount}`, 130, y);
    y += 10;
    doc.text(`Discount: $${receipt.discount}`, 130, y);
    y += 10;
    doc.text(`Total: $${receipt.finalAmount}`, 130, y);
    
    doc.save(`receipt-${receipt.serialNumber}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/invoices/new')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Invoice
          </button>
          <button
            onClick={() => navigate('/receipts/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Money Receipt
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search receipts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {receipt.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {receipt.applicantId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {receipt.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${receipt.finalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(receipt.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownloadPDF(receipt)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FileDown className="w-5 h-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Printer className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}