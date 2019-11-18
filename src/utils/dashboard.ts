import { Order, OrderAvailableKeys, OrderAvailableStringKeys } from '../store/orders/types';

type Criteria = 'finished' | 'unfinished';


export interface ChartData {
  labels: string[],
  finished: number[],
  unfinished: number[],
  label?: string
}

const getTotalOrdersByCriteria = (
  orders: Order[],
  key: OrderAvailableKeys,
  criteria: Criteria,
  label: string,
  regions: string[],
) : number => orders.filter((order) => {
  const finishedProducts: number = order.products.filter((product) => product.finished).length;
  const productsLength: number = order.products.length;
  const orderByCriteria: boolean = criteria === 'finished'
    ? finishedProducts === productsLength
    : finishedProducts !== productsLength;

  if (regions.includes(order.region_code)) {
    return order[key] === label && orderByCriteria;
  }

  return false;
}).length;

const getOrdersData = (
  orders: Order[],
  key: OrderAvailableStringKeys,
  regions: string[],
): ChartData => {
  const finished: number[] = [];
  const unfinished: number[] = [];
  const filteredOrders: Order[] = orders.filter((order) => regions.includes(order.region_code));
  const labels: string[] = [...new Set(filteredOrders.map((order) => order[key]))];

  labels.forEach((label: string) => {
    const finishedOrdersByLabel: number = getTotalOrdersByCriteria(orders, key, 'finished', label, regions);
    const unfinishedOrdersByLabel: number = getTotalOrdersByCriteria(orders, key, 'unfinished', label, regions);
    const totalOrders: number = finishedOrdersByLabel + unfinishedOrdersByLabel;
    if (totalOrders) {
      finished.push(Math.round((finishedOrdersByLabel / totalOrders) * 100));
      unfinished.push(Math.round((unfinishedOrdersByLabel / totalOrders) * 100));
    }
  });
  return { labels, finished, unfinished };
};

const getProducstData = (
  orders: Order[],
  regions: string[],
): ChartData => {
  const labels: string[] = [];
  const finished: number[] = [];
  const unfinished: number[] = [];

  orders.forEach((order) => {
    if (regions.includes(order.region_code)) {
      const label: string = `${order.user.name} | ${order.region_code}`;
      const finishedProduct: number = order.products.filter((product) => product.finished).length;
      const unfinishedProduct: number = order.products
        .filter((product) => !product.finished).length;
      const totalProducts: number = finishedProduct + unfinishedProduct;
      labels.push(label);
      if (totalProducts) {
        finished.push(Math.round((finishedProduct / totalProducts) * 100));
        unfinished.push(Math.round((unfinishedProduct / totalProducts) * 100));
      }
    }
  });

  return { labels, finished, unfinished };
};

const getChartsData = (
  orders: Order[],
  actualRegions: string[],
  totalRegions: string[],
): ChartData[] => {
  const regionsToUse: string[] = actualRegions.length ? actualRegions : totalRegions;
  const dashboardsData: OrderAvailableKeys[] = ['region_code', 'routeId', 'products', 'slot'];
  const chartData: ChartData[] = [];
  dashboardsData.forEach((dashboard) => {
    let label = '';
    switch (dashboard) {
      case 'region_code': {
        label = 'Órdenes por región';
        chartData.push({ ...getOrdersData(orders, dashboard, regionsToUse), label });
        break;
      }
      case 'routeId': {
        label = 'Órdenes por ruta';
        chartData.push({ ...getOrdersData(orders, dashboard, regionsToUse), label });
        break;
      }
      case 'slot': {
        label = 'Órdenes por slot';
        chartData.push({ ...getOrdersData(orders, dashboard, regionsToUse), label });
        break;
      }
      case 'products': {
        label = 'Productos por orden';
        chartData.push({ ...getProducstData(orders, regionsToUse), label });
        break;
      }
      default: break;
    }
  });

  return chartData;
};


export default getChartsData;
