import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { PATH, PATH_INDEX } from '@const';
import { compose } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';
import { UpdatePath } from '@gql/local';

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
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.REGIST, PATH_INDEX.WORD_REGIST)}
          >
            新規単語
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.STUDY, PATH_INDEX.WORD_STUDY)}
          >
            単語学習
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.TEST, PATH_INDEX.WORD_TEST)}
          >
            単語テスト
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => this.handleClick(PATH.WORD.HISTORY, PATH_INDEX.WORD_HISTORY)}
          >
            今日の単語
          </Button>
        </Grid>
      </Grid>

    );
  }
}

const styles = (): StyleRules => ({
  container: {
    // height: 'inherit',
  },
  item: {
    width: '100%',
    margin: '0px 16px',
  },
});

/** OwnProps */
export interface OwnProps {
}

export interface Props extends OwnProps, UpdatePath.Props, RouteComponentProps, WithStyles<StyleRules> { }

export default compose(
  UpdatePath,
  withRouter,
  withStyles(styles),
)(Menu);
