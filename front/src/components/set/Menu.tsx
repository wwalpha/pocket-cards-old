import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { PATH } from '@const';

class Menu extends React.Component<Props, {}> {

  render() {
    const { classes, match } = this.props;

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
            component={(props: any) => (<Link to={`${match.path}${PATH.SET_NEW_WORD}`} {...props} />)}
          >
            新規単語
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            component={(props: any) => (<Link to={`${match.path}${PATH.SET_STUDY}`} {...props} />)}
          >
            単語学習
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button variant="contained" fullWidth >
            単語テスト
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            component={(props: any) => (<Link to={`${match.path}${PATH.SET_HISTORY}`} {...props} />)}
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

export default withStyles(styles)(withRouter(Menu));

export interface Props extends WithStyles<StyleRules>, RouteComponentProps {
}
