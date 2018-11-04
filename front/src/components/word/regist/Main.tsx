import { PATH, PATH_INDEX } from '@const';
import { Button, Grid, List, Theme, WithStyles, withStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';
import * as React from 'react';
import { compose } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import ListItem from './ListItem';
import { Newwords, UpdatePath, StatusInfo } from '@gql/local';
import { RegistWords } from '@gql/appsync';

class Regist extends React.Component<Props, State> {
  state: State = {
    origin: [],
    words: [],
  };

  static getDerivedStateFromProps(props: Props, state: State): State {
    const diff: string[] = [];

    if (props.newwords.length > 0) {
      props.newwords.forEach((item) => {
        const r = state.origin.find(origin => origin === item);

        if (!r) diff.push(item);
      });
    }

    // 新規分なし
    if (diff.length === 0) {
      return state;
    }

    return {
      origin: state.origin.concat(diff),
      words: state.words.concat(diff),
    };
  }

  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  handleRemove = (word: string) => {
    this.setState({
      words: this.state.words.filter(item => item !== word),
    });
  }

  handleRegist = async () => {
    const { history, updatePath, registWords, status } = this.props;

    if (!status.setId) throw new Error('Set id is null.');

    await registWords({
      setId: status.setId,
      words: this.state.words,
    });

    // パス更新
    updatePath(PATH_INDEX.WORD_ROOT);
    // 単語ホーム画面に遷移する
    history.push(PATH.WORD.ROOT);
  }

  render() {
    const { classes, loading } = this.props;
    const { words } = this.state;

    if (loading) {
      return <div>loading...</div>;
    }

    if (words.length === 0) return null;

    const items = words.map((item, idx) =>
      <ListItem
        key={idx}
        word={item}
        onRemove={this.handleRemove}
      />,
    );

    return (
      <Grid container direction="column">
        <Grid item xs={12}>
          <List component="nav" >
            {items}
          </List>
        </Grid>
        <Grid container justify="flex-end" classes={{ container: classes.command }}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRegist}
          >
            登録
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const styles = ({ palette, spacing: { unit } }: Theme): StyleRules => ({
  listItem: {
    backgroundColor: palette.grey['200'],
    width: 'inherit',
  },
  command: {
    width: `${unit * 12}`,
  },
});

export interface State {
  origin: string[];
  words: string[];
}

export interface Props extends StatusInfo.Props, Newwords.Props, RegistWords.Props, UpdatePath.Props, RouteComponentProps, WithStyles<StyleRules> { }

export default compose(
  StatusInfo.default,
  UpdatePath.default,
  RegistWords.default,
  Newwords.default,
  withStyles(styles),
  withRouter,
)(Regist);
