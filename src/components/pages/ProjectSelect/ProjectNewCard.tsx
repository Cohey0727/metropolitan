import React, {MouseEventHandler} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Container} from '../../atoms/containers';
import Add from '@material-ui/icons/Add';
import {Project} from '../../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      height: 188,
    },
    actionArea: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    iconContainer: {
      width: 160,
      height: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.palette.grey[600],
      borderStyle: 'dashed',
      borderWidth: 'medium',
      borderRadius: 16,
    },
    icon: {
      fontSize: 48,
      color: theme.palette.grey[500],
    },
  })
);

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ProjectNewCard(props: Props) {
  const {onClick} = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea} onClick={onClick}>
        <div className={classes.iconContainer}>
          <Add className={classes.icon} />
        </div>
      </CardActionArea>
    </Card>
  );
}

export default ProjectNewCard;
