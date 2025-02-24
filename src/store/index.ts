import { configureStore } from '@reduxjs/toolkit';
import moneyReceiptReducer from './moneyReceiptSlice';
import invoiceReducer from './invoiceSlice';

export const store = configureStore({
  reducer: {
    moneyReceipts: moneyReceiptReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;