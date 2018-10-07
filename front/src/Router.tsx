import * as React from 'react';
import { hot } from 'react-hot-loader';
// import { Route, Switch } from 'react-router-dom';
import App from './containers/App';

class Router extends React.Component<any, any> {

  render() {
    return (
      <App />
    );
  }
}

export default hot(module)(Router);
