import * as React from 'react';
import { withStyles, StyleRules } from '@material-ui/core/styles';
import { graphql } from 'react-apollo';
import { Props, SetsVars } from '@typings/Sets';
import Sets from '@gql/sets';

class SetList extends React.Component<Props, {}> {

  render() {

    return (
      <div>1111</div>
    );
  }
}

const styles = (): StyleRules => ({

});

export default withStyles(styles)(graphql<Props, {}, SetsVars>(Sets, {
  props: () => ({

  }),
})(SetList));
