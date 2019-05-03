import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { getIn } from 'formik';

export const fieldToSelect = ({ field, form, disabled = false, ...props }) => {
  const { name } = field;
  const { touched, errors, isSubmitting } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;
  return {
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: isSubmitting || disabled,
    ...props,
    ...field,
  };
};

const SelectComponent = props => {
  const { options, required, label, ...fields } = fieldToSelect(props);
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={fields.name}>{label}</InputLabel>
      <Select {...fields} input={<Input id={fields.name} name={fields.name} />}>
        {options.map(option => (
          <MenuItem value={option.value}>{option.name}</MenuItem>
        ))}
      </Select>
      {fields.touched && fields.error && (
        <FormHelperText style={{ color: 'red' }}>{fields.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectComponent;
