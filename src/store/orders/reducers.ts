import {
  ORDERS_ADD_ORDER, ORDERS_SET_SELECTED_ORDER, OrderActionsType, OrdersState,
} from './types';

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
};

const orders = (state = initialState, action: OrderActionsType) => {
  switch (action.type) {
    case ORDERS_ADD_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    }
    case ORDERS_SET_SELECTED_ORDER: {
      return {
        ...state,
        selectedOrder: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default orders;
