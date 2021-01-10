import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
}
