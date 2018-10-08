import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router';
import { Header, List, Menu, Regist } from '@comp/set';

class Set extends React.Component<Props, {}> {

  render() {
    const { match, children } = this.props;

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={`${match.path}`} component={List} />
          <Route path={`${match.path}/regist`} component={Regist} />
          <Route path={`${match.path}/menu`} component={Menu} />
        </Switch>
        <Route children={children} />
      </div>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: 'inherit',
  },
  item: {
    width: '100%',
    margin: '0px 16px',
  },
});

export default withRouter(withStyles(styles)(Set));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
