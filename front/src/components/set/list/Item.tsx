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
import RemoveBtn from './RemoveBtn';

class ListItem extends React.Component<Props, State> {
  state: State = {
    screenX: 0,
    moveLeft: false,
    moveRight: false,
  };

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

  /** 移動開始 */
  handleTouchStart = (e: React.TouchEvent) => this.setState({
    screenX: e.touches[0].screenX,
    moveRight: false,
    moveLeft: false,
  })

  /** 移動中 */
  handleTouchMove = (e: React.TouchEvent) => {
    const oldPoint = this.state.screenX;
    const newPoint = e.touches[0].screenX;

    if (newPoint > oldPoint) {
      this.setState({ moveLeft: false, moveRight: true });
    } else {
      this.setState({ moveLeft: true, moveRight: false });
    }
  }
  /** 移動終了 */
  // handleTouchEnd = (e: React.TouchEvent) => this.setState({ moveRight: false, moveLeft: false });

  /** 削除ボタン */
  handleRemove = () => this.setState({ moveLeft: false, moveRight: false });

  render() {
    const { classes, primaryText, secondaryText, userId, setId } = this.props;
    const { moveRight } = this.state;

    return (
      <Grid container>
        <RemoveBtn
          userId={userId}
          setId={setId}
          show={moveRight}
          onRemove={this.handleRemove}
        />
        <MListItem
          button
          divider
          disableRipple
          classes={{ root: classes.listitem }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          // onTouchEnd={this.handleTouchEnd}
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
  userId: string;
  setId: string;
  primaryText: string;
  secondaryText?: string;
}

export interface State {
  screenX: number;
  moveLeft: boolean;
  moveRight: boolean;
}

// React Props
export interface Props extends OwnProps, UpdatePath.Props, UpdateSetId.Props, RouteComponentProps, WithStyles { }

export default compose(
  UpdateSetId.default,
  UpdatePath.default,
  withStyles(styles),
  withRouter,
)(ListItem) as React.ComponentType<OwnProps>;
