import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  filterRoot: {
    marginTop: theme.spacing(2),
  },
  hideSort: {
    cursor: 'default',
    '&:hover': {
      color: 'black',
    },
    '&:focus': {
      color: 'black',
    },
  },
}));
