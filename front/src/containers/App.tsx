import * as React from 'react';
import { hot } from 'react-hot-loader';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';
import Main from '../components/app/Main';

class App extends React.Component<Props, {}> {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
        <Footer />
      </React.Fragment>
    );
  }
}

export default hot(module)(App);

export interface Props {

}
