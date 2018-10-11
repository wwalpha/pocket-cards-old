import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { APP_INFO } from '@gql';
import { Query } from 'react-apollo';
import { AppInfo } from 'typings/types';
import { HEADER } from '@const';

class Header extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <AppQuery
        query={APP_INFO}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          if (!data) return null;

          const { app } = data;
          const info = HEADER[`${app.screen}`];

          return (
            <AppBar position="static" classes={{ root: classes.root }}>
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.grow}>
                  {info.title}
                </Typography>
                <IconButton color="inherit">
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          );
        }}
      </AppQuery>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

class AppQuery extends Query<AppInfo, any> { }

export interface Props extends WithStyles { }

export default withStyles(styles)(Header);
