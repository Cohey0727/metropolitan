import React from 'react';
import {Link} from 'react-router-dom';
// import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core';
import People from '@material-ui/icons/People';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import {SvgIconTypeMap} from '@material-ui/core/SvgIcon/SvgIcon';
import Dashboard from '@material-ui/icons/Dashboard';
import Settings from '@material-ui/icons/Settings';
// import Logo from "src/components/Logo";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'fixed',
    width: 96,
    padding: theme.spacing(6, 0, 0, 0),
    height: '100vh',
    background: theme.palette.secondary.dark,
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
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

type SideBarContent = {
  label: string;
  link: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

const sideBarContents: SideBarContent[] = [
  {
    label: 'Members',
    link: '/members',
    Icon: People,
  },
  {
    label: 'Boards',
    link: '/boards',
    Icon: Dashboard,
  },
];

const SideBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <div className={classes.menuList}>
        {sideBarContents.map((sideBarContent) => {
          const {label, Icon, link} = sideBarContent;
          return (
            <Link to={link}>
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
