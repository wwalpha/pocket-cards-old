import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { graphql } from 'react-apollo';
import Sets from '@gql/sets';
import ListItem from './ListItem';
import { getSetList_sets } from 'typings/graphql';

class SetList extends React.Component<Props, {}> {

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

export default withStyles(styles)(graphql<Props, {}, GraphQLVariable>(Sets, {
  props: ({ data: { } }) => ({

  }),
})(SetList));

export interface GraphQLVariable extends getSetList_sets {

}
export interface Props extends WithStyles<StyleRules>, GraphQLVariable {
}
