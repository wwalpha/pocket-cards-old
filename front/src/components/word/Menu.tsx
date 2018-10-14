import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PATH, PATH_INDEX } from '@const';
import UpdatePath from '@comp/hoc/UpdatePath';

class Menu extends React.Component<Props, {}> {

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
            component={(props: any) => (
              <UpdatePath to={PATH.WORD.REGIST} path={PATH_INDEX.WORD_REGIST} {...props} />
            )}
          >
            新規単語
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            component={(props: any) => (
              <UpdatePath to={PATH.WORD.STUDY} path={PATH_INDEX.WORD_STUDY} {...props} />
            )}
          >
            単語学習
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            component={(props: any) => (
              <UpdatePath to={PATH.WORD.TEST} path={PATH_INDEX.WORD_TEST} {...props} />
            )}
          >
            単語テスト
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            component={(props: any) => (
              <UpdatePath to={PATH.WORD.HISTORY} path={PATH_INDEX.WORD_HISTORY} {...props} />
            )}
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

export default withStyles(styles)(Menu);

export interface Props extends WithStyles<StyleRules> {
}
