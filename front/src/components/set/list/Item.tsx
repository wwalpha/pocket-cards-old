import * as React from 'react';
import { StyleRules } from '@material-ui/core/styles';
import {
  StyleRulesCallback, Theme, WithStyles, withStyles,
  Grid, Avatar, ListItem as MListItem, ListItemText, Paper,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { graphql, ChildProps } from 'react-apollo';
import { UpdatePathVariables, UpdatePathProps, AppInfo } from 'typings/local';
import { UPDATE_PATH } from '@gql';
import { RemoveBtn } from '.';
import { PATH, PATH_INDEX } from '@const';

class ListItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  render() {
    const { classes, primaryText, secondaryText, setId, userId, onPathChange } = this.props;

    return (
      <Grid container>
        <Paper
          elevation={1}
          classes={{
            elevation1: classes.paper,
          }}>
          <RemoveBtn setId={setId} userId={userId} />
          <MListItem
            button
            disableRipple
            classes={{ root: classes.listitem }}
            onClick={() => onPathChange(PATH_INDEX.WORD_ROOT)}
            component={(props: any) => (<Link to={PATH.WORD.ROOT} {...props} />)}
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
});

export interface IProps {
  userId: string;
  setId: string;
  primaryText: string;
  secondaryText?: string;
}

export interface TProps extends UpdatePathProps, IProps { }

export type TChildProps = ChildProps<TProps, AppInfo, UpdatePathVariables>;

export interface Props extends TProps, WithStyles<StyleRules>, RouteComponentProps { }

export default graphql<TProps, AppInfo, UpdatePathVariables, TChildProps>(UPDATE_PATH, {
  props: ({ data, mutate, ownProps }) => ({
    ...data,
    ...ownProps,
    onPathChange: (path?: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
})(withStyles(styles)(withRouter(ListItem)));
