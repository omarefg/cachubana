import React, { FunctionComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';
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

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface ProductsProps {
  orders: OrdersState,
  setSelectedOrder: Function
}

const Products : FunctionComponent<ProductsProps> = (props) => {
  const classes = useStyles();
  const { orders } = props;
  const { selectedOrder } = orders;

  return (
    <Dialog
      fullScreen
      open={Boolean(selectedOrder)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`${selectedOrder && selectedOrder.user.name} | ${selectedOrder && selectedOrder.region_code}`}
          </Typography>
          <Button autoFocus color="inherit">
              Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {selectedOrder && selectedOrder.products.map((order) => (
          <Fragment
            key={order._id}
          >
            <ListItem button>
              <ListItemText
                primary={order.name}
                secondary={(
                  <>
                    <p>{ `${order.quantity} unidades`}</p>
                    <p>{`Precio ${order.price}`}</p>
                    <p>{`Total ${order.total}`}</p>
                  </>
                )}
              />
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Dialog>
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

export default connect(mapStateToProps, mapDistpatchToProps)(Products);
