import {
  ORDERS_ADD_ORDER,
  ORDERS_SET_SELECTED_ORDER,
  ORDERS_SET_PRODUCT_IS_FINISHED,
  ORDERS_SAVE_FINISHED_PRODUCTS,
  OrderActionsType,
  OrdersState,
  Product,
  Order,
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
    case ORDERS_SET_PRODUCT_IS_FINISHED: {
      const id = action.payload;
      const { selectedOrder } = state;
      if (selectedOrder) {
        const toggleProduct = (product: Product) => {
          const updatedProduct = { ...product };
          if (updatedProduct._id === id) {
            updatedProduct.finished = !updatedProduct.finished;
          }
          return updatedProduct;
        };
        const selectedOrderUpdated = { ...selectedOrder };
        selectedOrderUpdated.products = selectedOrderUpdated.products.map(toggleProduct);
        return {
          ...state,
          selectedOrder: selectedOrderUpdated,
        };
      }
      return {
        ...state,
      };
    }
    case ORDERS_SAVE_FINISHED_PRODUCTS: {
      const { selectedOrder, orders: orderRows } = state;
      if (selectedOrder) {
        const updateOrder = (order: Order) => {
          let updatedOrder = { ...order };
          if (updatedOrder._id === selectedOrder._id) {
            updatedOrder = selectedOrder;
          }
          return updatedOrder;
        };
        const updatedOrders = orderRows.map(updateOrder);
        return {
          ...state,
          orders: updatedOrders,
          selectedOrder: null,
        };
      }
      return {
        ...state,
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
