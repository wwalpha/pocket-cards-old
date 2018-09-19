import * as React from 'react';
import { withStyles, StyleRules } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import { graphql } from 'react-apollo';

import { Props } from '@typings/Sets';
// import Sets from '@gql/sets';
import Item from './Item';

class SetList extends React.Component<Props, {}> {

  render() {

    return (
      <Grid container>
        <Item key={1} primaryText="1111" />
        <Item key={2} primaryText="2222" />
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

export default withStyles(styles)(SetList);
