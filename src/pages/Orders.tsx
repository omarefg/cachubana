import React, {
  useState,
  useEffect,
  FunctionComponent,
  ChangeEvent as ReactChangeEvent,
} from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ProductsIcon from '@material-ui/icons/FormatListNumberedRounded';
import Table, { Column, Sort } from '../components/Table';
import Products from '../components/Products';
import Select, { ChangeEvent } from '../components/Select';
import actions from '../store/orders/actions';
import { State } from '../store';
import { Order, Product } from '../store/orders/types';
import getFilteredAndSortedRows, { getRegularFilterOpts, getProductsFilterOpts } from '../utils/orders';

interface HomeProps {
  orders: Order[],
  setSelectedOrder: Function,
  isManager: boolean
}

const defaultSort: Sort = { orderBy: '', direction: 'desc' };

const Home: FunctionComponent<HomeProps> = (props) => {
  const { orders, setSelectedOrder, isManager } = props;
  const [data, setData] = useState(orders);
  const [filters, setFilters] = useState(new Map());
  const [sort, setSort] = useState(defaultSort);


  useEffect(() => {
    setData(getFilteredAndSortedRows(orders, filters, sort));
  }, [orders, filters, sort]);

  const regionFilterOpts = getRegularFilterOpts(orders, 'region_code');
  const slotFilterOpts = getRegularFilterOpts(orders, 'slot');
  const routeFilterOpts = getRegularFilterOpts(orders, 'routeId');
  const productsFilterOpts = getProductsFilterOpts(orders, 'products');

  const setSelectedOrderHandler = (row: Order) => () => setSelectedOrder(row);

  const dropdownFilterMethod = (event: ReactChangeEvent<ChangeEvent>, column: string) => {
    const { value } = event.target;
    const updatedFilters = new Map(filters);
    let actualValues = filters.get(column) || [];
    const valueExistsInFilter = Boolean(actualValues.find((val: string) => val === value));
    if (valueExistsInFilter) {
      actualValues = actualValues.filter((val: string) => val !== value);
    } else {
      actualValues.push(value);
    }
    if (actualValues.length) {
      updatedFilters.set(column, actualValues);
    } else {
      updatedFilters.delete(column);
    }
    setFilters(updatedFilters);
    setData(getFilteredAndSortedRows(orders, updatedFilters, sort));
  };

  const defaultFilterMethod = (
    event: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    column: string,
  ) => {
    const { value } = event.target;
    const updatedFilters = new Map(filters);
    if (value) {
      updatedFilters.set(column, value);
    } else {
      updatedFilters.delete(column);
    }
    setFilters(updatedFilters);
    setData(getFilteredAndSortedRows(orders, updatedFilters, sort));
  };

  const sortingMethod = (column: keyof Order) => {
    const direction = sort.direction === 'desc' && column === sort.orderBy ? 'asc' : 'desc';
    const orderBy = column;
    setSort({ orderBy, direction });
    setData(getFilteredAndSortedRows(orders, filters, { orderBy, direction }));
  };

  return (
    <Container maxWidth="lg">
      <Table
        columns={[
          {
            header: 'Productos',
            accessor: 'products',
            cell: (row: Order) => (
              <Button
                color="secondary"
                variant="contained"
                onClick={setSelectedOrderHandler(row)}
              >
                <ProductsIcon
                  color="inherit"
                />
              </Button>
            ),
            isHide: isManager,
            noFilter: true,
            noSort: true,
          },
          {
            header: 'Región',
            accessor: 'region_code',
            filter: ({ accessor, header }: Column) => (
              <Select
                label={header}
                labelId={accessor}
                options={regionFilterOpts}
                value={filters.get(accessor) || []}
                onChange={dropdownFilterMethod}
              />
            ),
          },
          {
            header: 'Usuario',
            accessor: 'user',
            cell: (row: Order) => row.user.name,
          },
          {
            header: 'Slot',
            accessor: 'slot',
            filter: ({ accessor, header }: Column) => (
              <Select
                label={header}
                labelId={accessor}
                options={slotFilterOpts}
                value={filters.get(accessor) || []}
                onChange={dropdownFilterMethod}
              />
            ),
          },
          {
            header: 'Ruta',
            accessor: 'routeId',
            filter: ({ accessor, header }: Column) => (
              <Select
                label={header}
                labelId={accessor}
                options={routeFilterOpts}
                value={filters.get(accessor) || []}
                onChange={dropdownFilterMethod}
              />
            ),
          },
          {
            header: 'Completado',
            accessor: '_id',
            cell: (row: Order) => {
              const finishedProducts = row.products
                .filter((product: Product) => product.finished).length;
              return `${Math.round((100 / row.products.length) * finishedProducts)}%`;
            },
          },
          {
            header: 'Productos Faltantes',
            accessor: 'products',
            cell: (row: Order) => (
              <span>
                {row.products
                  .filter((product) => !product.finished)
                  .map((product) => product.name)
                  .join(', ')}
              </span>
            ),
            isHide: !isManager,
            noSort: true,
            filter: ({ accessor, header }: Column) => (
              <Select
                label={header}
                labelId={accessor}
                options={productsFilterOpts}
                value={filters.get(accessor) || []}
                onChange={dropdownFilterMethod}
              />
            ),
          },
        ]}
        data={data}
        defaultFilterMethod={defaultFilterMethod}
        sort={sort}
        sortingMethod={sortingMethod}
      />
      <Products />
    </Container>
  );
};

const { setSelectedOrder } = actions;

const mapStateToProps = (state: State) => ({
  orders: state.orders.orders,
  isManager: state.auth.isManager,
});


const mapDistpatchToProps = {
  setSelectedOrder,
};

export default connect(mapStateToProps, mapDistpatchToProps)(Home);
