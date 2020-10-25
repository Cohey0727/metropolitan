import {Theme} from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {StyleRules} from '@material-ui/styles/withStyles/withStyles';
import useResponsive, {ResponsiveInfo} from './useResponsive';

export type StyleRulesCallback<
  Props extends object,
  ClassKey extends string = string
> = (
  theme: Theme,
  responsiveInfo: ResponsiveInfo
) => StyleRules<Props, ClassKey>;

function makeResponsiveStyle<Props extends object = {}>(
  styleCallBack: StyleRulesCallback<Props, any>
) {
  return (props?: Props) => {
    const responsiveInfo = useResponsive();
    const useStyle = makeStyles<Theme, Props, any>((theme) =>
      styleCallBack(theme, responsiveInfo)
    );
    return useStyle(props as any);
  };
}

export default makeResponsiveStyle;
