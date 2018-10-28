import * as React from 'react';
import { compose, graphql, MutateProps } from 'react-apollo';
import { Button } from '@material-ui/core';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';
import { RegistWords, RegistWordsVariables } from 'typings/graphql';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StatusInfo, UpdatePathProps, ClearNewwordsProps } from 'typings/local';
import { WORDS_REGIST } from '@gql';
import { PATH, PATH_INDEX } from '@const';
import { STATUS } from '@queries';
import { pathChange, clearNewwords } from '@utils/mutations';

class RegistBtn extends React.Component<Props> {

  handleRegist = () => {
    const { history, status, updatePath, clearNewwords, mutate, words } = this.props;

    // 新規単語登録
    mutate({
      variables: {
        setId: status.setId,
        words,
      },
      update: (_, result) => {
        if (!result.data || !result.data.registWords) return;

        // パス情報変更
        updatePath(PATH_INDEX.WORD_ROOT);
        // 新規担当一覧をクリアする
        clearNewwords();

        // 単語ホーム画面に遷移する
        history.push(PATH.WORD.ROOT);
      },
    });
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
export interface IProps extends MutateProps<RegistWords, RegistWordsVariables>, StatusInfo { }
// React Props
export interface Props extends IProps, UpdatePathProps, ClearNewwordsProps, RouteComponentProps, WithStyles {
  words: string[];
}

export default compose(STATUS, pathChange, clearNewwords, graphql(WORDS_REGIST, {
  props: ({ mutate }) => ({ mutate }),
}))(withStyles(styles)(withRouter(RegistBtn)));
