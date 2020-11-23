import React, {MouseEventHandler, useMemo} from 'react';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Project} from '../../../types';
import CardActionArea from '@material-ui/core/CardActionArea';
import {PopperMenu} from '../../atoms/buttons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: `min(90vw, ${345}px)`,
      height: 240,
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      flex: '1 1 0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    actions: {
      boxSizing: 'border-box',
      flex: '0 0 48px',
    },
    cardHeader: {
      flex: '0 0 48px',
      width: '100%',
      padding: theme.spacing(2),
      boxSizing: 'border-box',
    },
    cardContent: {
      flex: '1 1 0',
      width: '100%',
      padding: theme.spacing(1),
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {},
  })
);

const stringToColour = (str: string) => {
  let hash = 0;
  [...Array(str.length)].forEach((_, index) => {
    hash = str.charCodeAt(index) + ((hash << 5) - hash);
  });
  let color = '#';
  [...Array(3)].forEach((_, index) => {
    const value = (hash >> (index * 4)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  });
  return color;
};

type Props = {
  project: Project;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const popperMenuItems = [
  [
    {label: 'Delete', key: 'delete', icon: Delete},
    {label: 'Edit', key: 'edit', icon: Edit},
  ],
];

export default function ProjectCard(props: Props) {
  const {project, onClick} = props;
  const avatarChar = useMemo(() => project.title[0].toUpperCase(), [project]);
  const avatarColor = useMemo(() => stringToColour(project.title), [project]);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick} className={classes.button}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' style={{backgroundColor: avatarColor}}>
              {avatarChar}
            </Avatar>
          }
          action={
            <PopperMenu itemsList={popperMenuItems}>
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            </PopperMenu>
          }
          title={project.title}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='body2' color='textSecondary' component='p'>
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className={classes.actions}>
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
