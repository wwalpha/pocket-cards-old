import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import {
  Card, CardContent, CardActions,
  IconButton, Typography, Button, Grid,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import classnames from 'classnames';
import { withApollo, WithApolloClient } from 'react-apollo';
import { GQL_STUDY_SET } from '@gql';
import { StudySet, StudySetVariables, StudySet_studySet } from 'typings/graphql';
import { readStatus } from 'src/graphql/local/utils';

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

  /** カード回し */
  handleRotate = () => this.setState({ transform: !this.state.transform });
  // /** 前へ */
  handleNext = () => this.setState({ index: this.state.index + 1 });
  // /** 次へ */
  handlePrev = () => this.setState({ index: this.state.index - 1 });

  render() {
    const { classes } = this.props;
    console.log('state', this.state);

    if (this.state.index < 0 || !this.state.studySet) {
      return <div>Loading...</div>;
    }

    const { studySet, index } = this.state;
    const card = studySet[this.state.index];

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
        <div className={classes.root} style={{ transform: this.state.transform ? 'rotateY(180deg)' : '' }}>
          <Card classes={{ root: classes.card }}>
            <CardContent classes={{ root: classes.body }} onClick={this.handleRotate}>
              <Grid container
                direction="column"
                alignItems="center"
                justify="center"
                classes={{
                  container: classes.container,
                  item: classes.item,
                }}
              >
                <Grid item classes={{ item: classes.item }}>
                  <Typography component="h2" variant="display2">
                    {card.word}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card classes={{
            root: classnames(classes.card, classes.rotate),
          }}>
            <CardContent classes={{ root: classes.body }} onClick={this.handleRotate}>
              <Grid container
                direction="column"
                alignItems="center"
                justify="center"
                classes={{ container: classes.container }}
              >
                <Grid item classes={{ item: classes.item }}>
                  <Typography component="h2" variant="display2">
                    /{card.pronunciation}/
                  </Typography>
                </Grid>
                <Grid item classes={{ item: classes.item }}>
                  <Typography component="h2" variant="display2">
                    {card.vocabulary}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
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

const styles = ({ spacing: { unit } }: Theme): StyleRules => ({
  root: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    height: '85%',
    padding: `${unit * 2}px 0px`,
  },
  card: {
    width: '100%',
    height: 'calc(100% - 32px)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
  },
  body: {
    flexGrow: 1,
    height: 'calc(100% - 92px)',
  },
  rotate: {
    transform: 'rotateY(180deg)',
  },
  container: {
    height: '100%',
  },
  item: {
    padding: `${unit}px`,
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
