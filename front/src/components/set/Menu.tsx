import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
// import { graphql } from 'react-apollo';
// import Sets from '@gql/sets';

class Menu extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify="flex-start"
        classes={{
          container: classes.container,
        }}
      >
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button variant="contained" fullWidth >
            単語学習
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button variant="contained" fullWidth >
            単語テスト
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button variant="contained" fullWidth >
            今日の単語
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: 'inherit',
  },
  item: {
    width: '100%',
    margin: '0px 16px',
  },
});

export default withStyles(styles)(Menu);

export interface Props extends WithStyles<StyleRules> {
}
