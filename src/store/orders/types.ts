export const ORDERS_ADD_ORDER = '@@ORDERS/ADD_ORDER';
export const ORDERS_SET_SELECTED_ORDER = '@@ORDERS/SET_SELECTED_ORDER';
export const ORDERS_SET_PRODUCT_IS_FINISHED = '@@ORDERS/SET_PRODUCT_IS_FINISHED';
export const ORDERS_SAVE_FINISHED_PRODUCTS = '@@ORDERS/SAVE_FINISHED_PRODUCTS';

export interface User {
  name: string
}

export interface Product {
  name: string,
  price: number,
  quantity: number,
  total: number,
  _id: string,
  finished?:Boolean
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


interface SetProductIsFinished {
  type: typeof ORDERS_SET_PRODUCT_IS_FINISHED,
  payload: string
}

interface saveFinishedProducts {
  type: typeof ORDERS_SAVE_FINISHED_PRODUCTS
}

export type OrderActionsType = (
  AddOrder |
  SetSelectedOrder |
  SetProductIsFinished |
  saveFinishedProducts
);

export interface OrdersState {
  orders: Array<Order>,
  selectedOrder: Order | null
}
