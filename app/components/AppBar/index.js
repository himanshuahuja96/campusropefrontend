/**
 *
 * AppBar
 *
 */

import React, { memo } from 'react';
import MaterialUiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const Root = styled.div`
  width: '100%';
`;

const useStyles = makeStyles(() => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Berkshire Swash',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbar: {
    backgroundColor: '#00235b',
  },
}));

function AppBar() {
  const classes = useStyles();
  return (
    <Root>
      <MaterialUiAppBar
        position="static"
        color="primary"
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.title}
            variant="h4"
            color="inherit"
            noWrap
          >
            CampusRope
          </Typography>
        </Toolbar>
      </MaterialUiAppBar>
    </Root>
  );
}

AppBar.propTypes = {};

export default memo(AppBar);
