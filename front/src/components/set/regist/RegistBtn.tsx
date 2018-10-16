import * as React from 'react';
import { ChildProps, withApollo, WithApolloClient } from 'react-apollo';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { SetRegist, SetRegistVariables } from 'typings/graphql';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { APP_INFO } from '@gql';
import { ApolloQueryResult } from 'apollo-client';
import { PATH } from '@const';
import { AppInfo } from 'typings/local';

class RegistBtn extends React.Component<Props> {

  handleRegist = async () => {
    const { client, history, regist, name } = this.props;

    // Cache検索
    const data = client.readQuery<AppInfo>(APP_INFO);
    if (!data) return;

    const { user } = data.app;

    // 新規セット登録
    regist && await regist(user.id, name);

    // メニュー画面に戻る
    history.push(PATH.SET.ROOT);
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
  name: string;
}

export interface TProps extends IProps {
  regist?: (userId: string, name: string) => Promise<ApolloQueryResult<SetRegist>> | undefined;
}

export type TChildProps = ChildProps<TProps, SetRegist, SetRegistVariables>;

export interface Props extends WithApolloClient<TProps>, WithStyles, RouteComponentProps { }

export default withApollo<TProps, SetRegist>(withStyles(styles)(withRouter(RegistBtn)), {
  props: ({ mutate, data, ownProps }) => ({
    ...data,
    ...ownProps,
    regist: (userId: string, name: string) => mutate && mutate({
      variables: {
        userId, name,
      },
    }),
  }),
});
