import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions,
  IconButton, Typography, Button,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import classnames from 'classnames';
import { Query } from 'react-apollo';
import { STUDY_SET } from '@queries';
import { Study, Api } from '@actions';
import { IState } from '@models';
import { StudySetVariables } from 'typings/graphql';

class Main extends React.Component<Props, State> {
  state = {
    transform: false,
  };

  async componentWillMount() {
    const { setId, actions } = this.props;

    const result = await Api.studySet(setId);

    actions.saveStudySet(result);
  }

  /** カード回し */
  handleRotate = () => this.setState({ transform: !this.state.transform });
  /** 前へ */
  handleNext = () => this.props.actions.nextCard();
  /** 次へ */
  handlePrev = () => this.props.actions.prevCard();

  render() {
    const { classes, setId } = this.props;

    return (
      <StudySet query={STUDY_SET} variables={{ setId }}>
        {({ loading, data, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <h1>ERROR</h1>;
          if (!data || Object.keys(data).length === 0) return <div></div>;

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
                onClick={this.handleNext}
              >
                次へ
            </Button>
            </div>
          );
        }}
      </StudySet>

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

class StudySet extends Query<StudySet, StudySetVariables> { }

export interface State {
  [key: string]: any;
  transform: boolean;
}

/** StateProps */
export interface StateProps {
  setId: string;
}
/** DispatchProps */
export interface DispatchProps {
  actions: Study.Actions;
}
/** OwnProps */
export interface OwnProps {
}

export interface Props extends OwnProps, DispatchProps, StateProps, WithStyles<StyleRules> { }

const mapStateToProps = (state: IState): StateProps => ({
  setId: state.get('app').setId as string,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(Study, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Main));
