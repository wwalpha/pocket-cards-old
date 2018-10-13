import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { APP_INFO, UPDATE_PATH } from '@gql';
import { Query, graphql } from 'react-apollo';
import { HEADER } from '@const';
import { Link } from 'react-router-dom';
import { AppInfo, UpdatePathChildProps, UpdatePathProps, UpdatePathVariables } from 'typings/local';

class Header extends React.Component<Props> {

  render() {
    const { classes, onPathChange } = this.props;

    return (
      <AppQuery
        query={APP_INFO}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          if (!data) return null;

          const { app: { path } } = data;
          const info = HEADER[path];

          console.log('info', info);
          return (
            <AppBar position="static" classes={{ root: classes.root }}>
              <Toolbar>
                {(() => {
                  if (!info.left || info.left.length === 0) return null;
                  const btns = info.left.map((item, idx) => (
                    <IconButton
                      key={idx}
                      color="inherit"
                      component={(props: any) => (
                        <Link
                          to={item.path}
                          {...props}
                          onClick={() => onPathChange(item.index)}
                        />
                      )}
                    >
                      <item.icon />
                    </IconButton>
                  ));
                  return btns;
                })()}
                <Typography variant="title" color="inherit" className={classes.grow}>
                  {info.title}
                </Typography>
                {(() => {
                  if (!info.right || info.right.length === 0) return null;
                  const btns = info.right.map((item, idx) => (
                    <IconButton
                      key={idx}
                      color="inherit"
                      component={(props: any) => (
                        <Link
                          to={item.path}
                          {...props}
                          onClick={() => onPathChange(item.index)}
                        />
                      )}
                    >
                      <item.icon />
                    </IconButton>
                  ));
                  return btns;
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

export interface Props extends UpdatePathChildProps, WithStyles<StyleRules> { }

export default graphql<UpdatePathProps, AppInfo, UpdatePathVariables, UpdatePathChildProps>(UPDATE_PATH, {
  props: ({ data, mutate, ownProps }) => ({
    ...data,
    ...ownProps,
    onPathChange: (path?: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
})(withStyles(styles)(Header));
