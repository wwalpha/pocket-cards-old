import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { Regist, History, Menu, Study } from '@comp/set';

class Main extends React.Component<Props, {}> {

  render() {
    const { classes, match, children } = this.props;

    return (
      <div className={classes.container}>
        <Switch>
          <Route exact path={`${match.path}`} component={Menu} />
          <Route path={`${match.path}/newword`} component={Regist} />
          <Route path={`${match.path}/study`} component={Study} />
          <Route path={`${match.path}/history`} component={History} />
        </Switch>
        <Route children={children} />
      </div>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: '100%',
  },
});

export default withStyles(styles)(withRouter(Main));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
