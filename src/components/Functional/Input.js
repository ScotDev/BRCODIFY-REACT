import React, { Component } from 'react';
import JsBarcode from 'jsbarcode'

export default class Input extends Component {

    state = { format: 'CODE128', BarcodeExists: false, input: 'EXAMPLE CODE 12345', barcodeValue: 'EXAMPLE CODE 12345', showWarning: false, errorMsg: 'No error' }

    generateBarcode = (val, format) => {
        JsBarcode('#barcode', val, { format: format });
    }

    componentDidMount() {
        this.generateBarcode(this.state.barcodeValue, 'CODE128');
        console.log(this.state.barcodeValue);
    }

    printBarcode = () => {
        const canvas = document.getElementById('barcode');
        const img = canvas.toDataURL('image/png');
        const url = "about:blank";
        const newWindow = window.open(url, "_new");
        newWindow.document.open();
        newWindow.document.write(`<img src='${img}' onload='window.print()' />`)
        console.log('Barcode printed', this.state.barcodeValue);
    }



    handleSubmit = e => {
        e.preventDefault();
        const defaultValue = 'EXAMPLE CODE 12345';
        if (e.target.input.value.length > 50) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot be longer than 50 characters' })
        } else if (e.target.input.value.startsWith(' ')) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot start with a blank space' })
        } else if (e.target.input.value.length < 1 | e.target.input.value.length === '') {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Please enter a value' })
        } else {
            this.setState({ BarcodeExists: true, barcodeValue: this.state.input, input: e.target.input.value.toUpperCase(), showWarning: false })
            this.generateBarcode(this.state.input, this.state.format);
        }
    }

    handleChange = e => {
        e.preventDefault();
        const defaultValue = 'EXAMPLE CODE 12345';
        if (e.target.value.length > 50) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot be longer than 50 characters' })
        } else if (e.target.value.startsWith(' ')) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot start with a blank space' })
        } else if (e.target.value.length < 1 | e.target.value.length === '') {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: false, errorMsg: 'Please enter a value' })
        } else {
            this.setState({ BarcodeExists: true, barcodeValue: this.state.input, input: e.target.value.toUpperCase(), showWarning: false })
        }
    }



    render() {
        const { showWarning, errorMsg } = this.state;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="input"
                        placeholder="Example code 12345"
                        autoFocus
                        autoComplete="off"
                        onChange={this.handleChange}
                    />
                    {showWarning && (<div id="warning" className="warning">{errorMsg}</div>)}
                    <button className="btn">Generate barcode</button>
                </form>
                <canvas id="barcode"></canvas>
                <button className="btn" id="PrintBtn" onClick={this.printBarcode}>Print barcode</button>
            </>
        )
    }
}
