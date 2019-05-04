/**
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { changeRoute, routeToUserProfile, homeMounted } from './actions';

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
  const [homeMountedDispatch, dispatch, drawerMenus, loggedUserInfo] = props;
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    homeMountedDispatch(); // componentDidMount
  }, []);

  function gotoUserProfile() {
    dispatch(changeRoute(routeToUserProfile));
  }

  function gotoSelectedRoute(toRoute) {
    dispatch(push(toRoute));
  }

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
      {isLoggedIn() ? (
        <NewAppBar
          gotoUserProfile={gotoUserProfile}
          gotoSelectedRoute={gotoSelectedRoute}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        <PublicAppBar />
      )}
      <Drawer
        open={!!drawerOpen}
        toggleDrawer={toggleDrawer}
        dispatch={dispatch}
        menuItems={drawerMenus}
        loggedUserInfo={loggedUserInfo}
      />
      <CenterPanel>
        {!isLoggedIn() && <HeaderTabs />}
        <CenterMenuWrapper />
      </CenterPanel>
    </React.Fragment>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
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
