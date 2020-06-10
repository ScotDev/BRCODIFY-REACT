import React, { Component } from 'react';
import './App.css';

import logo from './img/logo.png';

import Input from './components/Functional/Input'
import Credits from './components/Layout/Credits';


export default class App extends Component {

  render() {
    return (
      <div className="App" >
        <div className="skewed"></div>
        <div className="container">
          <div className="content">
            {/* <h1>BRCODIFY</h1> */}
            <div className="brand-logo">
              <img src={logo} alt="Brand logo"></img>
            </div>
            <h2>A simple barcode generator</h2>
            <Input></Input>
          </div>
          <Credits></Credits>
        </div>
      </div>
    )
  }
}
