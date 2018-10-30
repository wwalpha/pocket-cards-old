import * as React from 'react';
import { withStyles, StyleRules, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Query, compose } from 'react-apollo';
import { GET_LIST } from '@gql';
import { GetSetList, GetSetListVariables } from 'typings/graphql';
import { UserInfo } from 'typings/local';
import Item from './Item';
import { F_USER_INFO } from '@queries';

class List extends React.Component<Props, {}> {

  render() {
    const { classes, user: { id: userId } } = this.props;

    return (
      <Grid container classes={{ container: classes.root }}>
        <SetsQuery query={GET_LIST} variables={{ userId }} >
          {({ loading, data, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <h1>ERROR</h1>;
            if (!data) return <div></div>;

            const { sets = [] } = data;

            return sets && sets.map((item, idx) =>
              <Item
                key={idx}
                setId={(item && item.setId) as string}
                primaryText={(item && item.name) as string}
              />,
            );
          }}
        </SetsQuery>
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

export interface Props extends UserInfo, WithStyles<StyleRules> { }

export interface IProps { }

export default withStyles(styles)(compose(F_USER_INFO)(List) as React.ComponentType<IProps>);
