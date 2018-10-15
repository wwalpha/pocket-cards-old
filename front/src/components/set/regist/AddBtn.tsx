import * as React from 'react';
import { ChildProps, withApollo, WithApolloClient } from 'react-apollo';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { RegistWords, RegistWordsVariables } from 'typings/graphql';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { APP_INFO } from '@gql';
import { ApolloQueryResult } from 'apollo-client';
import { PATH } from '@const';
import { AppInfo } from 'typings/local';

class RegistBtn extends React.Component<Props> {

  handleRegist = () => {
    const { client, history, regist, words } = this.props;

    // Cache検索
    const data = client.readQuery<AppInfo>(APP_INFO);
    if (!data) return;

    const { user, status } = data.app;

    // 新規単語登録
    const ret = regist(user.id, status.setId, words);

    // メニュー画面に戻る
    ret && ret.then(() => history.push(PATH.WORD.ROOT));
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleRegist}
      >
        登録
     </Button>
    );
  }
}

const styles = (): StyleRules => ({
});

export interface IProps {
  words: string[];
  regist: (userId: string, setId: string, words: string[]) => Promise<ApolloQueryResult<RegistWords>> | undefined;
}

export interface TProps extends IProps { }

export type TChildProps = ChildProps<TProps, RegistWords, RegistWordsVariables>;

export interface Props extends WithApolloClient<TProps>, WithStyles, RouteComponentProps { }

export default withApollo<TProps, RegistWords>(withStyles(styles)(withRouter(RegistBtn)), {
  props: ({ mutate, data, ownProps }) => ({
    ...data,
    ...ownProps,
    regist: (userId: string, setId: string, words: string[]) => mutate && mutate({
      variables: {
        userId, setId, words,
      },
    }),
  }),
});
// export default withRouter(withStyles(styles)(withApollo<TProps, RegistWords>(RegistBtn)));
// export interface Props extends ChildProps<SetRegistVariables, SetRegist>, WithStyles { }

// export default graphql<SetRegistVariables, SetRegist>(SET_REGIST, {
//   options: ({ userId }) => ({
//     refetchQueries: [{
//       query: GET_LIST, variables: { userId },
//     }],
//     update: (proxy, { data }) => {
//       // Query from cache
//       const query = GET_LIST;
//       const list = proxy.readQuery<GetSetList, GetSetListVariables>({
//         query,
//         variables: { userId },
//       });

//       // 必須チェック
//       if (!list || !list.sets) return;
//       if (!data) return;

//       // merge datas
//       list.sets.push(data.createSet);

//       // write to cache
//       proxy.writeQuery({ query, data: list });
//     },
//   }),
//   props: ({ data, mutate, ownProps }) => ({
//     ...data,
//     mutate,
//     ...ownProps,
//   }),
// })(withStyles(styles)(AddBtn));
