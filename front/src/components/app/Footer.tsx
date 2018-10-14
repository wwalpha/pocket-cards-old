import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {
  Home as HomeIcon, Person as PersonIcon, WebAsset as WebAssetIcon,
} from '@material-ui/icons';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PATH, PATH_INDEX } from '@const';
import UpdatePath from '@comp/hoc/UpdatePath';

class Footer extends React.Component<Props, {}> {
  state = {
    value: 0,
  };

  handleChange = (e: React.ChangeEvent<{}>, value: number) => this.setState({ value });

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
          component={(props: any) => <UpdatePath to={PATH.HOME.ROOT} path={PATH_INDEX.HOME_ROOT} {...props} />}
        />
        <BottomNavigationAction
          icon={<WebAssetIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          component={(props: any) => <UpdatePath to={PATH.SET.ROOT} path={PATH_INDEX.SET_ROOT} {...props} />}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          component={(props: any) => <UpdatePath to={PATH.USER.ROOT} path={PATH_INDEX.USER_ROOT} {...props} />}
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

export interface Props extends WithStyles<StyleRules>, RouteComponentProps { }

export default withStyles(styles)(withRouter(Footer));
