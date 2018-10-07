import * as React from 'react';
import {
  StyleRulesCallback, Theme, WithStyles, withStyles,
  Slide, Grid, Avatar, ListItem as MListItem, ListItemText, Button, Paper,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import red from '@material-ui/core/colors/red';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SetRemove, SetRemoveVariables } from 'typings/graphql';
import { setRemove } from '@gql/set';
import { Redirect } from 'react-router';

class ListItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  render() {
    const { classes, primaryText, secondaryText, match, setId, userId } = this.props;

    return (
      <Grid container>
        <Paper
          elevation={1}
          classes={{
            elevation1: classes.paper,
          }}>
          <SetRemoveMutation mutation={setRemove} variables={{ userId, setId }}>
            {(setRemove, { data }) => {
              if (data) {
                return (
                  <Redirect to="/set" />
                );
              }

              return (
                <Button
                  variant="contained"
                  classes={{ root: classes.button }}
                  disableRipple
                  onClick={setRemove as any}
                >
                  DELETE
              </Button>
              );
            }}
          </SetRemoveMutation>
          <MListItem
            button
            disableRipple
            classes={{ root: classes.listitem }}
            component={(props: any) => (<Link to={`${match.path}/menu`} {...props} />)}
          >
            <Avatar classes={{ root: classes.avatar }}>
              <FolderIcon />
            </Avatar>
            <ListItemText
              primary={primaryText}
              secondary={secondaryText}
            />
          </MListItem>
          {/* <Slide direction="left" in={this.state.delOpened} mountOnEnter unmountOnExit>

          </Slide> */}
        </Paper>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    margin: '4px 16px',
    width: '100%',
    borderRadius: '2px',
    display: 'flex',
    backgroundColor: theme.palette.grey['200'],
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
  list: { padding: '0px' },
  listitem: {
    flex: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  button: {
    borderRadius: '0px',
    color: '#fff',
    backgroundColor: red[700],
    width: '80px',
    transform: 'translateX(130)',
    transition: 'all 300ms 0s ease',
    marginRight: '24px',
  },
});

export default withStyles(styles)(withRouter(ListItem));

export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps {
  userId: string;
  setId: string;
  primaryText: string;
  secondaryText?: string;
}

class SetRemoveMutation extends Mutation<SetRemove, SetRemoveVariables> { }
