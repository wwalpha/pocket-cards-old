import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions,
  IconButton, Typography, Button,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import classnames from 'classnames';
import { withApollo, WithApolloClient } from 'react-apollo';
import { STUDY_SET, GQL_STATUS_INFO, GQL_SAVE_WORD_LIST, GQL_NEXT_WORD, GQL_PREV_WORD } from '@gql';
import { StudySetVariables, StudySet } from 'typings/graphql';
import { StatusInfo, SaveWordList, SaveWordListVariables, WordInput, NextWord } from 'typings/local';

class Main extends React.Component<Props, State> {
  state = {
    transform: false,
  };

  async componentWillMount() {
    const { client } = this.props;
    // get setid
    const statusQuery = await client.query<StatusInfo, any>({ query: GQL_STATUS_INFO });
    // get word list
    const studyQuery = await client.query<StudySet, StudySetVariables>({
      query: STUDY_SET,
      variables: {
        setId: statusQuery.data.status.setId,
      },
    });
    const data = studyQuery.data.studySet;

    // ローカルに保存する
    await client.mutate<SaveWordList, SaveWordListVariables>({
      mutation: GQL_SAVE_WORD_LIST,
      variables: {
        list: data as WordInput[],
      },
    });
  }

  /** カード回し */
  handleRotate = () => this.setState({ transform: !this.state.transform });
  /** 前へ */
  handleNext = () => this.props.client.mutate({
    mutation: GQL_NEXT_WORD,
  })
  /** 次へ */
  handlePrev = () => this.props.client.mutate({
    mutation: GQL_PREV_WORD,
  })

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{ transform: this.state.transform ? 'rotateY(180deg)' : '' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handlePrev}
        >
          前へ
        </Button>
        <Card classes={{ root: classes.card }}>
          <CardHeader
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent classes={{ root: classes.body }} onClick={this.handleRotate}>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
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
          <CardHeader
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent classes={{ root: classes.body }} onClick={this.handleRotate}>
            <Typography component="p">
              解釈
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}
        >
          次へ
        </Button>
      </div>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'all 1s ease',
    cursor: 'pointer',
    height: 'inherit',
  },
  card: {
    width: '100%',
    height: 'inherit',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px',
  },
  body: {
    flexGrow: 1,
  },
  rotate: {
    transform: 'rotateY(180deg)',
  },
});

// GraphQL Props
// export interface TProps extends MutateProps<StudySet, StudySetVariables>, StatusInfo { }
export interface TProps { }
// React Props
export interface Props extends IProps, WithApolloClient<TProps>, WithStyles { }
// React extenal Props
export interface IProps { }

export interface State {
  [key: string]: any;
  transform: boolean;
}

export default withApollo(withStyles(styles)(Main));
