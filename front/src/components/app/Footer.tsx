import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {
  Home as HomeIcon, Person as PersonIcon, WebAsset as WebAssetIcon,
} from '@material-ui/icons';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { PATH, PATH_INDEX } from '@const';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'react-apollo';
import { UpdatePath } from '@gql/local';

class Footer extends React.Component<Props, {}> {
  state = {
    value: 0,
  };

  handleChange = (_: React.ChangeEvent<{}>, value: number) => this.setState({ value });

  handleLink = async (to: string, path: number) => {
    // パス更新
    await this.props.updatePath(path);

    this.props.history.push(to);
  }

  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation
        value={this.state.value}
        onChange={this.handleChange}
        classes={{
          root: classes.footer,
        }}
      >
        <BottomNavigationAction
          icon={<HomeIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => this.handleLink(PATH.HOME.ROOT, PATH_INDEX.HOME_ROOT)}
        />
        <BottomNavigationAction
          icon={<WebAssetIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => this.handleLink(PATH.SET.ROOT, PATH_INDEX.SET_ROOT)}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => this.handleLink(PATH.USER.ROOT, PATH_INDEX.USER_ROOT)}
        />
      </BottomNavigation>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  actionSelected: {
    paddingTop: '8px !important',
  },
  footer: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    color: theme.palette.grey['400'],
    backgroundColor: 'white',
  },
});

export interface Props extends UpdatePath.Props, RouteComponentProps, WithStyles<StyleRules> { }

export default compose(
  UpdatePath,
  withStyles(styles),
  withRouter,
)(Footer);
