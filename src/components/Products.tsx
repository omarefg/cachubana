import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ProductsTransition from './ProductsTransition';
import ProductListItem from './ProductListItem';
import orderActions from '../store/orders/actions';
import { OrdersState } from '../store/orders/types';
import { State } from '../store';

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
interface ProductsProps {
  orders: OrdersState,
  setSelectedOrder: Function,
  setProductIsFinished: Function,
  saveFinishedProducts: Function
}

const Products: FunctionComponent<ProductsProps> = (props) => {
  const classes = useStyles();
  const {
    orders, setSelectedOrder, setProductIsFinished, saveFinishedProducts,
  } = props;
  const { selectedOrder } = orders;

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

const { setSelectedOrder, setProductIsFinished, saveFinishedProducts } = orderActions;

const mapStateToProps = (state : State) => (
  {
    orders: state.orders,
  }
);

const mapDistpatchToProps = {
  setSelectedOrder,
  setProductIsFinished,
  saveFinishedProducts,
};

export default connect(mapStateToProps, mapDistpatchToProps)(Products);
