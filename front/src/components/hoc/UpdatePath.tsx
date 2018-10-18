import * as React from 'react';
import { UpdatePathProps, UpdatePathVariables, ScreenInfo } from 'typings/local';
import { UPDATE_PATH } from '@gql';
import { graphql, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';

class UpdatePath extends React.Component<Props> {

  render() {
    const { to, path, onPathChange, ...props } = this.props;

    if (!to || !onPathChange) return null;

    return (
      <Link
        to={to}
        onClick={() => onPathChange(path)}
        {...props}
      />
    );
  }
}

export interface IProps {
  to?: string;
}

export interface TProps extends UpdatePathProps, IProps { }

export type TChildProps = ChildProps<TProps, ScreenInfo, {}>;

export interface Props extends TProps { }

export default graphql<TProps, ScreenInfo, UpdatePathVariables, TChildProps>(UPDATE_PATH, {
  props: ({ data, mutate, ownProps }) => ({
    ...data,
    ...ownProps,
    onPathChange: (path?: number) => {
      console.log('onPathChange', path);
      mutate && mutate({
        variables: { path },
      });
    },
  }),
})(UpdatePath);
