import * as React from 'react';
import { hot } from 'react-hot-loader';
import { StyleRulesCallback, withStyles, Theme, WithStyles } from '@material-ui/core';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Main from '../components/app/Main';

class App extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <div className={classes.main}>
          <Main />
        </div>

        <Footer />
      </div>
    );
  }
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey['100'],
  },
  main: {
    height: 'calc(100vh - 120px)',
    margin: '8px 0px',
  },
});

export default hot(module)(withStyles(styles)(App));

export interface Props extends WithStyles<StyleRulesCallback> {
}
