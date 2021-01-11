import React, {useState} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import {ProjectPathParams} from './ProjectLayout';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {ProjectMenu, projectMenus} from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px -2px 8px 0px rgba(0,0,0,0.2)',
  },
}));

const MobileNavigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch<ProjectPathParams>();
  const {projectId} = match.params;

  const [value, setValue] = useState(projectMenus[0]);
  const handleChange = (event: React.ChangeEvent<{}>, menu: ProjectMenu) => {
    setValue(menu);
    const url = menu.link(projectId);
    history.push(url);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      {projectMenus.map((item) => (
        <BottomNavigationAction label={item.label} value={item} icon={<item.Icon />} />
      ))}
    </BottomNavigation>
  );
};

export default MobileNavigation;
