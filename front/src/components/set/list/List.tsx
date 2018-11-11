import * as React from 'react';
import { Query, compose } from 'react-apollo';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { SetListVariables, SetList } from 'typings/graphql';
import Item from './Item';
import { GQL_SET_LIST } from '@gql/appsync';
import { UserInfo } from '@gql/local';

class List extends React.Component<Props, {}> {

  render() {
    const { classes, user: { id } } = this.props;

    return (
      <Grid container classes={{ container: classes.root }}>
        <SetListQuery query={GQL_SET_LIST} variables={{ userId: id }} fetchPolicy="cache-and-network">
          {({ loading, data, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div></div>;

            const { setList } = data;
            return setList && setList.map((item, idx) =>
              <Item
                key={idx}
                userId={id}
                setId={(item && item.setId) as string}
                primaryText={(item && item.name) as string}
              />,
            );
          }}
        </SetListQuery>
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    // margin: '8px 0px',
  },
});

class SetListQuery extends Query<SetList, SetListVariables> { }

export interface Props extends UserInfo.Props, WithStyles { }

export default compose(
  UserInfo.default,
  withStyles(styles),
)(List);
