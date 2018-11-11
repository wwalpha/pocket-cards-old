import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button, Divider, Typography } from '@material-ui/core';
import { PATH, PATH_INDEX } from '@const';
import { compose } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';
import { UpdatePath } from '@gql/local';
import { Book } from '@material-ui/icons';

class Menu extends React.Component<Props, {}> {

  handleClick = async (to: string, path: number) => {
    // パス更新
    await this.props.updatePath(path);
    // 画面遷移
    this.props.history.push(to);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        classes={{
          container: classes.container,
        }}
      >
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            classes={{ root: classes.button }}
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.REGIST, PATH_INDEX.WORD_REGIST)}
          >
            <Book color="secondary" />
            <Typography variant="button" classes={{ button: classes.text }} >
              新規単語
            </Typography>
          </Button>
          <Divider />
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            classes={{ root: classes.button }}
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.STUDY, PATH_INDEX.WORD_STUDY)}
          >
            <Book color="secondary" />
            <Typography variant="button" classes={{ button: classes.text }} >
              単語学習
            </Typography>
          </Button>
          <Divider />
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            classes={{ root: classes.button }}
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.TEST, PATH_INDEX.WORD_TEST)}
          >
            <Book color="secondary" />
            <Typography variant="button" classes={{ button: classes.text }} >
              単語テスト
            </Typography>
          </Button>
          <Divider />
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            classes={{ root: classes.button }}
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.HISTORY, PATH_INDEX.WORD_HISTORY)}
          >
            <Book color="secondary" />
            <Typography variant="button" classes={{ button: classes.text }} >
              今日の単語
            </Typography>
          </Button>
        </Grid>
      </Grid>

    );
  }
}

const styles = ({ spacing: { unit } }: Theme): StyleRules => ({
  container: {
    // height: 'inherit',
  },
  item: {
    width: '100%',
    paddingBottom: '2px',
  },
  button: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderRadius: 0,
    letterSpacing: '0.25em',
    justifyContent: 'left',
  },
  text: {
    padding: `0px ${unit}px`,
  },
});

/** OwnProps */
export interface OwnProps {
}

export interface Props extends OwnProps, UpdatePath.Props, RouteComponentProps, WithStyles<StyleRules> { }

export default compose(
  UpdatePath.default,
  withRouter,
  withStyles(styles),
)(Menu);
