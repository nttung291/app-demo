export interface OrderLine {
	product_id: number;
	quantity: number;
	unit_price: number;
}
  
export interface Order {
	id: number;
	customer_id: number;
	order_date: string;
	status: string;
	lines?: OrderLine[];
}