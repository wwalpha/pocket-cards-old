import * as React from 'react';
import { Link } from 'react-router-dom';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {
  Home as HomeIcon, Person as PersonIcon, WebAsset as WebAssetIcon,
} from '@material-ui/icons';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { PATH, PATH_INDEX } from '@const';
import { IState } from '@models';
import { App } from '@actions';

class Footer extends React.Component<Props, {}> {
  state = {
    value: 0,
  };

  handleChange = (_: React.ChangeEvent<{}>, value: number) => this.setState({ value });

  render() {
    const { classes, actions } = this.props;

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
          onClick={() => actions && actions.updatePath(PATH_INDEX.HOME_ROOT)}
          component={(props: any) => (
            <Link to={PATH.HOME.ROOT} {...props} />
          )}
        />
        <BottomNavigationAction
          icon={<WebAssetIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => actions && actions.updatePath(PATH_INDEX.SET_ROOT)}
          component={(props: any) => (
            <Link to={PATH.SET.ROOT} {...props} />
          )}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => actions && actions.updatePath(PATH_INDEX.USER_ROOT)}
          component={(props: any) => (
            <Link to={PATH.USER.ROOT} {...props} />
          )}
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

/** DispatchProps */
export interface DispatchProps {
  actions: App.Actions;
}

export interface Props extends DispatchProps, WithStyles<StyleRules> { }

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(App, dispatch),
});

export default connect<void, DispatchProps, void, IState>(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Footer));
