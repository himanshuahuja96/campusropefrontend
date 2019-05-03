/**
 *
 * SignUp
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSignUp from './selectors';
import reducer from './reducer';
import saga from './saga';
import SignupForm from './SignUpForm';
import { signUpSubmit } from './actions';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize: 'cover',
  },
  paper: {
    margin: '20px auto',
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    width: `calc(100% - 24px)`,
    maxWidth: 350,
    minHeight: 400,
  },
  lockIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function SignUp(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'signUp', reducer });
  useInjectSaga({ key: 'signUp', saga });
  const { onSignUpFormSubmit, routeToLogin } = props;

  return (
    <div>
      <Helmet>
        <title>SignUp</title>
        <meta name="description" content="Description of SignUp" />
      </Helmet>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.lockIconWrapper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
          </div>
          <Typography variant="h5">Sign Up</Typography>
          <SignupForm
            handleSignUp={onSignUpFormSubmit}
            routeToLogin={routeToLogin}
          />
        </Paper>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  onSignUpFormSubmit: PropTypes.func.isRequired,
  routeToLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signUp: makeSelectSignUp(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSignUpFormSubmit: (values, actions) =>
      dispatch(signUpSubmit(values, actions)),
    routeToLogin: () => dispatch(push('/login')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignUp);
