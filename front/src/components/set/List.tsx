import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import { graphql } from 'react-apollo';
// import Sets from '@gql/sets';
import ListItem from './ListItem';

class List extends React.Component<Props, {}> {

  render() {

    return (
      <Grid container>
        <ListItem key={1} primaryText="1133311" />
        <ListItem key={2} primaryText="223332223322" />
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({

});

// export default withStyles(styles)(graphql<Props, {}, SetsVars>(Sets, {
//   props: () => ({

//   }),
// })(SetList));

export default withStyles(styles)(List);

export interface Props extends WithStyles<StyleRules> {
}
