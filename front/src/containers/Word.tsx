import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { Regist, History, Menu, Study, Test } from '@comp/word';
import { PATH } from '@const';

class Main extends React.Component<Props, {}> {

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.container}>
        <Switch>
          <Route exact path={PATH.WORD.ROOT} component={Menu} />
          <Route path={PATH.WORD.REGIST} component={Regist} />
          <Route path={PATH.WORD.STUDY} component={Study} />
          <Route path={PATH.WORD.TEST} component={Test} />
          <Route path={PATH.WORD.HISTORY} component={History} />
        </Switch>
        <Route children={children} />
      </div>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    height: '100%',
  },
});

export default withStyles(styles)(Main);

export interface Props extends WithStyles<StyleRules> {
}
