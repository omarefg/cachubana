import { Order, Action } from '../store/interfaces/orders';

const orders = (state: Array<Order> = [], action: Action) => {
  switch (action.type) {
    case '@@ORDERS/ADD_ORDER': {
      return [
        ...state,
        action.payload.orders,
      ];
    }
    default: return state;
  }
};

export default orders;
