import React, { ChangeEvent as ReactChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import HeaderLink from './HeaderLink';
import { State } from '../store';

import authActions from '../store/auth/actions';

import useStyles from '../styles/components/Header';


interface HeaderProps {
  isManager: boolean,
  setIsManager: Function
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const classes = useStyles();
  const { isManager, setIsManager } = props;

  const setIsManagerHandler = (event: ReactChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === 'true') {
      setIsManager(false);
      return;
    }
    setIsManager(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <HeaderLink
            to="/ordenes"
            title="Cachubana"
          />
          <div className={classes.root} />
          <HeaderLink
            to="/ordenes"
            title="Ordenes"
          />
          {isManager && (
            <HeaderLink
              to="/tablero"
              title="Tablero"
            />
          )}
          <FormGroup>
            <FormControlLabel
              control={(
                <Switch
                  checked={isManager}
                  aria-label="login switch"
                  value={isManager}
                  onChange={setIsManagerHandler}
                />
          )}
              label={isManager ? 'Gerente' : 'Personal de bodega'}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const { setIsManager } = authActions;

const mapStateToProps = (state: State) => ({
  isManager: state.auth.isManager,
});

const mapDispatchToProps = {
  setIsManager,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
