import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import Settings from '@material-ui/icons/Settings';
import {makeStyles} from '@material-ui/core';
import {ProjectPathParams} from './ProjectLayout';
import {projectMenus} from './constants';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'fixed',
    width: 96,
    padding: theme.spacing(6, 0, 0, 0),
    height: '100vh',
    background: theme.palette.primary.light,
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuList: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    color: theme.palette.secondary.contrastText,
    '& svg': {
      fontSize: theme.typography.h4.fontSize,
    },
    '& p': {
      ...theme.typography.subtitle2,
      margin: theme.spacing(0),
    },
  },
  info: {
    width: 1440,
    height: 300,
    position: 'relative',
    background: '#f55',
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const match = useRouteMatch<ProjectPathParams>();
  const {projectId} = match.params;
  return (
    <div className={classes.sidebar}>
      <div className={classes.menuList}>
        {projectMenus.map((sideBarContent) => {
          const {label, Icon, link} = sideBarContent;
          return (
            <Link to={link(projectId)} key={label}>
              <div className={classes.menu}>
                <Icon />
                <p>{label}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={classes.menuList}>
        <Link to={'/setting'}>
          <div className={classes.menu}>
            <Settings />
            <p>Settings</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
