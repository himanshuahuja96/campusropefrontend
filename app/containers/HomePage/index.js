/**
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import Drawer from 'components/Drawer';
import AppBar from 'components/AppBar';
import HeaderTabs from 'components/HeaderTabs';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import HomeButtons from './HomeButtons';
import { homeMounted } from './actions';
import {
  makeSelectLoggedUserMenus,
  isLoggedIn,
  makeSelectLoggedUser,
  makeSelectLoggedUserHomeMenus,
} from '../../store/loggeduser/selectors';

const CenterPanel = styled.div`
  background: #fff;
  position: relative;
  max-width: 58em;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 91vh;
`;
const CenterMenuWrapper = styled.div``;

export function HomePage(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    homeMountedDispatch,
    dispatch,
    drawerMenus,
    loggedUserInfo,
    homeMenus,
  } = props;
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    homeMountedDispatch(); // componentDidMount
  }, []);

  function toggleDrawer(opened) {
    const isDrawerOpen = opened || !drawerOpen;
    setDrawerOpen(isDrawerOpen);
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Homepage of Campusrope" />
      </Helmet>
      <AppBar />
      <Drawer
        open={!!drawerOpen}
        toggleDrawer={toggleDrawer}
        dispatch={dispatch}
        menuItems={drawerMenus}
        loggedUserInfo={loggedUserInfo}
      />
      <CenterPanel>
        {!isLoggedIn() && <HeaderTabs />}
        <CenterMenuWrapper>
          <Switch>
            <Route
              exact
              path="/"
              component={routerProps => (
                <HomeButtons menus={homeMenus} {...routerProps} />
              )}
            />
          </Switch>
        </CenterMenuWrapper>
      </CenterPanel>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  homePage: PropTypes.object.isRequired,
  homeMenus: PropTypes.array.isRequired,
  loggedUserInfo: PropTypes.object.isRequired,
  drawerMenus: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  homeMountedDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  homeMenus: makeSelectLoggedUserHomeMenus(),
  loggedUserInfo: makeSelectLoggedUser(),
  drawerMenus: makeSelectLoggedUserMenus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    homeMountedDispatch: () => dispatch(homeMounted()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
