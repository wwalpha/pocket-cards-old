import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { Card as MCard, CardContent, Typography, CardActions, Grid, IconButton } from '@material-ui/core';
import { Favorite as FavoriteIcon } from '@material-ui/icons';
import classnames from 'classnames';
import { StudySet_studySet } from 'typings/graphql';

class Card extends React.Component<Props, State> {
  state: State = {
    transform: false,
  };

  /** カード回し */
  handleRotate = () => this.setState({ transform: !this.state.transform });

  render() {
    const { classes, card } = this.props;

    return (
      <div className={classes.root} style={{ transform: this.state.transform ? 'rotateY(180deg)' : '' }}>
        <MCard classes={{ root: classes.card }}>
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
        </MCard>
        <MCard classes={{
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
                  {(() => {
                    if (!card.pronunciation) return null;
                    return `/${card.pronunciation}/`;
                  })()}
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
        </MCard>
      </div>
    );
  }
}

const styles = ({ spacing: { unit } }: Theme): StyleRules => ({
  root: {
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    height: '80%',
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

export interface OwnProps {
  card: StudySet_studySet;
}
export interface Props extends OwnProps, WithStyles<StyleRules> { }

export interface State {
  transform: boolean;
  card?: StudySet_studySet;
}

export default withStyles(styles)(Card);
