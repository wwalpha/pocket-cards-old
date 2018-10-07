import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
          icon={<RestoreIcon />}
          classes={{
            root: classes.actionSelected,
          }}
          disableRipple
          disableTouchRipple
          component={(props: any) => (
            <Link to="/set" {...props} />
          )}
        />
        <BottomNavigationAction
          icon={<FavoriteIcon />}
          classes={{
            root: classes.actionSelected,
          }}
          disableRipple
          disableTouchRipple
          component={(props: any) => (
            <Link to="/" {...props} />
          )}
        />
        <BottomNavigationAction
          icon={<LocationOnIcon />}
          classes={{
            root: classes.actionSelected,
          }}
          disableRipple
          disableTouchRipple
        />
      </BottomNavigation>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  actionSelected: {
    paddingTop: '8px !important',
    color: 'white',
  },
  footer: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles)(Footer);

export interface Props extends WithStyles<StyleRules> {

}
