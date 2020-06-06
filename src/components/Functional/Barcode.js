import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JsBarcode from 'jsbarcode'

export default class Barcode extends Component {

    state = { input: this.props.barcodeData.input }

    static propTypes = {
        BarcodeExists: PropTypes.bool.isRequired
    }

    generateBarcode = () => {
        JsBarcode('#barcode', this.state.input);
    }

    componentDidUpdate() {
        this.generateBarcode()
    }

    printBarcode = () => {
        console.log('Barcode printed', this.state.input)
        // HTMLCanvasElement.toDataURL()
    }

    render() {
        const { BarcodeExists } = this.props.barcodeData;
        return (
            <>
                {BarcodeExists && (<><canvas id="barcode"></canvas><button className="btn" id="PrintBtn" onClick={this.printBarcode}>Print barcode</button></>)}
            </>
        )
    }
}