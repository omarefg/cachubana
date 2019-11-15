export const ORDERS_ADD_ORDER = '@@ORDERS/ADD_ORDER';
export const ORDERS_SET_SELECTED_ORDER = '@@ORDERS/SET_SELECTED_ORDER';

export interface User {
  name: string
}

export interface Product {
  name: string,
  price: number,
  quantity: number,
  total: number,
  _id: string
}

export interface Order {
  products: Array<Product>,
  region_code: string,
  routeId: string,
  slot: string,
  user: User,
  _id: string
}

interface AddOrder {
  type: typeof ORDERS_ADD_ORDER
  payload: Order
}

interface SetSelectedOrder {
  type: typeof ORDERS_SET_SELECTED_ORDER,
  payload: Order | null
}

export type OrderActionsType = AddOrder | SetSelectedOrder;

export interface OrdersState {
  orders: Array<Order>,
  selectedOrder: Order | null
}
