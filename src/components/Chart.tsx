import React, { FunctionComponent } from 'react';
import Echart from 'echarts-for-react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { User, Product } from '../store/orders/types';

import useStyles from '../styles/components/Chart';

export interface Formatter {
  seriesType: string,
  seriesIndex: number,
  seriesName: string,
  name: string,
  dataIndex: number,
  data: Object,
  value: number | number[],
  dimensionNames: string[],
  dimensionIndex: number,
  color: string,
  percent: number,
  marker: string
}
interface XAxis {
  type: string,
  data?: string[] | User[] | Product[]
}

interface YAxis {
  type: string,
  data?: string[] | User[] | Product[]
}

interface Serie {
  stack?: string,
  data: number[],
  type: string,
  name: string
}

interface AxisPointer {
  type: string,
}

interface Tooltip {
  trigger: string,
  axisPointer: AxisPointer,
  formatter?: string | Function
}

interface Legend {
  data: string[]
}

interface Option {
  xAxis: XAxis,
  yAxis: YAxis,
  series: Serie[],
  tooltip: Tooltip,
  legend?: Legend,
  color?: string[]
}

export interface ChartProps {
  xs: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  option: Option,
  title?: string
}

const Chart: FunctionComponent<ChartProps> = (props) => {
  const { xs, option, title } = props;
  const { root } = useStyles();
  return (
    <Grid
      item
      xs={xs}
    >
      <Paper
        classes={{ root }}
      >
        <Typography variant="h6">
          {title}
        </Typography>
        <Echart
          option={option}
        />
      </Paper>
    </Grid>
  );
};

export default Chart;
