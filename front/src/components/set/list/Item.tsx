import * as React from 'react';
import {
  StyleRulesCallback, Theme, WithStyles, withStyles,
  Grid, Avatar, ListItem as MListItem, ListItemText, Paper,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RemoveBtn } from '.';
import { PATH, PATH_INDEX } from '@const';
import UpdatePath from '@comp/hoc/UpdatePath';
import { ChildProps, graphql, compose } from 'react-apollo';
import { UPDATE_SET_ID } from '@gql';
import { UpdateSetIdVariables, Status, UpdateSetId } from 'typings/local';

class ListItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  render() {
    const { classes, primaryText, secondaryText, setId, updateSetId } = this.props;

    return (
      <Grid container>
        <Paper
          elevation={1}
          classes={{
            elevation1: classes.paper,
          }}>
          <RemoveBtn setId={setId} />
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

// GraphQL Props
export interface UpdateSetIdProps {
  updateSetId: (id: string) => void;
}
/** ChildProps */
export type UpdateSetIdChildProps = ChildProps<UpdateSetIdProps, Status, UpdateSetIdVariables>;
// React 外部インターフェース
export interface IProps {
  setId: string;
  primaryText: string;
  secondaryText?: string;
}
// React Props
export interface Props extends IProps, UpdateSetIdProps, RouteComponentProps, WithStyles { }

const updateSetId = graphql<UpdateSetIdProps, UpdateSetId, UpdateSetIdVariables, UpdateSetIdChildProps>(UPDATE_SET_ID, {
  props: ({ mutate }) => ({
    updateSetId: (id: string) => {
      mutate && mutate({
        variables: {
          id,
        },
      });
    },
  }),
});

export default compose(updateSetId)(withStyles(styles)(withRouter(ListItem))) as React.ComponentType<IProps>;
