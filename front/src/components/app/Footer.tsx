import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {
  Home as HomeIcon, Person as PersonIcon, WebAsset as WebAssetIcon,
} from '@material-ui/icons';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { graphql, ChildProps } from 'react-apollo';
import { UPDATE_PATH } from '@gql';
import { AppInfo } from 'typings/types';
import { UpdatePathVariables, UpdatePath, UpdatePath_updatePath } from 'typings/local';
import { PATH } from '@const';

class Footer extends React.Component<Props, {}> {
  state = {
    value: 0,
  };

  handleChange = (e: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value });

    // const { mutate } = this.props;
    // if (value === 1) {

    // }
    console.log(this.props);
  }

  render() {
    const { classes, onScreenChange } = this.props;

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
          component={(props: any) => <Link to={PATH.HOME.ROOT} {...props} />}
        />
        <BottomNavigationAction
          icon={<WebAssetIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={PATH.SET.ROOT} {...props} />}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          classes={{ root: classes.actionSelected }}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to="/user" {...props} />}
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

export interface IProps {
  onScreenChange: (path: number) => void;
}

export interface TProps extends UpdatePathVariables, IProps { }

export type TChildProps = ChildProps<TProps, AppInfo, UpdatePathVariables>;

export interface Props extends IProps, TChildProps, WithStyles<StyleRules>, RouteComponentProps { }

export default graphql<TProps, AppInfo, UpdatePathVariables, TChildProps>(UPDATE_PATH, {
  props: ({ data, mutate, ownProps }) => ({
    ...data,
    ...ownProps,
    onScreenChange: (path: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
})(withStyles(styles)(withRouter(Footer)));
