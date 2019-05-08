/* eslint-disable no-nested-ternary */
/**
 *
 * Drawer
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';

import { ADMIN_TASK_MENU_ID } from '../../store/loggeduser/selectors';

const MenuItems = ({ menus, handleClick, open, dispatch }) =>
  menus.map(menu => (
    <React.Fragment key={menu.id}>
      <ListItem
        button
        onClick={e => {
          if (menu.id === ADMIN_TASK_MENU_ID) {
            e.stopPropagation();
            e.preventDefault();
            handleClick();
          } else if (menu.trigger) {
            menu.trigger(dispatch);
          }
        }}
      >
        <ListItemIcon>
          <Icon>{menu.iconName}</Icon>
        </ListItemIcon>
        <ListItemText primary={menu.menuLabel} />
        {menu.subMenus.length ? (
          menu.subMenus.length && open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : (
          <div />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {menu.subMenus.map(subMenu => (
          <List component="div" disablePadding key={subMenu.id}>
            <ListItemComponent menu={subMenu} />
          </List>
        ))}
      </Collapse>
    </React.Fragment>
  ));

const MenuAdminItems = ({ menus }) =>
  menus.map(menu => <ListItemComponent menu={menu} />);

const ListItemComponent = menu => (
  <ListItem button key={menu.id}>
    <ListItemIcon>
      <Icon>{menu.iconName}</Icon>
    </ListItemIcon>
    <ListItemText primary={menu.menuLabel || menu.taskName} />
  </ListItem>
);

const useStyles = makeStyles(theme => ({
  list: {
    width: 350,
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
}));

function Drawer(props) {
  const classes = useStyles();
  const [adminTaskDrawerOpen, setDrawerOpen] = useState(false);
  const { menuItems, loggedUserInfo, dispatch, open, toggleDrawer } = props;

  function handleClick() {
    setDrawerOpen(true);
  }

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={() => {}}
      onClose={() => toggleDrawer(false)}
      tabIndex={0}
      role="button"
      onKeyDown={() => toggleDrawer(false)}
      onClick={() => toggleDrawer(false)}
    >
      <div style={classes.list}>
        <List>
          {loggedUserInfo.role === 'user' ? (
            <MenuItems
              dispatch={dispatch}
              menus={menuItems}
              handleClick={handleClick}
              open={adminTaskDrawerOpen}
            />
          ) : (
            <MenuAdminItems menus={menuItems} />
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
}

Drawer.propTypes = {
  loggedUserInfo: PropTypes.object,
  dispatch: PropTypes.func,
  toggleDrawer: PropTypes.func,
  menuItems: PropTypes.array,
  open: PropTypes.bool,
};

export default memo(Drawer);
