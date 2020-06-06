import React, { Component } from 'react';
import './App.css';

import Input from './components/Functional/Input'
import Credits from './components/Layout/Credits';


export default class App extends Component {

  state = { format: 'CODE128' }

  render() {
    return (
      <div className="App container" >
        <h1>BRCODIFY</h1>
        <h2>A simple barcode generator</h2>
        <h3>Format: {this.state.format}</h3>
        <Input></Input>
        <Credits></Credits>
      </div>
    )
  }
}
