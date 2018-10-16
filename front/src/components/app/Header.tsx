import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { APP_INFO } from '@gql';
import { Query } from 'react-apollo';
import { HEADER, IconInfo } from '@const';
import { AppInfo } from 'typings/local';
import UpdatePath from '@comp/hoc/UpdatePath';

class Header extends React.Component<Props> {

  renderIcon = (item: IconInfo, key: number) => {
    // カスタマイズあり
    if (item.customize) {
      return <item.customize />;
    }
    // Icon未設定、表示しない
    if (!item.icon) return null;

    if (item.path) {
      return (
        <IconButton
          key={key}
          color="inherit"
          component={(props: any) => <UpdatePath to={item.path} path={item.index} {...props} />}
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
      <AppQuery
        query={APP_INFO}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          if (!data) return null;

          console.log(data);
          const { app: { screen: { path } } } = data;
          const info = HEADER[path];

          console.log('info', info);
          return (
            <AppBar position="static" classes={{ root: classes.root }}>
              <Toolbar>
                {(() => {
                  if (!info.left || info.left.length === 0) return null;

                  return info.left.map((item, idx) => this.renderIcon(item, idx));
                })()}
                <Typography variant="title" color="inherit" className={classes.grow}>
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
      </AppQuery>
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

class AppQuery extends Query<AppInfo, any> { }

export interface Props extends WithStyles<StyleRules> { }

export default withStyles(styles)(Header);
