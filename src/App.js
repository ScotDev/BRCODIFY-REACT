import React, { Component } from 'react';
import './styles.min.css'

import Input from './components/Functional/Input'
import Credits from './components/Layout/Credits';


export default class App extends Component {

  render() {
    return (
      <div className="App" >
        <div className="container">
          <div className="content">
            <h1 className="page-title">BRCODIFY</h1>
            <h2 className="page-subtitle">A simple barcode generator.</h2>
            <Input></Input>
            <Credits></Credits>
          </div>
        </div>
      </div>
    )
  }
}
