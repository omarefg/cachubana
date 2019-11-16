import React, { FunctionComponent } from 'react';
import Echart from 'echarts-for-react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { User, Product } from '../store/orders/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2),
  },
}));

interface XAxis {
  type: string,
  data?: Array<string | User | Array<Product>>
}

interface YAxis {
  type: string,
  data?: Array<string | User | Array<Product>>
}

interface Serie {
  stack: string,
  data: Array<number>,
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
  data: Array<string>
}

interface Option {
  xAxis: XAxis,
  yAxis: YAxis,
  series: Array<Serie>,
  tooltip: Tooltip,
  legend?: Legend,
  color?: Array<string>
}

export interface ChartProps {
  xs: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  option: Option,
  title: string
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
