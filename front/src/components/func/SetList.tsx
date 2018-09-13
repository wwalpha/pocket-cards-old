import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Paper, List, MenuItem, Divider } from '@material-ui/core';
import MenuList from './MenuList';

class SetList extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <MenuList />
    );
  }
}

const styles = (): StyleRules => ({

});

export default withStyles(styles)(SetList);

export interface Props extends WithStyles<StyleRules> {
}
