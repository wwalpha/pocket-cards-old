import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {
  Home as HomeIcon, Person as PersonIcon, WebAsset as WebAssetIcon,
} from '@material-ui/icons';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { UPDATE_PATH } from '@gql';
import { PATH, PATH_INDEX } from '@const';
import { UpdatePathProps, AppInfo, UpdatePathVariables, UpdatePathChildProps } from 'typings/local';

class Footer extends React.Component<Props, {}> {
  state = {
    value: 0,
  };

  handleChange = (e: React.ChangeEvent<{}>, value: number) => this.setState({ value });

  render() {
    const { classes, onPathChange } = this.props;

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
          onClick={() => onPathChange(PATH_INDEX.HOME_ROOT)}
          component={(props: any) => <Link to={PATH.HOME.ROOT} {...props} />}
        />
        <BottomNavigationAction
          icon={<WebAssetIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => onPathChange(PATH_INDEX.SET_ROOT)}
          component={(props: any) => <Link to={PATH.SET.ROOT} {...props} />}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          onClick={() => onPathChange(PATH_INDEX.USER_ROOT)}
          component={(props: any) => <Link to={PATH.USER.ROOT} {...props} />}
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

export interface Props extends UpdatePathProps, WithStyles<StyleRules>, RouteComponentProps { }

export default graphql<UpdatePathProps, AppInfo, UpdatePathVariables, UpdatePathChildProps>(UPDATE_PATH, {
  props: ({ data, mutate, ownProps }) => ({
    ...data,
    ...ownProps,
    onPathChange: (path?: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
})(withStyles(styles)(withRouter(Footer)));
