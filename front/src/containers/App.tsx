import * as React from 'react';
import { hot } from 'react-hot-loader';
import { StyleRulesCallback, withStyles, Theme, WithStyles } from '@material-ui/core';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import { Route, Switch } from 'react-router';
import Home from './Home';
import Set from './Set';

class App extends React.Component<Props, {}> {

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.main}>
          <Switch>
            <Route excat path="/home" component={Home} />
            <Route excat path="/set" component={Set} />
          </Switch>
          <Route children={children} />
        </div>
        <Footer />
      </div >
    );
  }
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey['200'],
  },
  main: {
    height: 'calc(100vh - 148px)',
    padding: theme.spacing.unit * 2,
  },
});

export default hot(module)(withStyles(styles)(App));

export interface Props extends WithStyles<StyleRulesCallback> {
}
