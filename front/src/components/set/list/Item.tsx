import * as React from 'react';
import { StyleRules } from '@material-ui/core/styles';
import {
  StyleRulesCallback, Theme, WithStyles, withStyles,
  Grid, Avatar, ListItem as MListItem, ListItemText, Paper,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RemoveBtn } from '.';
import { PATH, PATH_INDEX } from '@const';
import UpdatePath from '@comp/hoc/UpdatePath';
// import { updateSetId } from '@utils/mutations';
import { ChildProps, graphql } from 'react-apollo';
import { UPDATE_SET_ID } from '@gql';
import { UpdateSetIdVariables, StatusInfo } from 'typings/local';

class ListItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  render() {
    const { classes, primaryText, secondaryText, setId, userId, updateSetId } = this.props;

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
            onClick={() => { updateSetId && updateSetId(setId); }}
            component={(props: any) => (
              <UpdatePath path={PATH_INDEX.WORD_ROOT} to={PATH.WORD.ROOT} {...props} />
            )}
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

/** React Input Props */
export interface IProps {
  userId: string;
  setId: string;
  primaryText: string;
  secondaryText?: string;
}
/** GraphQL Props */
export interface UpdateSetIdProps extends IProps, UpdateSetIdVariables {
  updateSetId?: (id: string) => void;
}
/** ChildProps */
export type UpdateSetIdChildProps = ChildProps<UpdateSetIdProps, StatusInfo, UpdateSetIdVariables>;
/** React Props */
export interface Props extends UpdateSetIdProps, WithStyles, RouteComponentProps { }

const updateSetId = graphql<UpdateSetIdProps, StatusInfo, UpdateSetIdVariables, UpdateSetIdChildProps>(UPDATE_SET_ID, {
  props: ({ mutate, ownProps }) => ({
    ...ownProps,
    updateSetId: (id: string) => {
      mutate && mutate({
        variables: { id },
      });
    },
  }),
});

export default updateSetId(withStyles(styles)(withRouter(ListItem)));
