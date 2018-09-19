import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import SetList from '@comp/set/List';
import { Route } from 'react-router-dom';

class Main extends React.Component<Props, {}> {

  render() {
    return (
      <React.Fragment>
        <SetList />
        <Route exact path="/" components={SetList} />
        <Route path="/menu" components={SetList} />
        <Route path="/word" components={SetList} />
      </React.Fragment>
    );
  }
}

const styles = (): StyleRules => ({

});

export default withStyles(styles)(Main);

export interface Props extends WithStyles<StyleRules> {

}
