import * as React from 'react';
import { graphql, compose, MutateProps } from 'react-apollo';
import { Button, colors } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { SET_DELETE, GET_LIST } from '@gql';
import { USER } from '@queries';
import { UserInfo } from 'typings/local';
import { SetRemoveVariables, SetRemove, GetSetList, GetSetListVariables } from 'typings/graphql';

class RemoveBtn extends React.Component<Props> {

  handleRemove = () => {
    const { mutate, setId, user: { id: userId } } = this.props;

    mutate({
      refetchQueries: [{
        query: GET_LIST, variables: { userId },
      }],
      variables: {
        userId, setId,
      },
      update: (proxy) => {
        const query = GET_LIST;

        // セットリスト再リフレッシュ
        const data = proxy.readQuery<GetSetList, GetSetListVariables>({
          query,
          variables: { userId },
        });

        if (!data || !data.sets) return;

        // 選択したセットIDを画面から削除する
        data.sets = [
          ...data.sets.filter(item => item && item.setId !== setId),
        ];

        proxy.writeQuery({ query, data });
      },
    });

  }

  render() {
    const { classes } = this.props;

    return (
      <Button
        variant="contained"
        classes={{ root: classes.button }}
        disableRipple
        onClick={this.handleRemove}
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

// GraphQL Props
export interface IProps extends MutateProps<SetRemove, SetRemoveVariables>, UserInfo { }
// React Props
export interface Props extends IProps, UserInfo, WithStyles {
  setId: string;
}

export default compose(USER, graphql(SET_DELETE, {
  props: ({ mutate, ownProps }) => ({ mutate, ownProps }),
}))(withStyles(styles)(RemoveBtn));
