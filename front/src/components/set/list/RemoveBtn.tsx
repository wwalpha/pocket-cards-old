import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { Button, colors } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { SET_DELETE, GET_LIST } from '@gql';
import { SetRemoveVariables, SetRemove_deleteSet, GetSetList, GetSetListVariables } from 'typings/graphql';

class RemoveBtn extends React.Component<Props> {

  render() {
    const { classes, mutate } = this.props;

    return (
      <Button
        variant="contained"
        classes={{ root: classes.button }}
        disableRipple
        onClick={mutate as any}
      >
        REMOVE
      </Button>
    );
  }
}

const styles = (): StyleRules => ({
  button: {
    borderRadius: '0px',
    color: '#fff',
    backgroundColor: colors.red[700],
    width: '80px',
    transform: 'translateX(130)',
    transition: 'all 300ms 0s ease',
    marginRight: '24px',
  },
});

export interface Props extends ChildProps<SetRemoveVariables, SetRemove_deleteSet>, WithStyles { }

export default graphql<SetRemoveVariables, SetRemove_deleteSet>(SET_DELETE, {
  options: ({ userId, setId }) => ({
    variables: { userId, setId },
    refetchQueries: [{
      query: GET_LIST, variables: { userId },
    }],
    update: (proxy) => {
      const query = GET_LIST;
      const data = proxy.readQuery<GetSetList, GetSetListVariables>({
        query,
        variables: { userId },
      });

      if (!data || !data.sets) return;

      data.sets = [
        ...data.sets.filter(item => item && item.setId !== setId),
      ];

      proxy.writeQuery({ query, data });
    },
  }),
  props: ({ data, mutate, ownProps }) => ({ ...data, mutate, ownProps }),
})(withStyles(styles)(RemoveBtn));
