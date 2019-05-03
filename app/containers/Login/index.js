/* eslint-disable no-shadow */
/**
 *
 * Login
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import { push } from 'connected-react-router';

import bgImage from 'images/loginbg.jpg';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setRedirectToReferrer } from 'containers/HomePage/actions';
import LoginForm from './LoginForm';
import makeSelectLogin from './selectors';
import { onLoginFormSubmit } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: `url(${bgImage})`,
    backgroundPosition: 'center' /* Center the image */,
    backgroundRepeat: 'no-repeat' /* Do not repeat the image */,
    backgroundSize: 'cover',
  },
  paper: {
    margin: '0px auto',
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    width: `calc(100% - 24px)`,
    maxWidth: 350,
    minHeight: 400,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  lockIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  register: {
    backgroundColor: '#2e7d32',
    color: 'white',
    '&:hover': {
      backgroundColor: '#3fa244',
    },
  },
  google: {
    backgroundColor: 'red',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 7,
    color: 'white',
    '&:hover': {
      backgroundColor: '#db3236',
    },
  },
}));

export function Login(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const { routeToSignUp, onLoginFormSubmit, setRedirectToReferrer } = props;
  useEffect(() => {
    setRedirectToReferrer(); // componentDidMount
  }, []);
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.lockIconWrapper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
          </div>
          <Typography variant="h5">Sign in</Typography>
          <LoginForm onSubmit={onLoginFormSubmit} />
          <GoogleLogin
            clientId="568630519870-7tfbcptdncktm77enij1t8i0q6bpo9hs.apps.googleusercontent.com"
            onSuccess={c => console.log(c)}
            onFailure={() => {}}
            uxMode="popup"
            render={({ onClick }) => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={onClick}
                className={classes.google}
              >
                {' '}
                Login With Google
              </Button>
            )}
          />

          <Typography variant="body2" gutterBottom>
            New to CampusRope ?
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={routeToSignUp}
            className={classes.register}
          >
            {' '}
            Sign up for free!
          </Button>
        </Paper>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired,
  routeToSignUp: PropTypes.func.isRequired,
  setRedirectToReferrer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoginFormSubmit: (values, actions) =>
      dispatch(onLoginFormSubmit(values, actions)),
    setRedirectToReferrer: bool => dispatch(setRedirectToReferrer(bool)),
    routeToSignUp: () => dispatch(push('/signup')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
