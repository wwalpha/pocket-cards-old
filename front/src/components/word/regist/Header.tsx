import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import {
  ArrowBack as BackIcon, PhotoCamera as CameraIcon,
} from '@material-ui/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class Header extends React.Component<Props, {}> {

  render() {
    const { classes, history } = this.props;

    return (
      <AppBar position="static" classes={{ root: classes.header }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => history.goBack()}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="subheading" color="inherit" className={classes.grow}>
            新規単語
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Menu"
          >
            <CameraIcon />
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
