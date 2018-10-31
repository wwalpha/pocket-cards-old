import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { HEADER, IconInfo } from '@const';
import { IState } from '@models';
import { App } from '@actions';
import { UpdatePath } from '@comp/hoc';

class Header extends React.Component<Props> {

  renderIcon = (item: IconInfo, key: number) => {
    const { actions } = this.props;

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
          component={(props: any) => (
            <UpdatePath
              to={item.path}
              path={item.index}
              updatePath={actions.updatePath}
              {...props}
            />
          )}
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
    const { classes, path } = this.props;

    // 未初期化
    if (path === -1) return <div />;

    const info = HEADER[path];

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

/** StateProps */
export interface StateProps {
  path: number;
}
/** DispatchProps */
export interface DispatchProps {
  actions: App.Actions;
}
/** OwnProps */
export interface OwnProps { }

export interface Props extends OwnProps, DispatchProps, StateProps, WithStyles<StyleRules> { }

const mapStateToProps = (state: IState) => ({
  path: state.get('app').path,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(App, dispatch),
});

export default connect<StateProps, void, Props, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));
