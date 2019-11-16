import {
  ORDERS_SET_SELECTED_ORDER,
  ORDERS_SET_PRODUCT_IS_FINISHED,
  ORDERS_SAVE_FINISHED_PRODUCTS,
  OrderActionsType,
  Order,
} from './types';

const setSelectedOrder = (payload: Order | null) : OrderActionsType => ({
  type: ORDERS_SET_SELECTED_ORDER,
  payload,
});

const setProductIsFinished = (payload: string) : OrderActionsType => ({
  type: ORDERS_SET_PRODUCT_IS_FINISHED,
  payload,
});

const saveFinishedProducts = () : OrderActionsType => ({
  type: ORDERS_SAVE_FINISHED_PRODUCTS,
});

export default {
  setSelectedOrder,
  setProductIsFinished,
  saveFinishedProducts,
};
