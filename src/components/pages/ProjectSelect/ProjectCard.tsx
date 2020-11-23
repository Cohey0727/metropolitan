import React, {MouseEventHandler, useMemo} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Project} from '../../../types';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `min(90vw, ${345}px)`,
      height: 188,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

type Props = {
  project: Project;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ProjectCard(props: Props) {
  const {project, onClick} = props;
  const avatarChar = useMemo(() => project.title[0].toUpperCase(), [project]);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {avatarChar}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={project.title}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
