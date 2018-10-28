import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, CardActions,
  IconButton, Typography,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import classnames from 'classnames';
import { graphql, compose, MutateProps } from 'react-apollo';
import { STUDY_SET } from '@gql';
import { StudySetVariables, StudySet } from 'typings/graphql';
import { STATUS } from '@queries';
import { StatusInfo } from 'typings/local';

class Study extends React.Component<Props, State> {
  state = {
    transform: false,
  };

  componentWillMount() {
    console.log(11111);
    const { mutate, status: { setId } } = this.props;

    // 単語一覧を取得する
    mutate({
      variables: { setId },
      update: (proxy, result) => {
        console.log(result);
      },
    });
  }

  handleClick = () => this.setState({ transform: !this.state.transform });

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{ transform: this.state.transform ? 'rotateY(180deg)' : '' }}>
        <Card classes={{ root: classes.card }}>
          <CardHeader
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent classes={{ root: classes.body }} onClick={this.handleClick}>
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
          <CardContent classes={{ root: classes.body }} onClick={this.handleClick}>
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
export interface TProps extends MutateProps<StudySet, StudySetVariables>, StatusInfo { }
// React Props
export interface Props extends IProps, TProps, WithStyles { }
// React extenal Props
export interface IProps { }

export interface State {
  [key: string]: any;
  transform: boolean;
}

const G_STUDY_SET = graphql(STUDY_SET, {
  props: ({ mutate, ownProps }) => ({ mutate, ownProps }),
});

export default withStyles(styles)(compose(STATUS, G_STUDY_SET)(Study)) as React.ComponentType<IProps>;
