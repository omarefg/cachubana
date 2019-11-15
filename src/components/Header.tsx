import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useStyles from '../styles/components/Header';


interface HeaderProps {

}

const Header : React.FunctionComponent<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Cachubana
          </Typography>
          <Button
            color="secondary"
            variant="contained"
          >
            Ordenes
          </Button>
          <Button
            color="secondary"
            variant="contained"
          >
            Tablero
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
