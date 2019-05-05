import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

const RootComponent = Styled.div`
    margin: 'auto';
    display: 'flex';
    justify-content: 'space-around';
    flex-wrap: 'wrap';
    width: '60%';
    height: '75%';
    align-items: 'center';
`;

const useStyles = makeStyles(() => ({
  menuListItem: {
    height: 82,
    borderRadius: 5,
    display: 'flex',
    cursor: 'pointer',
    margin: 20,
    '& svg': {
      fontSize: 40,
    },
  },
  link: {
    textDecoration: 'none',
  },
  menuItemContent: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  menuTitleSize: {
    fontSize: 18,
  },
  menuItemButton: {
    width: 240,
    '& span': {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
}));

export function HomeButtons(props) {
  const classes = useStyles();
  const { menus } = props;

  return (
    <React.Fragment>
      <RootComponent>
        {menus.map(menu => (
          <div className={classes.menuListItem} key={menu.title}>
            <Link to={menu.linkTo} className={classes.link}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.menuItemButton}
              >
                <div className={classes.menuItemContent}>
                  <Typography type="subheading" color="secondary">
                    {menu.icon}
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  className={classNames(
                    classes.menuItemContent,
                    classes.menuTitleSize,
                  )}
                >
                  {menu.title}
                </Typography>
              </Button>
            </Link>
          </div>
        ))}
      </RootComponent>
    </React.Fragment>
  );
}

HomeButtons.propTypes = {
  menus: PropTypes.array.isRequired,
};

export default memo(HomeButtons);
