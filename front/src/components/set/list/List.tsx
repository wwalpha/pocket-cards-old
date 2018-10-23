import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { GET_LIST, USER_INFO } from '@gql';
import { GetSetList, GetSetListVariables } from 'typings/graphql';
import { UserInfo } from 'typings/local';
import Item from './Item';

class List extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return (
      <Grid container classes={{ container: classes.root }}>
        <UserQuery query={USER_INFO} >
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return null;

            const userId = data.user.id;
            return (
              <SetsQuery query={GET_LIST} variables={{ userId }} >
                {({ loading, data, error }) => {
                  if (loading) return <div>Loading</div>;
                  if (error) return <h1>ERROR</h1>;
                  if (!data) return <div></div>;

                  console.log('data', data);
                  const { sets = [] } = data;
                  // key={idx}
                  // primaryText={(item && item.name) as string}
                  // setId={(item && item.setId) as string}
                  // userId={userId}
                  return sets && sets.map((item, idx) =>
                    <Item
                      setId={(item && item.setId) as string}
                      primaryText={(item && item.name) as string}
                    />,
                  );
                }}
              </SetsQuery>
            );
          }}
        </UserQuery>
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    // margin: '8px 0px',
  },
});

class SetsQuery extends Query<GetSetList, GetSetListVariables> { }
class UserQuery extends Query<UserInfo, any> { }

export interface Props extends WithApolloClient<TProps>, WithStyles<StyleRules> { }

export interface TProps { }

export default withApollo<TProps, UserInfo>(withStyles(styles)(List));
