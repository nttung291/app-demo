import { Order } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';
import { mockOrders } from './mockData';

// Define API base URL - use json-server running locally
// Use localhost for web and 127.0.0.1 for iOS/Android simulators
const API_URL = Platform.OS === 'web' 
  ? 'http://localhost:3001' 
  : 'http://127.0.0.1:3001';

// Create a custom base query with fallback to mock data
const baseQueryWithFallback = async (args: any, api: any, extraOptions: any) => {
  try {
    const result = await fetchBaseQuery({ baseUrl: API_URL })(args, api, extraOptions);
    return result;
  } catch (error) {
    console.log('API request failed, using mock data', error);
    
    if (args.url === '/orders') {
      return { data: mockOrders };
    } else if (args.url.startsWith('/orders/')) {
      const orderId = parseInt(args.url.split('/').pop(), 10);
      const order = mockOrders.find(o => o.id === orderId);
      return order ? { data: order } : { error: 'Order not found' };
    }
    
    return { error: 'Not found' };
  }
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithFallback,
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
    }),
    getOrderById: builder.query<Order, number>({
      query: (orderId) => `/orders/${orderId}`,
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
