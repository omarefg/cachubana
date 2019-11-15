import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import {
  Paper, Table as MuiTable, TableHead, TableBody, TableRow, TableCell, Button,
} from '@material-ui/core';
import { FormatListNumberedRounded as ProductsIcon } from '@material-ui/icons';
import orderActions from '../store/orders/actions';
import { Order, OrdersState } from '../store/orders/types';
import { State } from '../store';

import useStyles from '../styles/components/Table';

interface Column {
  header: string,
  accessor: keyof Order,
  cell?: Function
}

interface TableProps {
  orders: OrdersState,
  columns: Array<Column>,
  setSelectedOrder: Function
}

const Table : FunctionComponent<TableProps> = (props) => {
  const classes = useStyles();
  const { orders, columns, setSelectedOrder } = props;
  const { orders: orderRows } = orders;

  const setSelectedOrderHandler = (row: Order) => () => setSelectedOrder(row);

  return (
    <Paper className={classes.root}>
      <MuiTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Productos</TableCell>
            {columns.map(({ header, accessor }) => (
              <TableCell key={accessor}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderRows.map((row) => (
            <TableRow key={row._id}>
              <TableCell
                component="th"
                scope="row"
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={setSelectedOrderHandler(row)}
                >
                  <ProductsIcon
                    color="inherit"
                  />
                </Button>
              </TableCell>
              {columns.map((col) => {
                if (col.cell) {
                  return (
                    <TableCell
                      component="th"
                      scope="row"
                      key={col.accessor}
                    >
                      {col.cell(row)}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    component="th"
                    scope="row"
                    key={col.accessor}
                  >
                    {row[col.accessor]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </Paper>
  );
};

const { setSelectedOrder } = orderActions;

const mapStateToProps = (state : State) => (
  {
    orders: state.orders,
  }
);

const mapDistpatchToProps = {
  setSelectedOrder,
};

export default connect(mapStateToProps, mapDistpatchToProps)(Table);
