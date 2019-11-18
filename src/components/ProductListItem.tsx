import React, {
  FunctionComponent,
  ReactElement,
  MouseEvent as ReactMouseEvent,
} from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useStyles from '../styles/components/ProductListItem';

interface ProductListItemRow {
  cell: string | ReactElement | number,
  id: string
}

interface LItemProps {
  children: ReactElement
}

export interface ProductListItemProps {
  row: ProductListItemRow[],
  isButton?: true,
  onClick?: (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ProductListItem: FunctionComponent<ProductListItemProps> = (props) => {
  const { row, isButton, onClick } = props;
  const classes = useStyles();

  let LItem : (FunctionComponent<LItemProps>) = ({ children }) => (
    <ListItem
      divider
    >
      {children}
    </ListItem>
  );

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
