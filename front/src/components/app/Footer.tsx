import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  Home as HomeIcon, Person as PersonIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

class Footer extends React.Component<Props, {}> {
  state = {
    value: 0,
  };

  handleChange = (e: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value });
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
          classes={{
            root: classes.actionSelected,
          }}
          disableRipple
          disableTouchRipple
          component={(props: any) => (
            <Link to="/home" {...props} />
          )}
        />
        <BottomNavigationAction
          icon={<PersonIcon />}
          classes={{
            root: classes.actionSelected,
          }}
          disableRipple
          disableTouchRipple
          component={(props: any) => (
            <Link to="/user" {...props} />
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

export default withStyles(styles)(Footer);

export interface Props extends WithStyles<StyleRules> {

}
