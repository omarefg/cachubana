import React from 'react';
import { connect } from 'react-redux';

function OrderList(props) {
  return (
    <div className="order-list-container">
      {
        props.orders.map(order => (
          <div key={order._id}>
            {order._id}
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.orders
})
export default connect(mapStateToProps)(OrderList);