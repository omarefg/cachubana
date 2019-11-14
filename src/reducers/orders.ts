interface Payload {
  orders: object
}

interface Action {
  type: string,
  payload: Payload
}

const orders = (state: Array<Object> = [], action: Action) => {
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
