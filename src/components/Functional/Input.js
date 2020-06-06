import React, { Component } from 'react'

import Barcode from './Barcode'

export default class Input extends Component {

    state = { BarcodeExists: false, input: 'Example code 12345' }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, BarcodeExists: true })
    }

    render() {
        const { updateAppState } = this.props;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        id="input"
                        name="input"
                        defaultValue="Example code 12345"
                        autoFocus
                        autoComplete="off"
                        onChange={updateAppState}
                    />
                    <button className="btn" id="btn" >Generate barcode</button>
                </form>
                <Barcode barcodeData={this.state}></Barcode>
            </>
        )
    }
}
