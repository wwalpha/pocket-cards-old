import * as React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { F_UPDATE_PATH, UpdatePathProps } from '@gql';

class UpdatePath extends React.Component<Props> {

  handleClick = () => {
    const { updatePath, path } = this.props;

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

export interface OwnProps {
  to: string;
  path: number;
}
export interface Props extends OwnProps, UpdatePathProps { }

export default compose(F_UPDATE_PATH)(UpdatePath) as React.ComponentType<OwnProps>;
