import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

export default class Main extends React.Component {
  render(){
    return (
      <main className="main-container">
        <Header />
          {this.props.children}
        <Footer />
      </main>
    )
  }
}
