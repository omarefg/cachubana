import React, {
  FunctionComponent, useState, ChangeEvent as ReactChangeEvent,
} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withTheme } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';
import Chart, { Formatter } from '../components/Chart';
import Select, { ChangeEvent } from '../components/Select';
import { State } from '../store';
import { Order } from '../store/orders/types';
import getChartsData, { ChartData } from '../utils/dashboard';

interface DashobardProps {
  orders: Order[]
  isManager: boolean
  theme: Theme
}

const FINISHED_MESSAGE = 'Alistado';
const NON_FINISHED_MESSAGE = 'Por alistar';
const CHARTS_TYPE = 'bar';

const defaultSelectedRegions: string[] = [];

const Dashboard: FunctionComponent<DashobardProps> = (props) => {
  const { orders, isManager, theme } = props;
  const [selectedRegions, setSelectedRegions] = useState(defaultSelectedRegions);

  if (!isManager) { return <Redirect to="/ordenes" />; }

  const regions: string[] = [...new Set(orders.map((order) => order.region_code))];
  const chartsData: ChartData[] = getChartsData(orders, selectedRegions, regions);

  const setSelectedRegionsHandler = (event: ReactChangeEvent<ChangeEvent>) => {
    const { value } = event.target;
    if (typeof value === 'string') {
      let updatedSelectedRegions: string[] = [...selectedRegions];
      if (selectedRegions.includes(value)) {
        updatedSelectedRegions = updatedSelectedRegions.filter((region) => region !== value);
      } else {
        updatedSelectedRegions.push(value);
      }
      setSelectedRegions(updatedSelectedRegions);
    }
  };

  return (
    <Container maxWidth="lg">
      <div>
        <Select
          label="Filtrar regiones"
          labelId="dashboard-region"
          options={regions}
          value={selectedRegions}
          onChange={setSelectedRegionsHandler}
        />
      </div>
      <Grid
        container
        spacing={5}
      >
        {chartsData.map(({
          labels, finished, unfinished, label,
        }) => (
          <Chart
            xs={6}
            title={label}
            option={{
              legend: { data: [FINISHED_MESSAGE, NON_FINISHED_MESSAGE] },
              xAxis: { type: 'category', data: labels },
              yAxis: { type: 'value' },
              series: [
                {
                  stack: label,
                  data: finished,
                  type: CHARTS_TYPE,
                  name: FINISHED_MESSAGE,
                },
                {
                  stack: label,
                  data: unfinished,
                  type: CHARTS_TYPE,
                  name: NON_FINISHED_MESSAGE,
                },
              ],
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params: Formatter[]) => {
                  const [serie] = params;
                  const { name } = serie;
                  let panel = `${name}<br/>`;
                  params.forEach(({ marker, seriesName, value }) => {
                    panel += `${marker} ${seriesName}: ${value}% <br/>`;
                  });
                  return panel;
                },
              },
              color: [theme.palette.primary.main, theme.palette.secondary.main],
            }}
            key={label}
          />
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  orders: state.orders.orders,
  isManager: state.auth.isManager,
});


export default connect(mapStateToProps)(withTheme(Dashboard));
