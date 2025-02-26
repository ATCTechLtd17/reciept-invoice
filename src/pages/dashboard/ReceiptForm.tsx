import React, { useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2,  Eye, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import type { ReceiptFormData } from '../../types/receipt';
import { receiptFormSchema } from '../../types/receipt';
import ReceiptPreview from './ReceiptPreview';

const ReceiptForm: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const { register, control, watch, setValue, handleSubmit, formState: { errors } } = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: {
      division: '',
      organization: '',
      contact: '',
      email: '',
      address: '',
      services: [{ id: '1', name: '', unit: 0, price: 0 }],
      tax: 0,
      vat: 0,
      discount: 0,
      subtotal: 0,
      grossTotal: 0,
      payableAmount: 0,
      depositAmount: 0,
      dueAmount: 0,
      total: 0
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services'
  });

  const watchServices = watch('services');
  const watchTax = watch('tax');
  const watchVAT = watch('vat');
  const watchDiscount = watch('discount');
  const watchDepositAmount = watch('depositAmount');
  const formData = watch();

  React.useEffect(() => {
    // Calculate subtotal
    const subtotal = watchServices.reduce((acc, service) => {
      return acc + (service.unit * service.price);
    }, 0);
    setValue('subtotal', subtotal);

    // Calculate tax and VAT amounts
    const taxAmount = (subtotal * watchTax) / 100;
    const vatAmount = (subtotal * watchVAT) / 100;
    
    // Calculate gross total (Subtotal + Tax + VAT)
    const grossTotal = subtotal + taxAmount + vatAmount;
    setValue('grossTotal', grossTotal);
    
    // Calculate discount amount
    const discountAmount = (subtotal * watchDiscount) / 100;
    
    // Calculate payable amount (Gross Total - Discount)
    const payableAmount = grossTotal - discountAmount;
    setValue('payableAmount', payableAmount);
    
    // Calculate due amount (Payable Amount - Deposit Amount)
    const dueAmount = payableAmount - (watchDepositAmount || 0);
    setValue('dueAmount', dueAmount);
    
    // For backward compatibility
    setValue('total', payableAmount);
  }, [watchServices, watchTax, watchVAT, watchDiscount, watchDepositAmount, setValue]);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
  });

  const onSubmit = (data: ReceiptFormData) => {
    const receipt = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending' as const
    };

    // Save to local storage
    const savedReceipts = JSON.parse(localStorage.getItem('receipts') || '[]');
    localStorage.setItem('receipts', JSON.stringify([...savedReceipts, receipt]));

    // Show preview
    setShowPreview(true);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Money Receipt</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Division</label>
              <select
                {...register('division')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.division ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Division</option>
                <option value="Academy">Academy</option>
                <option value="Tech">Tech</option>
              </select>
              {errors.division && (
                <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization</label>
              <input
                type="text"
                {...register('organization')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.organization ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="text"
                {...register('contact')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.contact ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              {...register('address')}
              rows={3}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.address ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Services</h3>
              <button
                type="button"
                onClick={() => append({ id: Date.now().toString(), name: '', unit: 0, price: 0 })}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    {...register(`services.${index}.name`)}
                    placeholder="Service Name"
                    className={`block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.services?.[index]?.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.services?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.services[index]?.name?.message}</p>
                  )}
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    {...register(`services.${index}.unit`, { valueAsNumber: true })}
                    placeholder="Units"
                    className={`block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.services?.[index]?.unit ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.services?.[index]?.unit && (
                    <p className="mt-1 text-sm text-red-600">{errors.services[index]?.unit?.message}</p>
                  )}
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    {...register(`services.${index}.price`, { valueAsNumber: true })}
                    placeholder="Price"
                    className={`block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.services?.[index]?.price ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.services?.[index]?.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.services[index]?.price?.message}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            {errors.services && (
              <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax (%)</label>
              <input
                type="number"
                {...register('tax', { valueAsNumber: true })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.tax ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.tax && (
                <p className="mt-1 text-sm text-red-600">{errors.tax.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">VAT (%)</label>
              <input
                type="number"
                {...register('vat', { valueAsNumber: true })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.vat ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.vat && (
                <p className="mt-1 text-sm text-red-600">{errors.vat.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                type="number"
                {...register('discount', { valueAsNumber: true })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.discount ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.discount && (
                <p className="mt-1 text-sm text-red-600">{errors.discount.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Deposit Amount</label>
              <input
                type="number"
                {...register('depositAmount', { valueAsNumber: true })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  errors.depositAmount ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.depositAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.depositAmount.message}</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm font-medium text-gray-700">
                Subtotal:
                <span className="ml-2 font-bold">৳ {watch('subtotal').toLocaleString()}</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                Gross Total (Subtotal + Tax + VAT):
                <span className="ml-2 font-bold">৳ {watch('grossTotal').toLocaleString()}</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                Payable Amount (Gross Total - Discount):
                <span className="ml-2 font-bold">৳ {watch('payableAmount').toLocaleString()}</span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                Due Amount (Payable - Deposit):
                <span className="ml-2 font-bold">৳ {watch('dueAmount').toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-2xl font-bold text-gray-900">
              Total Payable: ৳ {watch('payableAmount').toLocaleString()}
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Receipt
              </button>
            </div>
          </div>
        </form>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Receipt Preview</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-6">
              <ReceiptPreview
                ref={previewRef}
                receipt={{
                  ...formData,
                  id: Date.now().toString(),
                  date: new Date().toISOString().split('T')[0],
                  status: 'Pending'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceiptForm;