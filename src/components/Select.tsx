import React, { FunctionComponent, ChangeEvent as ReactChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';

import useStyles from '../styles/components/Select';

export interface ChangeEvent {
  name?: string | undefined
  value: unknown
}

export interface SelectProps {
  label: string,
  labelId: string,
  value: string[],
  onChange: Function,
  options: string[],
  multiple?: boolean,
}

const Select: FunctionComponent<SelectProps> = (props) => {
  const {
    label,
    labelId,
    value,
    onChange,
    options,
    multiple,
  } = props;
  const classes = useStyles();

  const onChangeHandler = (event: ReactChangeEvent<ChangeEvent>) => onChange(event, labelId);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        multiple={multiple}
        value={value}
        onChange={onChangeHandler}
        input={<Input />}
        renderValue={() => (value.length ? value.join(', ') : '')}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            <Checkbox checked={value.indexOf(opt) > -1} />
            <ListItemText primary={opt} />
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
