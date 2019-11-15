import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import data from '../db/orders.json';
import orders from './orders/reducers';
import { ORDERS_ADD_ORDER, OrdersState } from './orders/types';

export interface State {
  orders: OrdersState
}

const reducer = combineReducers({
  orders,
});

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

/* mock of realtime action */
let timerId : ReturnType<typeof setTimeout> | null = null;
let index = 0;

function getRandom(min = 1, max = 10) {
  let result = Math.random();
  result = result * (max - min + 1) + min;
  result = Math.floor(result);
  return result * 1000;
}

function startEvent(delay : number) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    store.dispatch({
      type: ORDERS_ADD_ORDER,
      payload: data[index],
    });
    if (index < (data.length - 1)) {
      index += 1;
      return startEvent(getRandom());
    }
  }, delay);
}

startEvent(getRandom());

export default store;
