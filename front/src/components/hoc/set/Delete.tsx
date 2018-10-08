import * as React from 'react';
import { graphql, ChildDataProps } from 'react-apollo';
import { Button, colors } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { DELETE } from '@gql/set';
import { SetRemove, SetRemoveVariables, SetRemove_deleteSet } from 'typings/graphql';

class Delete extends React.Component<Props> {

  render() {
    const { data, classes } = this.props;

    return (
      <Button
        variant="contained"
        classes={{ root: classes.button }}
        disableRipple
        onClick={deleteSet as any}
      >
        DELETE
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

type ChildProps = ChildDataProps<SetRemoveVariables, SetRemove_deleteSet, SetRemoveVariables>;

export interface Props extends ChildProps, WithStyles { }

export default graphql<SetRemoveVariables, SetRemove_deleteSet, SetRemoveVariables, ChildProps>(DELETE, {
  options: ({ setId, userId }) => ({
    variables: { setId, userId },
  }),
  props: ({ data, ownProps }) => ({ data, ...ownProps } as ChildProps),
})(withStyles(styles)(Delete));
