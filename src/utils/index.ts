import { Order, Product } from '../store/orders/types';

type Criteria = 'finished' | 'unfinished';
type OrderAvailableKeys = 'region_code' | '_id' | 'routeId' | 'slot';

const getTotalOrdersByCriteria = (
  orders: Array<Order>,
  key: OrderAvailableKeys,
  criteria: Criteria,
  label: string,
  region?: string,
) => orders.filter((row: Order) => {
  const finishedProducts = row.products.filter((product: Product) => product.finished).length;
  const productsLength = row.products.length;
  const orderByCriteria = criteria === 'finished' ? finishedProducts === productsLength : finishedProducts !== productsLength;
  if (region) {
    return row[key] === label && orderByCriteria && row.region_code === region;
  }
  return row[key] === label && orderByCriteria;
}).length;

const getOrdersDataByKey = (
  orders: Array<Order>,
  key: OrderAvailableKeys,
  region?: string,
) => {
  const finishedOrders: Array<number> = [];
  const unfinishedOrders: Array<number> = [];
  const labels: Array<string> = [...new Set(orders.map((order: Order) => order[key]))];

  labels.forEach((label: string) => {
    const finishedOrdersByLabel = getTotalOrdersByCriteria(orders, key, 'finished', label, region);
    const unfinishedOrdersByLabel = getTotalOrdersByCriteria(orders, key, 'unfinished', label, region);
    const totalOrders = finishedOrdersByLabel + unfinishedOrdersByLabel;
    if (totalOrders) {
      finishedOrders.push(Math.round((finishedOrdersByLabel / totalOrders) * 100));
      unfinishedOrders.push(Math.round((unfinishedOrdersByLabel / totalOrders) * 100));
    }
  });
  return { labels, finishedOrders, unfinishedOrders };
};

const getProducstDataByOrder = (orders: Array<Order>) => {
  const labels: Array<string> = [];
  const finishedProducts: Array<number> = [];
  const unfinishedProducts: Array<number> = [];

  orders.forEach((order: Order) => {
    const label = `${order.user.name} | ${order.region_code}`;
    const finishedProduct = order.products.filter((product: Product) => product.finished).length;
    const unfinishedProduct = order.products.filter((product: Product) => !product.finished).length;
    labels.push(label);
    finishedProducts.push(finishedProduct);
    unfinishedProducts.push(unfinishedProduct);
  });

  return { labels, finishedProducts, unfinishedProducts };
};

const getOrdersDataByKeyForRegions = (
  orders: Array<Order>,
  key: OrderAvailableKeys,
  regions: Array<string>,
) => {
  interface Data {
    labels: Array<string>,
    finishedOrders: Array<number>,
    unfinishedOrders: Array<number>,
    region: string
  }
  const datas: Array<Data> = [];
  regions.forEach((region: string) => {
    datas.push({ ...getOrdersDataByKey(orders, key, region), region });
  });
  return datas;
};

const getOrdersDataForKeys = (
  orders: Array<Order>,
  keys: Array<OrderAvailableKeys>,
) => {
  interface Data {
    labels: Array<string>,
    finishedOrders: Array<number>,
    unfinishedOrders: Array<number>,
    label: string
  }
  const datas: Array<Data> = [];
  keys.forEach((key: OrderAvailableKeys) => {
    let label = '';
    switch (key) {
      case 'region_code': {
        label = 'región';
        break;
      }
      case 'routeId': {
        label = 'ruta';
        break;
      }
      case 'slot': {
        label = 'espacio';
        break;
      }
      default: break;
    }
    datas.push({ ...getOrdersDataByKey(orders, key), label });
  });
  return datas;
};


export default {
  getProducstDataByOrder,
  getOrdersDataByKeyForRegions,
  getOrdersDataForKeys,
};
