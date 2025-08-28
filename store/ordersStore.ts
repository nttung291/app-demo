import { create } from 'zustand';
import { Order } from '@/types';

interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
  statusFilter: string | null;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string | null) => void;
  clearSelectedOrder: () => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  // State
  orders: [],
  selectedOrder: null,
  status: 'idle',
  error: null,
  searchTerm: '',
  statusFilter: null,
  
  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  clearSelectedOrder: () => set({ selectedOrder: null }),
}));
