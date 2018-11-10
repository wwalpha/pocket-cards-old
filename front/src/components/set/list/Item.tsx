import * as React from 'react';
import {
  StyleRulesCallback, Theme, WithStyles, withStyles,
  Grid, Avatar, ListItem as MListItem, ListItemText,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
// import { RemoveBtn } from '.';
import { PATH, PATH_INDEX } from '@const';
import { compose } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';
import { UpdateSetId, UpdatePath } from '@gql/local';
import  Swipeable from 'react-swipeable';

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
        {/* <RemoveBtn setId={setId} /> */}
        <MListItem
          button
          divider
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
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ palette, spacing: { unit } }: Theme) => ({
  root: {
    width: '100%',
  },
  avatar: {
    backgroundColor: palette.secondary.light,
    width: `${4.5 * unit}px`,
    height: `${4.5 * unit}px`,
  },
  list: { padding: '0px' },
  listitem: {
    flex: 1,
    paddingTop: unit,
    paddingBottom: unit,
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
