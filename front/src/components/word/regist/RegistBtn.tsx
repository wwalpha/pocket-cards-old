import * as React from 'react';
import { compose, graphql, MutateProps } from 'react-apollo';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { RegistWords, RegistWordsVariables } from 'typings/graphql';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserInfo, StatusInfo } from 'typings/local';
import { WORDS_REGIST } from '@gql';
import { PATH } from '@const';
import { user, status } from '@queries';

class RegistBtn extends React.Component<Props> {

  handleRegist = async () => {
    const { history, user, status, mutate } = this.props;

    // 新規単語登録
    await mutate({
      variables: {
        userId: user.id,
        setId: status.setId,
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

// GraphQL Props
export interface IProps extends MutateProps<RegistWords, RegistWordsVariables>, UserInfo, StatusInfo { }
// React Props
export interface Props extends IProps, RouteComponentProps, WithStyles {
  words: string[];
}

export default compose(user, status, graphql(WORDS_REGIST, {
  props: ({ mutate }) => ({ mutate }),
}))(withStyles(styles)(withRouter(RegistBtn)));
