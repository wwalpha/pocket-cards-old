import * as React from 'react';
import { Grid, List, ListItem, ListItemText, Theme, WithStyles, withStyles } from '@material-ui/core';
import { graphql, DataValue } from 'react-apollo';
import { GQL_NEW_WORDS } from '@gql';
import { StyleRules } from '@material-ui/core/styles';
import { Newwords } from 'typings/local';
import { RegistBtn } from '.';

class WordList extends React.Component<Props, State> {
  state = {
    words: [],
  };

  render() {
    const { classes, newwords } = this.props;

    if (!newwords) return null;

    const items = newwords.words.map((item, idx) => (
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
          <RegistBtn words={newwords} />
        </Grid>
      </Grid>
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

export interface Props extends DataValue<Newwords, any>, WithStyles<StyleRules> { }

export interface State {
  [key: string]: any;
}

export default graphql<any, Newwords, any>(GQL_NEW_WORDS, {
  props: ({ data }) => ({ ...data }),
})(withStyles(styles)(WordList));
