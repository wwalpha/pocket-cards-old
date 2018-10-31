import * as React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import gql from 'graphql-tag';
import { SetListQueryVariables, SetListQuery } from 'typings/graphql';
import { IState } from '@models';
import { setList } from '@queries';
import { Item } from './index';
import { bindActionCreators, Dispatch } from 'redux';
import { App } from '@actions';

class List extends React.Component<Props, {}> {

  render() {
    const { classes, userId, actions } = this.props;

    return (
      <Grid container classes={{ container: classes.root }}>

        <SetList query={gql(setList)} variables={{ userId }} >
          {({ loading, data, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div></div>;

            const { setList } = data;
            console.log(setList);
            return setList && setList.map((item, idx) =>
              <Item
                key={idx}
                updateSetId={actions.updateSetId}
                updatePath={actions.updatePath}
                setId={(item && item.setId) as string}
                primaryText={(item && item.name) as string}
              />,
            );
          }}
        </SetList>
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    // margin: '8px 0px',
  },
});

class SetList extends Query<SetListQuery, SetListQueryVariables> { }

/** StateProps */
export interface StateProps {
  userId: string;
}
/** OwnProps */
export interface OwnProps {
  actions: App.Actions;
}

export interface Props extends OwnProps, StateProps, WithStyles<StyleRules> { }

const mapStateToProps = (state: IState) => ({
  userId: state.get('app').userId,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(App, dispatch),
});

export default connect<StateProps, void, Props, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(List));
