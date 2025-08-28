import { useQuery } from '@tanstack/react-query';
import { Order } from '@/types';
import { Platform } from 'react-native';
import { mockOrders } from './mockData';
import env from '@/utils/env';

// Get API URL from environment configuration
// Falls back to local development URLs if not defined
const API_URL = env.apiUrl || (Platform.OS === 'web' 
  ? 'http://localhost:3001' 
  : 'http://127.0.0.1:3001');

// Fetch function with fallback to mock data
const fetchWithFallback = async (url: string) => {
  try {
    const response = await fetch(`${API_URL}${url}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.log('API request failed, using mock data', error);
    
    if (url === '/orders') {
      return mockOrders;
    } else if (url.startsWith('/orders/')) {
      const orderId = parseInt(url.split('/').pop() || '', 10);
      const order = mockOrders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    }
    
    throw new Error('Not found');
  }
};

// Query hooks
export const useGetOrders = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () => fetchWithFallback('/orders'),
  });
};

export const useGetOrderById = (orderId: number) => {
  return useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: () => fetchWithFallback(`/orders/${orderId}`),
    enabled: !!orderId,
  });
};
