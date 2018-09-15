import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import SetList from '../func/SetList';
import { Switch, Route } from 'react-router';

class Main extends React.Component<Props, {}> {

  render() {
    return (
      <Switch >
        <Route exact path="/list" components={SetList} />
        <Route path="/menu" components={SetList} />
        <Route path="/word" components={SetList} />
      </Switch>
    );
  }
}

const styles = (): StyleRules => ({

});

export default withStyles(styles)(Main);

export interface Props extends WithStyles<StyleRules> {

}
