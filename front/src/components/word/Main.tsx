import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Regist, History, Menu } from '.';

class Main extends React.Component<Props, {}> {

  render() {
    const { classes, match, children } = this.props;

    return (
      <Grid
        container
        classes={{
          container: classes.container,
        }}
      >
        <Switch>
          <Route exact path={`${match.path}`} component={Menu} />
          <Route path={`${match.path}/regist`} component={Regist} />
          <Route path={`${match.path}/history`} component={History} />
        </Switch>
        <Route children={children} />
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    // height: 'inherit',
  },
  item: {
    width: '100%',
    margin: '0px 16px',
  },
});

export default withStyles(styles)(withRouter(Main));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
