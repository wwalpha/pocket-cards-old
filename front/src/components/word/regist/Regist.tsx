import * as React from 'react';
import { withStyles, StyleRules, WithStyles, Theme } from '@material-ui/core/styles';
import { List, Grid, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Query } from 'react-apollo';
import { USER_INFO } from '@gql';
import { AddBtn, Header } from '.';

class Regist extends React.Component<Props, State> {
  state = {
    words: [],
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column">
        <Grid item>
          <List component="nav" >
            <ListItem button classes={{ root: classes.listItem }}>
              <ListItemText primary="Inbox" />
            </ListItem>
            <Divider />
            <ListItem button divider classes={{ root: classes.listItem }}>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button classes={{ root: classes.listItem }}>
              <ListItemText primary="Trash" />
            </ListItem>
            <Divider light />
            <ListItem button classes={{ root: classes.listItem }}>
              <ListItemText primary="Spam" />
            </ListItem>
          </List>
        </Grid>
        <Grid container justify="flex-end" classes={{ container: classes.command }}>
          <Query query={USER_INFO}>
            {({ data: { user } }) => {
              console.log(user);
              return (
                <AddBtn name={name} userId={user && user.id} />
              );
            }}
          </Query>
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

export default withStyles(styles)(Regist);
