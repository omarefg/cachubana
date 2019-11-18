import { Order, OrderAvailableStringKeys, OrderAvailableArrayKeys } from '../store/orders/types';
import { Sort } from '../components/Table';

const getFilteredAndSortedRows = (
  orders: Order[],
  filteredColumns: Map<keyof Order, string[] | string>,
  sortedColumns: Sort,
) => {
  let updatedOrders: Order[] = [...orders];

  if (sortedColumns.orderBy) {
    updatedOrders = updatedOrders.sort((a, b) => {
      const orderKey = sortedColumns.orderBy as keyof Order;
      switch (orderKey) {
        case 'user': {
          if (a[orderKey].name < b[orderKey].name) return sortedColumns.direction === 'asc' ? 1 : -1;
          if (a[orderKey].name > b[orderKey].name) return sortedColumns.direction === 'asc' ? -1 : 1;
          return 0;
        }
        case '_id': {
          const aFinishedProducts = a.products
            .filter((product) => product.finished).length;
          const bFinishedProducts = b.products
            .filter((product) => product.finished).length;
          const aPercentageComleted = Math.round((100 / a.products.length) * aFinishedProducts);
          const bPercentageCompleted = Math.round((100 / b.products.length) * bFinishedProducts);
          if (aPercentageComleted < bPercentageCompleted) return sortedColumns.direction === 'asc' ? 1 : -1;
          if (aPercentageComleted > bPercentageCompleted) return sortedColumns.direction === 'asc' ? -1 : 1;
          return 0;
        }
        default: {
          if (a[orderKey] < b[orderKey]) return sortedColumns.direction === 'asc' ? 1 : -1;
          if (a[orderKey] > b[orderKey]) return sortedColumns.direction === 'asc' ? -1 : 1;
          return 0;
        }
      }
    });
  }
  filteredColumns.forEach((value, key: keyof Order) => {
    if (typeof value === 'object') {
      if (value.length) {
        switch (key) {
          case 'products': {
            updatedOrders = updatedOrders
              .filter((order) => value
                .some((val) => order.products
                  .filter((product) => !product.finished)
                  .map((product) => product.name).includes(val)));
            break;
          }
          default: {
            updatedOrders = updatedOrders
              .filter((order) => value.includes(order[key].toString()));
          }
        }
      }
    } else {
      updatedOrders = updatedOrders.filter((order) => {
        switch (key) {
          case 'products': {
            return null;
          }
          case 'user': {
            return order[key].name.toUpperCase().includes(value.toUpperCase());
          }
          case '_id': {
            const finishedProducts = order.products.filter((product) => product.finished).length;
            const orderPercentage = `${Math.round((100 / order.products.length) * finishedProducts)}%`;
            return orderPercentage.includes(value);
          }
          default: {
            return order[key].toUpperCase().includes(value.toUpperCase());
          }
        }
      });
    }
  });
  return updatedOrders;
};

export const getRegularFilterOpts = (
  orders: Order[],
  key: OrderAvailableStringKeys,
) => [...new Set(orders.map((order) => order[key]))];

export const getProductsFilterOpts = (
  orders: Order[],
  key: OrderAvailableArrayKeys,
) => {
  const productsFilterOpts: string[] = [];
  orders
    .map((order) => order[key]
      .filter((product) => !product.finished))
    .map((products) => products.map((product) => product.name))
    .forEach((productsArray: string[]) => productsArray
      .forEach((product: string) => productsFilterOpts.push(product)));

  return [...new Set(productsFilterOpts)];
};

export default getFilteredAndSortedRows;
