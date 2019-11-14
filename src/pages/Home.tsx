import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../store/interfaces/store'

interface HomeProps {

}

const Home : React.FunctionComponent<HomeProps> = (props) => (
  <div />
);

const MapStateToProps = (state : Store) => ({
  orders: state.orders,
});


export default connect(MapStateToProps)(Home);
