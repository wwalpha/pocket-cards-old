import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router';
import { Header, List, Regist } from '@comp/home';

class Set extends React.Component<Props, {}> {

  render() {
    const { match, children } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route exact path={`${match.path}`} component={List} />
          <Route path={`${match.path}/regist`} component={Regist} />
        </Switch>
        <Route children={children} />
      </React.Fragment>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: 'inherit',
  },
  item: {
    width: '100%',
    padding: '0px 16px',
  },
});

export default withRouter(withStyles(styles)(Set));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
