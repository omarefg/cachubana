import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import Table from '../components/Table';
import Products from '../components/Products';
import { Order } from '../store/orders/types';

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
          header: 'Espacio',
          accessor: 'slot',
        },
      ]}
    />
    <Products />
  </Container>
);


export default Home;
