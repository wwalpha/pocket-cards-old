import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { HEADER, IconInfo } from '@const';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'react-apollo';
import { UpdatePath, StatusInfo } from '@gql/local';

class Header extends React.Component<Props> {

  handleClick = async ({ path, index }: IconInfo) => {
    if (!path || !index) return;

    // パス更新
    await this.props.updatePath(index);
    // 画面遷移
    this.props.history.push(path);
  }

  renderIcon = (item: IconInfo, key: number) => {

    // カスタマイズあり
    if (item.customize) {
      return <item.customize key={key} />;
    }

    // Icon未設定、表示しない
    if (!item.icon) return null;

    if (item.path) {
      return (
        <IconButton
          key={key}
          color="inherit"
          onClick={() => this.handleClick(item)}
        >
          <item.icon />
        </IconButton>
      );
    }

    return (
      <IconButton key={key} color="inherit" >
        <item.icon />
      </IconButton>
    );
  }

  render() {
    const { classes, status } = this.props;

    const { path } = status;
    const info = HEADER[path];

    console.log(status, path, info, HEADER);
    return (
      <AppBar position="static" classes={{ root: classes.root }}>
        <Toolbar>
          {(() => {
            if (!info.left || info.left.length === 0) return null;

            return info.left.map((item, idx) => this.renderIcon(item, idx));
          })()}
          <Typography color="inherit" className={classes.grow}>
            {info.title}
          </Typography>
          {(() => {
            if (!info.right || info.right.length === 0) return null;

            return info.right.map((item, idx) => this.renderIcon(item, idx));
          })()}
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
  },
  grow: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

export interface Props extends UpdatePath.Props, StatusInfo.Props, RouteComponentProps, WithStyles<StyleRules> { }

export default compose(
  UpdatePath.default,
  StatusInfo.default,
  withRouter,
  withStyles(styles),
)(Header);
