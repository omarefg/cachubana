import React, {
  FunctionComponent, ReactElement, MouseEvent as ReactMouseEvent,
} from 'react';
import {
  ListItemText,
  ListItem,
  Container,
  Grid,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  item: {
    width: '20%',
  },
}));

interface ProductListItemRow {
  cell: string | ReactElement | number,
  id: string
}

export interface ProductListItemProps {
  row: Array<ProductListItemRow>,
  isButton?: true,
  onClick?: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ProductListItem: FunctionComponent<ProductListItemProps> = (props) => {
  const { row, isButton, onClick } = props;
  const classes = useStyles();
  interface LItemProps {
    children: ReactElement
  }
  let LItem : (
    FunctionComponent<LItemProps>
  ) = ({ children }) => <ListItem divider>{children}</ListItem>;
  if (isButton) {
    LItem = ({ children }) => (
      <ListItem
        divider
        button
        onClick={onClick}
      >
        {children}
      </ListItem>
    );
  }

  return (
    <LItem>
      <ListItemText
        disableTypography
        primary={(
          <Container>
            <Grid
              container
              spacing={3}
              justify="space-between"
            >
              {row.map(({ cell, id }) => (
                <Grid
                  key={id}
                  item
                  xs="auto"
                  classes={{
                    item: classes.item,
                  }}
                >

                  {cell}
                </Grid>
              ))}
            </Grid>
          </Container>
          )}
      />
    </LItem>
  );
};

export default ProductListItem;
