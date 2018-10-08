import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {
  Add as AddIcon, ArrowBack as BackIcon,
} from '@material-ui/icons';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

class Header extends React.Component<Props, {}> {

  render() {
    const { classes, match, history } = this.props;

    return (
      <AppBar position="static" classes={{ root: classes.header }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <IconButton
            color="inherit"
            aria-label="Menu"
            component={(props: any) => (
              <Link to={`${match.path}`} {...props} />
            )}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="subheading" color="inherit" className={classes.grow}>
            セット一覧
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Menu"
            component={(props: any) => (
              <Link to={`${match.path}/regist`} {...props} />
            )}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  header: {
    backgroundColor: theme.palette.grey['400'],
    color: 'black',
    flexGrow: 1,
  },
  toolbar: {
    minHeight: '48px',
  },
  grow: {
    flexGrow: 1,
  },
});

export default withStyles(styles)(withRouter(Header));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
