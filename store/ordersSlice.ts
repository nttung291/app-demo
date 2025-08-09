import { Order } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
  statusFilter: string | null;
}

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  status: 'idle',
  error: null,
  searchTerm: '',
  statusFilter: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string | null>) {
      state.statusFilter = action.payload;
    },
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    }
  },
});

export const { setSearchTerm, setStatusFilter, clearSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
