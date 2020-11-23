import React, {useMemo} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import {injectInterval} from '../../../utils/array';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {display: 'flex'},
    paper: {marginRight: theme.spacing(2)},
    clickable: {cursor: 'pointer'},
  })
);

export type MenuItemType = {
  label: string | React.ElementType;
  key: string | number;
  icon?: typeof SvgIcon;
};

type Props = {
  itemsList: MenuItemType[][];
  onSelect?: (item: MenuItemType) => void;
};

const PopperMenu: React.FC<Props> = (props) => {
  const {itemsList, onSelect, children} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const {
    handleToggle,
    handleClose,
    handleSelect,
    handleListKeyDown,
  } = useMemo(() => {
    const handleToggle = (event: React.MouseEvent<EventTarget>) => {
      event.stopPropagation();
      setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      )
        return;
      setOpen(false);
    };
    const handleSelect = (item: MenuItemType) => (
      event: React.MouseEvent<EventTarget>
    ) => {
      event.stopPropagation();
      handleClose(event);
      onSelect && onSelect(item);
    };
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
    return {
      handleToggle,
      handleClose,
      handleSelect,
      handleListKeyDown,
    };
  }, [onSelect]);

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) anchorRef.current!.focus();
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        className={classes.clickable}
      >
        {children}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                >
                  {injectInterval<any>(
                    itemsList.map((items) =>
                      items.map((item) => (
                        <MenuItem onClick={handleSelect(item)} key={item.key}>
                          {item.icon && (
                            <ListItemIcon>
                              {React.createElement(item.icon, {})}
                            </ListItemIcon>
                          )}
                          {item.label}
                        </MenuItem>
                      ))
                    ),
                    <Divider />
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default PopperMenu;
