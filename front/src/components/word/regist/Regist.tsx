import * as React from 'react';
import { Grid, List, ListItem, ListItemText, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Query } from 'react-apollo';
import { NEW_WORD_INFO } from '@gql';
import { StyleRules } from '@material-ui/core/styles';
import { Newwords } from 'typings/local';
import { RegistBtn } from '.';

class WordList extends React.Component<Props, State> {
  state = {
    words: [],
  };

  render() {
    const { classes } = this.props;

    return (
      <NewwordQuery query={NEW_WORD_INFO}>
        {({ data, error, loading }) => {
          if (loading) return 'loading';
          if (error) return 'Error';
          if (!data || !data.newwords) return null;

          const items = data.newwords.map((item, idx) => (
            <ListItem key={idx} divider button classes={{ root: classes.listItem }}>
              <ListItemText primary={item} />
            </ListItem>
          ));

          const userId = data.user.id;

          return (
            <Grid container direction="column">
              <Grid item>
                <List component="nav" >
                  {items}
                </List>
              </Grid>
              <Grid container justify="flex-end" classes={{ container: classes.command }}>
                <RegistBtn words={data.newwords} />
              </Grid>
            </Grid>

          );
        }}
      </NewwordQuery>
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

export interface Props extends WithStyles<StyleRules> { }

export interface State {
  [key: string]: any;
}

class NewwordQuery extends Query<Newwords, any> { }

export default withStyles(styles)(WordList);
