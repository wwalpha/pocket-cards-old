import * as React from 'react';
import {
  StyleRulesCallback, Theme, WithStyles, withStyles,
  Grid, Avatar, ListItem as MListItem, ListItemText, Paper,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
// import { RemoveBtn } from '.';
import { PATH, PATH_INDEX } from '@const';
import { compose } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';
import { UpdateSetId, UpdatePath } from '@gql/local';

class ListItem extends React.Component<Props, any> {
  state = {
    delOpened: false,
  };

  handleTouchMove = () => this.setState({ delOpened: !this.state.delOpened });

  /** セットクリック */
  handleClick = async () => {
    const { setId, updateSetId, updatePath, history } = this.props;

    // セットID更新
    await updateSetId(setId);
    // パス更新
    await updatePath(PATH_INDEX.WORD_ROOT);
    // 画面遷移
    history.push(PATH.WORD.ROOT);
  }

  render() {
    const { classes, primaryText, secondaryText } = this.props;

    return (
      <Grid container>
        <Paper
          elevation={1}
          classes={{
            elevation1: classes.paper,
          }}>
          {/* <RemoveBtn setId={setId} /> */}
          <MListItem
            button
            disableRipple
            classes={{ root: classes.listitem }}
            onClick={this.handleClick}
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

/** OwnProps */
export interface OwnProps {
  setId: string;
  primaryText: string;
  secondaryText?: string;
}

// React Props
export interface Props extends OwnProps, UpdatePath.Props, UpdateSetId.Props, RouteComponentProps, WithStyles { }

export default compose(
  UpdateSetId.default,
  UpdatePath.default,
  withStyles(styles),
  withRouter,
)(ListItem) as React.ComponentType<OwnProps>;
