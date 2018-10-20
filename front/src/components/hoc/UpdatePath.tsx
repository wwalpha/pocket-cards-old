import * as React from 'react';
import { UPDATE_PATH } from '@gql';
import { graphql, ChildProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { UpdatePathVariables, ScreenInfo } from 'typings/local';

class UpdatePath extends React.Component<Props> {

  handleClick = () => {
    const { updatePath, path } = this.props;

    if (!updatePath) return;

    // パス情報更新
    updatePath(path);
  }

  render() {
    const { to, path, updatePath, ...props } = this.props;

    return (
      <Link
        to={to}
        onClick={this.handleClick}
        {...props}
      />
    );
  }
}

/** React Props */
export interface IProps {
  to: string;
}
/** GraphQL Props */
export interface UpdatePathProps extends IProps, UpdatePathVariables {
  updatePath?: (path: number) => void;
}
/** ChildProps */
export type UpdatePathChildProps = ChildProps<UpdatePathProps, Screen, {}>;

export interface Props extends UpdatePathProps { }

const pathChange = graphql<UpdatePathProps, ScreenInfo, {}, UpdatePathChildProps>(UPDATE_PATH, {
  props: ({ mutate, ownProps }) => ({
    ...ownProps,
    updatePath: (path: number) => {
      mutate && mutate({
        variables: { path },
      });
    },
  }),
});

export default pathChange(UpdatePath);
