import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { RegistWords, RegistWordsVariables } from 'typings/graphql';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserInfo, StatusInfo } from 'typings/local';
import { USER_INFO, STATUS_INFO, WORDS_REGIST } from '@gql';
import { PATH } from '@const';

class RegistBtn extends React.Component<Props> {

  handleRegist = async () => {
    const { client, history } = this.props;

    // Cache検索
    const userInfo = client.readQuery<UserInfo>({ query: USER_INFO });
    if (!userInfo) return;
    const statusInfo = client.readQuery<StatusInfo>({ query: STATUS_INFO });
    if (!statusInfo) return;

    // 新規単語登録
    await client.mutate<RegistWords, RegistWordsVariables>({
      mutation: WORDS_REGIST,
      variables: {
        userId: userInfo.user.id,
        setId: statusInfo.status.setId,
      },
    });

    history.push(PATH.WORD.ROOT);
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
}

export interface Props extends WithApolloClient<IProps>, RouteComponentProps, WithStyles { }

export default withApollo<IProps>(withStyles(styles)(withRouter(RegistBtn)), {
  props: ({ }) => ({

  }),
});
