import * as React from 'react';
import { Link } from 'react-router-dom';
import { ActionFunction1, Action } from 'redux-actions';

class UpdatePath extends React.Component<Props> {

  handleClick = () => {
    const { pathChange, path } = this.props;

    // パス情報更新
    pathChange(path);
  }

  render() {
    const { to, path, pathChange, ...props } = this.props;

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
  pathChange: ActionFunction1<number, Action<number>>;
}
export interface Props extends OwnProps { }

export default UpdatePath;
