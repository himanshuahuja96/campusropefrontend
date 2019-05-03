/**
 *
 * FormComponents/Field
 *
 */

import React, { memo } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { getIn } from 'formik';

export const fieldToTextField = ({
  field,
  form,
  variant,
  disabled = false,
  ...props
}) => {
  const { name } = field;
  const { touched, errors, isSubmitting } = form;

  const fieldError = getIn(errors, name);
  const showError = getIn(touched, name) && !!fieldError;
  return {
    ...props,
    ...field,
    variant,
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: isSubmitting || disabled,
  };
};

const Field = ({ ...props }) => <MuiTextField {...fieldToTextField(props)} />;

export default memo(Field);
