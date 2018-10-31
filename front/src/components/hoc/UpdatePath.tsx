import * as React from 'react';
import { Link } from 'react-router-dom';

class UpdatePath extends React.Component<Props> {

  handleClick = () => {
    console.log(2222);
    const { updatePath, path } = this.props;

    console.log('handleClick', updatePath);
    // パス情報更新
    updatePath(path);
  }

  render() {
    const { to, path, updatePath, ...props } = this.props;

    console.log(1111);
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
  updatePath: (path: number) => void;
}

export interface Props extends OwnProps { }

export default UpdatePath;
