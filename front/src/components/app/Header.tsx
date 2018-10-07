import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" classes={{ root: classes.root }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Pocket Cards
          </Typography>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar >
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(Header);

export interface Props extends WithStyles<StyleRules> {

}
