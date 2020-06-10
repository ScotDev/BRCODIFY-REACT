import React, { Component } from 'react';

import JsBarcode from 'jsbarcode';
import FileSaver, { saveAs } from 'file-saver';

export default class Input extends Component {

    state = { format: "CODE128", BarcodeExists: false, input: 'EXAMPLE CODE 12345', barcodeValue: 'EXAMPLE CODE 12345', showWarning: false, errorMsg: 'No error' }

    generateBarcode = (val, format) => {
        JsBarcode('#barcode', val, { format: format, fontOptions: "bold" });
    }

    componentDidMount() {
        this.generateBarcode(this.state.barcodeValue, 'CODE128');
    }

    printBarcode = () => {
        const canvas = document.getElementById('barcode');
        const img = canvas.toDataURL('image/png');
        const url = "about:blank";
        const newWindow = window.open(url, "_new");
        newWindow.document.open();
        newWindow.document.write(`<img src='${img}' onload='window.print()' />`)
        console.log('Barcode printed:', this.state.barcodeValue);
    }

    downloadBarcode = () => {
        const canvas = document.getElementById('barcode');
        const img = canvas.toDataURL('image/png');
        FileSaver.saveAs(img, this.state.barcodeValue, { type: "image/png" })
    }

    handleSubmit = e => {
        const regexPattern = new RegExp("[^0-9]", "g");
        e.preventDefault();
        const defaultValue = 'EXAMPLE CODE 12345';
        const ITF14 = 'ITF14'
        if (e.target.input.value.length > 50) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot be longer than 50 characters' })
        } else if (e.target.input.value.startsWith(' ')) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot start with a blank space' })
        } else if (this.state.format === ITF14 & this.state.input.length !== 13) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, showWarning: true, errorMsg: 'An ITF-14 code must be exactly 13 digits' })
        } else if (this.state.format === ITF14 & regexPattern.test(this.state.input)) {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, showWarning: true, errorMsg: 'An ITF-14 code must only contain digits' })
        }
        else if (e.target.input.value.length < 1 | e.target.input.value.length === '') {
            this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Please enter a value' })
            this.generateBarcode(this.state.input);
        }
        else {
            this.setState({ format: e.target.format.value, BarcodeExists: true, barcodeValue: this.state.input, input: e.target.input.value.toString().toUpperCase(), showWarning: false, errorMsg: '' });
            console.log(this.state.input, this.state.format, e.target.format.value)
            this.generateBarcode(this.state.input, this.state.format);
            document.title = `BRCODIFY | ${this.state.input}`
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
        }
        else {
            this.setState({ BarcodeExists: true, barcodeValue: this.state.input, input: e.target.value.toString().toUpperCase(), showWarning: false })
        }
    }

    handleSelect = e => {
        const defaultCodeType = "CODE128";
        if (e.target.value === defaultCodeType) {
            this.setState({ format: defaultCodeType })
        } else {
            this.setState({ format: e.target.value })
        }
    }



    render() {
        const auto = '(Auto)';
        const CODE128 = 'CODE128';
        const CODE39 = 'CODE39';
        const CODE128A = 'CODE128A';
        const CODE128B = 'CODE128B';
        const CODE128C = 'CODE128C';
        // ITF14 requires input validation for exactly 13 numbers only (14th is calculated checksum)
        const ITF14 = 'ITF14';
        // MSI requires a check on input for digits only between 0-9
        // const MSI = 'MSI'
        // const MSI = 'MSI10'
        // const MSI = 'MSI11'
        // const MSI = 'MSI1010'
        // const MSI = 'MSI1110'
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
                    <select name="format" onChange={this.handleSelect}>
                        <optgroup label='CODE128 Series'>
                            <option value={CODE128}>{CODE128} {auto}</option>
                            <option value={CODE128A}>{CODE128A}</option>
                            <option value={CODE128B}>{CODE128B}</option>
                            <option value={CODE128C}>{CODE128C}</option>
                        </optgroup>
                        <optgroup label='CODE39 Series'>
                            <option value={CODE39}>{CODE39}</option>
                        </optgroup>
                        <optgroup label='ITF-14 Series'>
                            <option value={ITF14}>{ITF14}</option>
                        </optgroup>
                    </select>
                    {showWarning && (<div id="warning" className="warning">{errorMsg}</div>)}
                    <button className="btn">Generate barcode <i class="ri-arrow-right-s-line"></i></button>
                </form>
                <canvas id="barcode"></canvas>
                <div className="btn-group">
                    <button className="btn" onClick={this.printBarcode}><i class="ri-printer-line"></i></button>
                    <button className="btn" onClick={this.downloadBarcode}><i class="ri-download-line"></i></button>
                </div>
            </>
        )
    }
}
