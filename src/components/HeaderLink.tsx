import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import useStyles from '../styles/components/HeaderLink';

export interface HeaderLinkProps {
  to: string,
  title: string
}

const HeaderLink: FunctionComponent<HeaderLinkProps> = (props) => {
  const { to, title } = props;
  const { anchor, text } = useStyles();
  return (
    <Link
      to={to}
      className={anchor}
    >
      <Button
        color="inherit"
        classes={{ text }}
      >
        {title}
      </Button>
    </Link>
  );
};

export default HeaderLink;
