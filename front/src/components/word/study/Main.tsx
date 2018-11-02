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
import { compose, withApollo, WithApolloClient } from 'react-apollo';
import { F_PREV_CARD, F_NEXT_CARD, PrevCardProps, NextCardProps, GQL_CARD, F_STUDY_SET, StudySetProps } from '@gql';
import { CardQuery } from '@hoc';

class Main extends React.Component<Props, State> {
  state = {
    transform: false,
  };

  async componentWillMount() {
    const { studySet } = this.props;

    console.log(studySet);
    // const { setId, actions } = this.props;

    // const result = await Api.studySet(setId);

    // actions.saveStudySet(result);
  }

  /** カード回し */
  handleRotate = () => this.setState({ transform: !this.state.transform });
  // /** 前へ */
  // handleNext = () => this.props.actions.nextCard();
  // /** 次へ */
  // handlePrev = () => this.props.actions.prevCard();

  render() {
    const { classes, nextCard, prevCard } = this.props;

    return (
      <CardQuery query={GQL_CARD}>
        {({ loading, data, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <h1>ERROR</h1>;
          if (!data || !data.card) return null;

          const { card } = data;

          return (
            <div className={classes.root} style={{ transform: this.state.transform ? 'rotateY(180deg)' : '' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={prevCard}
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
                    {card.word}
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
                onClick={nextCard}
              >
                次へ
            </Button>
            </div>
          );
        }}
      </CardQuery>
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

export interface State {
  [key: string]: any;
  transform: boolean;
}

/** OwnProps */
export interface OwnProps {
}

export interface Props extends WithApolloClient<any> { }

export default withApollo(Main);
// compose(F_PREV_CARD, F_NEXT_CARD)
