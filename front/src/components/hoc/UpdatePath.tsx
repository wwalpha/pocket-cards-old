import * as React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { pathChange } from '@utils/mutations';
import { UpdatePathProps } from 'typings/local';

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

export interface Props extends UpdatePathProps {
  to: string;
}

export default compose(pathChange)(UpdatePath) as React.ComponentType<Props>;
