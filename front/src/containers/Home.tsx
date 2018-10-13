import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { RouteComponentProps, withRouter } from 'react-router';

class Home extends React.Component<Props, {}> {

  render() {

    return (
      <div>1111</div>
    );
  }
}

const styles = (): StyleRules => ({
});

export default withRouter(withStyles(styles)(Home));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
