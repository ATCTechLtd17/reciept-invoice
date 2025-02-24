import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MoneyReceipt } from '../types';

interface MoneyReceiptState {
  receipts: MoneyReceipt[];
  loading: boolean;
  error: string | null;
}

const initialState: MoneyReceiptState = {
  receipts: [],
  loading: false,
  error: null,
};

const moneyReceiptSlice = createSlice({
  name: 'moneyReceipts',
  initialState,
  reducers: {
    addMoneyReceipt: (state, action: PayloadAction<MoneyReceipt>) => {
      state.receipts.push(action.payload);
    },
    setMoneyReceipts: (state, action: PayloadAction<MoneyReceipt[]>) => {
      state.receipts = action.payload;
    },
  },
});

export const { addMoneyReceipt, setMoneyReceipts } = moneyReceiptSlice.actions;
export default moneyReceiptSlice.reducer;