import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import SetList from '../func/SetList';

class Main extends React.Component<Props, {}> {

  render() {
    return (
      <SetList />
    );
  }
}

const styles = (): StyleRules => ({

});

export default withStyles(styles)(Main);

export interface Props extends WithStyles<StyleRules> {

}
