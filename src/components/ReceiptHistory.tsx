import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import type { Receipt } from '../types/receipt';

const ReceiptHistory: React.FC = () => {
  const [receipts, setReceipts] = React.useState<Receipt[]>([]);

  React.useEffect(() => {
    const savedReceipts = JSON.parse(localStorage.getItem('receipts') || '[]');
    setReceipts(savedReceipts);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Receipt History</h2>
      
      {receipts.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-gray-600">No receipts found. Create your first receipt to see it here.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{receipt.organization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">৳ {receipt.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      receipt.status === 'Paid' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {receipt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <FileText className="h-5 w-5" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Printer className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceiptHistory;