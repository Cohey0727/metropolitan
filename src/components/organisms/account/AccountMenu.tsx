import React, {useCallback} from 'react';
import {Avatar} from '@material-ui/core';
import PopperMenu, {MenuItemType} from '../../atoms/buttons/PopperMenu';
import {useAuth0} from '@auth0/auth0-react';
import {makeStyles} from '@material-ui/core/styles';

const accountMenu: MenuItemType[][] = [
  [
    {
      label: '個人設定',
      key: 'accountSetting',
    },
    {
      label: 'ヘルプ',
      key: 'help',
    },
  ],
  [
    {
      label: 'ログアウト',
      key: 'logout',
    },
  ],
];

const useStyles = makeStyles(() => ({
  avatar: {
    width: 32,
    height: 32,
  },
}));

const AccountMenu = () => {
  const {user, logout} = useAuth0();
  const classes = useStyles();
  const handleSelect = useCallback(
    (item: MenuItemType) => {
      if (item.key === 'logout') logout({returnTo: window.location.origin});
    },
    [logout]
  );
  return (
    <PopperMenu itemsList={accountMenu} onSelect={handleSelect}>
      <Avatar src={user.picture} alt={user.nickname} className={classes.avatar} />
    </PopperMenu>
  );
};

export default AccountMenu;
