import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { withApollo, WithApolloClient, compose } from 'react-apollo';
import { StudySet, StudySetVariables, StudySet_studySet } from 'typings/graphql';
import Card from '../Card';
import { GQL_STUDY_SET, StudyAnswer } from '@gql/appsync';
import { readStatus, StatusInfo } from '@gql/local';

class Main extends React.Component<Props, State> {
  state: State = {
    transform: false,
    index: -1,
  };

  /** 初期処理 */
  async componentWillMount() {
    const { client } = this.props;

    const statusInfo = readStatus(client.cache);

    // エラーチェック
    if (!statusInfo.status.setId) return;

    // Graph Query
    const result = await client.query<StudySet, StudySetVariables>({
      query: GQL_STUDY_SET,
      variables: {
        setId: statusInfo.status.setId,
      },
      fetchPolicy: 'network-only',
    });

    // ローカルに保存する
    this.setState({
      studySet: (result.data.studySet as StudySet_studySet[]),
      index: 0,
    });
  }

  /** 次へ */
  handleAnswer = async (correct: boolean) => {
    const { status, studyAnswer } = this.props;
    const { studySet, index } = this.state;

    if (!studySet || !status.setId) return;

    // 回答
    await studyAnswer({
      setId: status.setId,
      word: studySet[index].word,
      correct,
      times: studySet[index].times,
    });

    this.setState({ index: this.state.index + 1 });
  }

  render() {
    const { studySet, index } = this.state;

    // Loading...
    if (index < 0 || !studySet) return <div>Loading...</div>;
    // No Data
    if (studySet.length === 0) return <div>Nothing...</div>;
    // No Data
    if (studySet.length === index) return <div>Finish...</div>;

    const card = studySet[index];

    return (
      <React.Fragment>
        <Card card={card} />
        <Grid container justify="space-around">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => this.handleAnswer(false)}
          >
            知らない
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => this.handleAnswer(true)}
          >
            知ってる
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = ({ spacing: { unit } }: Theme): StyleRules => ({
});

export interface State {
  studySet?: StudySet_studySet[];
  transform: boolean;
  index: number;
}

/** OwnProps */
export interface TProps { }

export interface Props extends StudyAnswer.Props, StatusInfo.Props, WithApolloClient<TProps>, WithStyles<StyleRules> { }

export default compose(
  StudyAnswer.default,
  StatusInfo.default,
  withApollo,
  withStyles(styles),
)(Main);
