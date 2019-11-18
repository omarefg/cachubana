import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ProductsTransition from './SlideTransition';
import ProductListItem from './ProductListItem';
import { State } from '../store';
import actions from '../store/orders/actions';
import { Order } from '../store/orders/types';

import useStyles from '../styles/components/Products';

interface ProductsProps {
  selectedOrder: Order | null,
  setSelectedOrder: Function,
  setProductIsFinished: Function,
  saveFinishedProducts: Function
}

const Products: FunctionComponent<ProductsProps> = (props) => {
  const classes = useStyles();

  const {
    selectedOrder,
    setSelectedOrder,
    setProductIsFinished,
    saveFinishedProducts,
  } = props;

  const closeProductsHandler = () => setSelectedOrder(null);

  const setProductIsFinishedHandler = (id: string) => () => setProductIsFinished(id);

  const selectedProducts = selectedOrder
    ? selectedOrder.products.filter((product) => product.finished)
    : [];
  const selectAllHandler = () => {
    if (selectedOrder) {
      if (selectedProducts.length) {
        selectedProducts.forEach((product) => setProductIsFinished(product._id));
        return;
      }
      selectedOrder.products.forEach((product) => setProductIsFinished(product._id));
    }
  };

  const saveFinishedProductsHandler = () => saveFinishedProducts();

  return (
    <Dialog
      fullScreen
      open={Boolean(selectedOrder)}
      TransitionComponent={ProductsTransition}
    >
      <AppBar
        className={classes.appBar}
        color="secondary"
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={closeProductsHandler}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`${selectedOrder && selectedOrder.user.name} | ${selectedOrder && selectedOrder.region_code}`}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={selectAllHandler}
          >
            {selectedProducts.length ? 'Desmarcar todo' : 'Marcar todo'}
          </Button>
          <Button
            autoFocus
            color="inherit"
            onClick={saveFinishedProductsHandler}
          >
              Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ProductListItem
          row={[
            { cell: 'Producto', id: '0' },
            { cell: 'Cantidad', id: '1' },
            { cell: 'Precio', id: '2' },
            { cell: 'Total', id: '3' },
            { cell: 'Alistado', id: '4' },
          ]}
        />
        {selectedOrder && selectedOrder.products.map((order) => {
          const {
            _id, quantity, price, total, name, finished,
          } = order;
          const icon = finished ? <CheckCircleIcon color="primary" /> : <CancelIcon color="error" />;
          return (
            <ProductListItem
              key={_id}
              row={[
                { cell: name, id: '0' },
                { cell: quantity, id: '1' },
                { cell: price, id: '2' },
                { cell: total, id: '3' },
                { cell: icon, id: '4' },
              ]}
              isButton
              onClick={setProductIsFinishedHandler(_id)}
            />
          );
        })}
      </List>
    </Dialog>
  );
};

const { setSelectedOrder, setProductIsFinished, saveFinishedProducts } = actions;

const mapStateToProps = (state : State) => (
  {
    selectedOrder: state.orders.selectedOrder,
  }
);

const mapDistpatchToProps = {
  setSelectedOrder,
  setProductIsFinished,
  saveFinishedProducts,
};

export default connect(mapStateToProps, mapDistpatchToProps)(Products);
