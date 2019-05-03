import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Recaptcha from 'react-recaptcha';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FieldComponent from 'components/FormComponents/Field';
import SelectComponent from 'components/FormComponents/Select';
const genderOptions = [
  {
    name: 'male',
    value: 'male',
  },
  {
    name: 'female',
    value: 'female',
  },
  {
    name: 'other',
    value: 'other',
  },
];
const CaptchaMessage = Styled.div`
    margin: '15px auto';
    fontSize: '0.8em';
    color: 'red';
`;
const CaptchaContainer = Styled.div`
  margin: '15px auto';
  color: 'red';
`;

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
    marginTop: 10,
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
  field: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

export function SignUpForm(props) {
  const classes = useStyles();
  const [recapchaErrorMsg, setRecapchaErrorMsg] = useState(null);
  const [isCaptchaVerified, setCaptchaverified] = useState(false);
  const { handleSignUp, routeToLogin } = props;

  function handleSignUpSubmit(values, actions) {
    if (isCaptchaVerified) {
      handleSignUp(values, actions);
    } else {
      setRecapchaErrorMsg('Please verify that you are not a robot.');
      actions.setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        lastName: '',
        email: '',
        gender: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('please provide name'),
        email: Yup.string()
          .email('please provide a valid email')
          .required('Please provide email'),
        password: Yup.string().required('please provide passoword'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password')], "Passwords don't match")
          .required('Please confirm your password'),
      })}
      onSubmit={(values, actions) => {
        // eslint-disable-next-line no-param-reassign
        values.name = `${values.name} ${values.lastName}`;
        handleSignUpSubmit(values, actions);
      }}
    >
      {formikProps => {
        const { isSubmitting, handleSubmit } = formikProps;
        return (
          <form
            className={classes.form}
            noValidate="noValidate"
            onSubmit={handleSubmit}
          >
            <Field
              component={FieldComponent}
              name="name"
              className={classes.field}
              label="FirstName"
              fullWidth
            />

            <Field
              component={FieldComponent}
              name="lastname"
              className={classes.field}
              label="LastName"
              fullWidth
            />

            <Field
              component={FieldComponent}
              name="email"
              autocomplete
              className={classes.field}
              label="Email"
              fullWidth
            />

            <Field
              component={SelectComponent}
              options={genderOptions}
              className={classes.field}
              label="Gender"
              name="gender"
              fullWidth
            />

            <Field
              component={FieldComponent}
              name="password"
              className={classes.field}
              type="password"
              label="Password"
              fullWidth
            />

            <Field
              component={FieldComponent}
              name="passwordConfirm"
              className={classes.field}
              type="password"
              label="Confirm Password"
              fullWidth
            />
            {recapchaErrorMsg && (
              <CaptchaMessage>{recapchaErrorMsg}</CaptchaMessage>
            )}
            <CaptchaContainer>
              <Recaptcha
                className={classes.field}
                sitekey="6Lcba54UAAAAAE4RiyyuCcJzxtcFyAqBLEzYWvLr"
                render="explicit"
                verifyCallback={res => {
                  if (res) {
                    setCaptchaverified(true);
                    setRecapchaErrorMsg(null);
                  }
                }}
              />
            </CaptchaContainer>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Signup
              {isSubmitting && (
                <CircularProgress className={classes.prgress} size={20} />
              )}
            </Button>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
              onClick={routeToLogin}
              className={classes.backBtn}
              disabled={isSubmitting}
            >
              Back
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  routeToLogin: PropTypes.func.isRequired,
};

export default memo(SignUpForm);
