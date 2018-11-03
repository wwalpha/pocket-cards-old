import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { HEADER, IconInfo } from '@const';
import { GQL_STATUS_INFO } from '@gql';
import { UpdatePath, StatusInfoQuery } from '@hoc';

class Header extends React.Component<Props> {

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
          component={(props: any) => (
            <UpdatePath to={item.path} path={item.index} {...props} />
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
    const { classes } = this.props;

    return (
      <StatusInfoQuery query={GQL_STATUS_INFO}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          if (!data) return null;

          const { path } = data.status;
          const info = HEADER[path];

          console.log(path, info, HEADER);
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
        }}
      </StatusInfoQuery>
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

export interface Props extends WithStyles<StyleRules> { }

export default withStyles(styles)(Header);
