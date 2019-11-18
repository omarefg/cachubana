import React, { FunctionComponent, ChangeEvent as ReactChangeEvent } from 'react';
import Paper from '@material-ui/core/Paper';
import MuiTable from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import { Order } from '../store/orders/types';

import useStyles from '../styles/components/Table';

export interface Column {
  header: string,
  accessor: keyof Order,
  cell?: Function,
  filter?: Function,
  noFilter?: boolean,
  isHide?: boolean,
  noSort?: boolean
}

type OrderDirection = 'asc' | 'desc';

export interface Sort {
  orderBy: string | keyof Order,
  direction: OrderDirection
}

interface TableProps {
  columns: Column[],
  data: Order[],
  defaultFilterMethod: Function,
  sort: Sort,
  sortingMethod: Function
}

const Table: FunctionComponent<TableProps> = (props) => {
  const {
    root, table, filterRoot, hideSort,
  } = useStyles();
  const {
    data,
    columns,
    defaultFilterMethod,
    sort,
    sortingMethod,
  } = props;

  const filterMethod = (
    column: string,
  ) => (
    event: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => defaultFilterMethod(event, column);

  const sortingMethodHandler = (column: string) => () => sortingMethod(column);

  return (
    <Paper className={root}>
      <MuiTable className={table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({
              header, accessor, isHide, noSort,
            }) => {
              if (isHide) return null;

              return (
                <TableCell key={accessor}>
                  <TableSortLabel
                    active={sort.orderBy === accessor}
                    direction={sort.direction}
                    onClick={noSort ? undefined : sortingMethodHandler(accessor)}
                    hideSortIcon={noSort}
                    classes={{ root: noSort ? hideSort : '' }}
                  >
                    {header}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            {columns.map((col) => {
              const {
                filter, accessor, noFilter, isHide, header,
              } = col;
              if (isHide) return null;

              return (
                <TableCell key={accessor}>
                  {filter && !noFilter && filter(col)}
                  {!filter && !noFilter && (
                    <TextField
                      placeholder={header}
                      classes={{ root: filterRoot }}
                      onChange={filterMethod(accessor)}
                    />
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              {columns.map(({ cell, accessor, isHide }) => {
                if (isHide) return null;

                if (cell) {
                  return (
                    <TableCell
                      component="th"
                      scope="row"
                      key={accessor}
                    >
                      {cell(row)}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    component="th"
                    scope="row"
                    key={accessor}
                  >
                    {row[accessor]}
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

export default Table;
