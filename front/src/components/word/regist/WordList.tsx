import * as React from 'react';
import { Grid, List, ListItem, ListItemText, Divider, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Query } from 'react-apollo';
import { NEW_WORD_INFO } from '@gql';
import { AddBtn } from '@comp/set/regist';
import { StyleRules } from '@material-ui/core/styles';
import { NewwordInfo } from 'typings/local';

class WordList extends React.Component<Props, State> {
  state = {
    words: [],
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column">
        <Grid item>
          <NewwordQuery query={NEW_WORD_INFO}>
            {({ data, error, loading }) => {
              if (loading) return 'loading';
              if (error) {
                console.log(error);
                return 'Error';
              }

              if (!data) return;

              const items = data.words.map(item => (
                <ListItem button classes={{ root: classes.listItem }}>
                  <ListItemText primary={item} />
                </ListItem>
              ));
              return (
                <List component="nav" >
                  {items}
                </List>
              );
            }}
          </NewwordQuery>
        </Grid>
        <Grid container justify="flex-end" classes={{ container: classes.command }}>
          <AddBtn name={name} userId={user && user.id} />
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

export interface Props extends WithStyles<StyleRules> { }

export interface State {
  [key: string]: any;
}

class NewwordQuery extends Query<NewwordInfo, any> { }

export default withStyles(styles)(WordList);
