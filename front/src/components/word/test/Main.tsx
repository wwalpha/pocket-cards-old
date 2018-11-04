import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
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

  /** 次へ */
  handleNext = () => this.setState({ index: this.state.index + 1 });

  render() {
    console.log('state', this.state);

    if (this.state.index < 0 || !this.state.studySet) {
      return <div>Loading...</div>;
    }

    const { classes } = this.props;
    const { studySet } = this.state;
    const card = studySet[this.state.index];

    return (
      <React.Fragment>
        <Card card={card} />
        <Grid container justify="center" classes={{ container: classes.bottom }}>
          <Button
            variant="contained"
            color="secondary"
            classes={{ root: classes.button }}
            onClick={this.handleNext}
          >
            知らない
          </Button>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.button }}
            onClick={this.handleNext}
          >
            知ってる
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = ({ spacing: { unit } }: Theme): StyleRules => ({
  button: {
    margin: `0px ${unit * 2}px`,
  },
  bottom: {
    height: `${unit * 6}px`,
  },
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
