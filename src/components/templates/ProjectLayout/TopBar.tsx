import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, makeStyles} from '@material-ui/core';
import {Container} from '../../atoms/containers';
import {AccountUser} from '../../organisms/account';
import {FullLogo, WhiteLogo} from '../../organisms/common';
import {useProjectContext} from '../../../api/project/hooks';
import useIsMobile from '../../../utils/hooks/useIsMobile';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    display: 'flex',
    padding: theme.spacing(0, 4, 0, 2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbar: {},
  rightContainer: {},
  projectTitle: {
    lineHeight: '1rem',
    margin: theme.spacing(0, 4),
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const {project} = useProjectContext();
  const isMobile = useIsMobile();
  return (
    <AppBar className={classes.root} elevation={0}>
      <Container
        display={'flex'}
        width={'auto'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100%'}
      >
        <RouterLink to='/'>{isMobile ? <WhiteLogo /> : <FullLogo />}</RouterLink>
        <h3 className={classes.projectTitle}>{project.title}</h3>
      </Container>
      <Container className={classes.rightContainer}>
        <AccountUser />
      </Container>
    </AppBar>
  );
};

export default TopBar;
