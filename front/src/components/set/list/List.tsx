import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Query } from 'react-apollo';
import Item from './Item';
import { GetSetList, GetSetListVariables } from 'typings/graphql';
import { GET_LIST, APP_INFO } from '@gql';
import { AppInfo } from 'typings/local';

class List extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;
    return (
      <Grid container classes={{ container: classes.root }}>
        <AppQuery query={APP_INFO}>
          {({ data: { app } }) => (
            <SetsQuery query={GET_LIST} variables={{ userId: app && app.user.id }} >
              {({ loading, data, error }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <h1>ERROR</h1>;
                if (!data) return <div></div>;

                console.log('data', data);
                const { sets = [] } = data;

                return sets && sets.map((item, idx) =>
                  <Item
                    key={idx}
                    primaryText={(item && item.name) as string}
                    setId={(item && item.setId) as string}
                    userId={user.id}
                  />,
                );
              }}
            </SetsQuery>
          )}
        </AppQuery>
      </Grid>
    );
  }
}

const styles = (): StyleRules => ({
  root: {
    // margin: '8px 0px',
  },
});

export default withStyles(styles)(List);

class SetsQuery extends Query<GetSetList, GetSetListVariables> { }
class AppQuery extends Query<AppInfo, any> { }

export interface Props extends WithStyles<StyleRules>, GetSetListVariables {
}
