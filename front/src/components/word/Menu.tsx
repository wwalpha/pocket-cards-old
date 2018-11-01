import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { PATH, PATH_INDEX } from '@const';
import { App } from '@actions';
import { IState } from '@models';

class Menu extends React.Component<Props, {}> {

  render() {
    const { classes, actions } = this.props;

    return (
      <Grid
        container
        classes={{
          container: classes.container,
        }}
      >
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => actions.updatePath(PATH_INDEX.WORD_REGIST)}
            component={(props: any) => (
              <Link to={PATH.WORD.REGIST} {...props} />
            )}
          >
            新規単語
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => actions.updatePath(PATH_INDEX.WORD_STUDY)}
            component={(props: any) => (
              <Link to={PATH.WORD.STUDY} {...props} />
            )}
          >
            単語学習
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => actions.updatePath(PATH_INDEX.WORD_TEST)}
            component={(props: any) => (
              <Link to={PATH.WORD.TEST} {...props} />
            )}
          >
            単語テスト
          </Button>
        </Grid>
        <Grid item xs={12} classes={{ item: classes.item }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => actions.updatePath(PATH_INDEX.WORD_HISTORY)}
            component={(props: any) => (
              <Link to={PATH.WORD.HISTORY} {...props} />
            )}
          >
            今日の単語
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  container: {
    // height: 'inherit',
  },
  item: {
    width: '100%',
    margin: '0px 16px',
  },
});

/** StateProps */
export interface StateProps {
  setId: string;
}
/** DispatchProps */
export interface DispatchProps {
  actions: App.Actions;
}
/** OwnProps */
export interface OwnProps {
}

export interface Props extends OwnProps, DispatchProps, StateProps, WithStyles<StyleRules> { }

const mapStateToProps = (state: IState): StateProps => ({
  setId: state.get('app').setId as string,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(App, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Menu));
