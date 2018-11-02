import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Grid, List, WithStyles, withStyles, Button, ListItemText, ListItem } from '@material-ui/core';
import { StyleRules, Theme } from '@material-ui/core/styles';
import { PATH_INDEX, PATH } from '@const';
import { compose } from 'react-apollo';
import { F_UPDATE_PATH, UpdatePathProps, ClearNewwordsProps, F_CLEAR_NEW_WORDS, GQL_NEW_WORDS } from '@gql';
import { NewwordsQuery } from '@hoc';

class Regist extends React.Component<Props, State> {
  state = {
    words: [],
  };

  handleRegist = async () => {
    const { history, updatePath, clearNewwords } = this.props;

    // 単語登録
    // await API.graphql({
    //   query: REGIST_WORDS,
    //   variables: {
    //     input: {
    //       setId, words,
    //     },
    //   } as RegistWordsVariables,
    // });

    // パス更新
    updatePath(PATH_INDEX.WORD_ROOT);
    // 新単語クリア
    clearNewwords();
    // 単語ホーム画面に遷移する
    history.push(PATH.WORD.ROOT);
  }

  render() {
    const { classes } = this.props;

    return (
      <NewwordsQuery query={GQL_NEW_WORDS}>
        {({ data }) => {
          if (!data) return null;

          const items = data.newwords.words.map((item, idx) => (
            <ListItem key={idx} divider button classes={{ root: classes.listItem }}>
              <ListItemText primary={item} />
            </ListItem>
          ));

          return (
            <Grid container direction="column">
              <Grid item>
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
        }}
      </NewwordsQuery>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  listItem: {
    backgroundColor: theme.palette.grey['200'],
    width: 'inherit',
  },
  command: {
    padding: `0px ${theme.spacing.unit * 2}px`,
  },
});

export interface State {
  [key: string]: any;
}

export interface Props extends ClearNewwordsProps, UpdatePathProps, RouteComponentProps, WithStyles<StyleRules> { }

export default compose(F_UPDATE_PATH, F_CLEAR_NEW_WORDS)(withStyles(styles)(withRouter(Regist)));
