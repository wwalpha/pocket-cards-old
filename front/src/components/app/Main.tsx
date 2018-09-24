import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import SetList from '@comp/set/List';
import SetMenu from '@comp/set/Menu';
import { Route } from 'react-router';

class Main extends React.Component<Props, {}> {

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={SetList} />
        <Route exact path="/menu" component={SetMenu} />
      </React.Fragment>
    );
  }
}

const styles = (): StyleRules => ({

});

export default withStyles(styles)(Main);

export interface Props extends WithStyles<StyleRules> {

}

