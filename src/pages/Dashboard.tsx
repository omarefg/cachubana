import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Container, withTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import Chart from '../components/Chart';
import { State } from '../store';
import { OrdersState } from '../store/orders/types';
import utils from '../utils';

const {
  getOrdersDataForKeys,
  getProducstDataByOrder,
  getOrdersDataByKeyForRegions,
} = utils;

interface DashobardProps {
  orders: OrdersState
  isManager: boolean
  theme: Theme
}

const Dashboard: FunctionComponent<DashobardProps> = (props) => {
  const { orders: { orders: orderRows }, isManager, theme } = props;

  if (!isManager) {
    return <Redirect to="/ordenes" />;
  }

  const regions = [...new Set(orderRows.map((order) => order.region_code))];

  const {
    labels: orderLabels,
    finishedProducts: orderFinishedProducts,
    unfinishedProducts: orderUnfinishedProducts,
  } = getProducstDataByOrder(orderRows);

  const slotsByRegion = getOrdersDataByKeyForRegions(orderRows, 'slot', regions);

  const orderByKeys = getOrdersDataForKeys(orderRows, ['region_code', 'routeId']);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={5}
      >
        {orderByKeys.map(({
          labels, finishedOrders, unfinishedOrders, label,
        }) => (
          <Chart
            xs={6}
            title={`Ordenes por ${label}`}
            option={{
              legend: { data: ['Órdenes listas', 'Órdenes por alistar'] },
              xAxis: { type: 'category', data: labels },
              yAxis: { type: 'value' },
              series: [
                {
                  stack: label,
                  data: finishedOrders,
                  type: 'bar',
                  name: 'Órdenes listas',
                },
                {
                  stack: label,
                  data: unfinishedOrders,
                  type: 'bar',
                  name: 'Órdenes por alistar',
                },
              ],
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: '{b}<br/>{a0}: {c0}%<br/>{a1}: {c1}%<br/>',
              },
              color: [theme.palette.primary.main, theme.palette.secondary.main],
            }}
            key={label}
          />
        ))}
        <Chart
          xs={12}
          option={{
            legend: { data: ['Productos listos', 'Productos por alistar'] },
            xAxis: { type: 'category', data: orderLabels },
            yAxis: { type: 'value' },
            series: [
              {
                stack: 'products',
                data: orderFinishedProducts,
                type: 'bar',
                name: 'Productos listos',
              },
              {
                stack: 'products',
                data: orderUnfinishedProducts,
                type: 'bar',
                name: 'Productos por alistar',
              },
            ],
            tooltip: {
              trigger: 'axis',
              axisPointer: { type: 'shadow' },
            },
            color: [theme.palette.primary.main, theme.palette.secondary.main],
          }}
          title="Productos por orden"
        />
        {slotsByRegion.map(({
          labels, finishedOrders, unfinishedOrders, region,
        }) => (
          <Chart
            xs={6}
            title={`Ordenes por bloque para ${region}`}
            option={{
              legend: { data: ['Órdenes listas', 'Órdenes por alistar'] },
              xAxis: { type: 'category', data: labels },
              yAxis: { type: 'value' },
              series: [
                {
                  stack: region,
                  data: finishedOrders,
                  type: 'bar',
                  name: 'Órdenes listas',
                },
                {
                  stack: region,
                  data: unfinishedOrders,
                  type: 'bar',
                  name: 'Órdenes por alistar',
                },
              ],
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: '{b}<br/>{a0}: {c0}%<br/>{a1}: {c1}%<br/>',
              },
              color: [theme.palette.primary.main, theme.palette.secondary.main],
            }}
            key={region}
          />
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  orders: state.orders,
  isManager: state.auth.isManager,
});


export default connect(mapStateToProps)(withTheme(Dashboard));
