import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router';
import { SetRegist, SetRegistVariables, GetSetList, GetSetListVariables } from 'typings/graphql';
import { SET_REGIST, GET_LIST } from '@gql';

class AddBtn extends React.Component<Props> {

  render() {
    const { mutate, name, userId, history } = this.props;

    console.log(this.props);
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => mutate && mutate({
          variables: {
            userId,
            name,
          },
        }).then(() => history.push('/home'))}
      >
        登録
    </Button>
    );
  }
}

const styles = (): StyleRules => ({
});

export interface Props extends ChildProps<SetRegistVariables, SetRegist>, WithStyles, RouteComponentProps { }

export default graphql<SetRegistVariables, SetRegist>(SET_REGIST, {
  options: ({ userId }) => ({
    refetchQueries: [{
      query: GET_LIST, variables: { userId },
    }],
    update: (proxy, { data }) => {

      // Query from cache
      const query = GET_LIST;
      const list = proxy.readQuery<GetSetList, GetSetListVariables>({
        query,
        variables: { userId },
      });

      // 必須チェック
      if (!list || !list.sets) return;
      if (!data) return;

      // merge datas
      list.sets.push(data.createSet);

      // write to cache
      // proxy.writeQuery({ query, data: list });
    },
  }),
  props: ({ data, mutate, ownProps }) => ({
    ...data,
    mutate,
    ...ownProps,
  }),
})(withStyles(styles)(withRouter(AddBtn)));
