import React, { Component } from 'react';
import './App.css';

import Input from './components/Functional/Input'
// import Barcode from './components/Functional/Barcode';
import Credits from './components/Layout/Credits';


export default class App extends Component {

  state = { BarcodeExists: false, input: 'Example code 12345' }

  updateAppState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  // passData = (BarcodeExists, input) => {
  //   this.setState
  // }


  render() {
    return (
      <div className="App container" >
        <h1>BRCODIFY</h1>
        <h2>A simple barcode generator</h2>
        <h3>Format: CODE128</h3>
        <Input value={this.state.value} updateAppState={this.updateAppState}></Input>
        <Credits></Credits>
      </div>
    )
  }
}
