import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import Table from '../components/Table';
import Products from '../components/Products';
import { Order, Product } from '../store/orders/types';

interface HomeProps { }

const Home : FunctionComponent<HomeProps> = () => (
  <Container maxWidth="lg">
    <Table
      columns={[
        {
          header: 'Región',
          accessor: 'region_code',
        },
        {
          header: 'Usuario',
          accessor: 'user',
          cell: (row: Order) => row.user.name,
        },
        {
          header: 'Bloque',
          accessor: 'slot',
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
      ]}
    />
    <Products />
  </Container>
);


export default Home;
