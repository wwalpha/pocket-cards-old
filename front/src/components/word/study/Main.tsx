import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { withApollo, WithApolloClient } from 'react-apollo';
import { StudySet, StudySetVariables, StudySet_studySet } from 'typings/graphql';
import Card from '../Card';
import { GQL_STUDY_SET } from '@gql/appsync';
import { readStatus } from '@gql/local';

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
    });

    // ローカルに保存する
    this.setState({
      studySet: (result.data.studySet as StudySet_studySet[]),
      index: 0,
    });
  }

  // /** 前へ */
  handleNext = () => this.setState({ index: this.state.index + 1 });
  // /** 次へ */
  handlePrev = () => this.setState({ index: this.state.index - 1 });

  render() {
    const { studySet, index } = this.state;

    // Loading...
    if (index < 0 || !studySet) return <div>Loading...</div>;
    // No Data
    if (studySet.length === 0) return <div>Nothing...</div>;

    const card = studySet[index];

    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          disabled={index === 0}
          onClick={this.handlePrev}
        >
          前へ
        </Button>
        <Card card={card} />
        <Button
          variant="contained"
          color="primary"
          disabled={(studySet.length - 1) === index}
          onClick={this.handleNext}
        >
          次へ
        </Button>
      </React.Fragment>
    );
  }
}

const styles = (): StyleRules => ({
});

export interface State {
  studySet?: StudySet_studySet[];
  transform: boolean;
  index: number;
}

/** OwnProps */
export interface TProps { }

export interface Props extends WithApolloClient<TProps>, WithStyles<StyleRules> { }

export default withStyles(styles)(withApollo(Main));
