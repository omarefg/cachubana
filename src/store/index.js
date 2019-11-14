import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers';
import data from '../db/orders.json';

const store = createStore(
  reducers,
  applyMiddleware(logger),
);

/* mock of realtime action */
let timerId = null;
let index = 0;

function getRandom(min = 1, max = 10) {
  let result = Math.random();
  result = result * (max - min + 1) + min;
  result = Math.floor(result);
  return result * 1000;
}

function startEvent(delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    store.dispatch({
      type: '@@ORDERS/ADD_ORDER',
      payload: {
        orders: data[index],
      },
    });
    if (index < (data.length - 1)) {
      index += 1;
      return startEvent(getRandom());
    }
  }, delay);
}

startEvent(getRandom());

export default store;
