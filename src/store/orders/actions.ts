import { ORDERS_SET_SELECTED_ORDER, Order, OrderActionsType } from './types';

const setSelectedOrder = (payload: Order | null) : OrderActionsType => ({
  type: ORDERS_SET_SELECTED_ORDER,
  payload,
});

export default {
  setSelectedOrder,
};
