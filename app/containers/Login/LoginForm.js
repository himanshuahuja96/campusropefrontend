import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FieldComponent from 'components/FormComponents/Field';

const useStyles = makeStyles(theme => ({
  error: {
    color: 'red',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginBottom: theme.spacing.unit,
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
    fontSize: 12,
  },
  progress: {
    marginLeft: 10,
    color: 'green',
  },
}));

export function LoginForm(props) {
  const classes = useStyles();
  const { onSubmit } = props;
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('please provide a valid email')
          .required('Please provide email'),
        password: Yup.string().required('please provide password'),
      })}
      onSubmit={(values, actions) => onSubmit(values, actions)}
    >
      {formikProps => {
        const { errors, isSubmitting, handleSubmit } = formikProps;
        return (
          <form
            className={classes.form}
            noValidate="noValidate"
            onSubmit={handleSubmit}
          >
            {errors.authentication && (
              <span className={classes.error}>{errors.authentication}</span>
            )}

            <Field
              component={FieldComponent}
              name="email"
              label="Email"
              fullWidth
            />

            <Field
              component={FieldComponent}
              name="password"
              type="password"
              label="Password"
              fullWidth
            />
            <Button color="primary" className={classes.button}>
              Forgot password?
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Login
              {isSubmitting && (
                <CircularProgress className={classes.progress} size={20} />
              )}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(LoginForm);
