import React, { useState, useEffect } from 'react';

import { Text, Stack, Button, ButtonGroup, Box, Input, Select, Flex, PseudoBox } from '@chakra-ui/core'

import JsBarcode from 'jsbarcode';
import FileSaver from 'file-saver';

// export default class BarcodeForm extends Component {

//     state = { format: "CODE128", BarcodeExists: false, input: 'EXAMPLE CODE 12345', barcodeValue: 'EXAMPLE CODE 12345', showWarning: false, errorMsg: 'No error' }

//     generateBarcode = (val, format) => {
//         JsBarcode('#barcode', val, { format: format, fontOptions: "bold" });
//     }

//     componentDidMount() {
//         this.generateBarcode(this.state.barcodeValue, 'CODE128');
//     }

//     printBarcode = () => {
//         const canvas = document.getElementById('barcode');
//         const img = canvas.toDataURL('image/png');
//         const url = "about:blank";
//         const newWindow = window.open(url, "_new");
//         newWindow.document.open();
//         newWindow.document.write(`<img src='${img}' onload='window.print()' />`)
//         console.log('Barcode printed:', this.state.barcodeValue);
//     }

//     downloadBarcode = () => {
//         const canvas = document.getElementById('barcode');
//         const img = canvas.toDataURL('image/png');
//         FileSaver.saveAs(img, this.state.barcodeValue, { type: "image/png" })
//     }

//     handleSubmit = e => {
//         const regexPattern = new RegExp("[^0-9]", "g");
//         e.preventDefault();
//         const defaultValue = 'EXAMPLE CODE 12345';
//         const ITF14 = 'ITF14'
//         if (e.target.input.value.length > 50) {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot be longer than 50 characters' })
//         } else if (e.target.input.value.startsWith(' ')) {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot start with a blank space' })
//         } else if (this.state.format === ITF14 & this.state.input.length !== 13) {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, showWarning: true, errorMsg: 'An ITF-14 code must be exactly 13 digits' })
//         } else if (this.state.format === ITF14 & regexPattern.test(this.state.input)) {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, showWarning: true, errorMsg: 'An ITF-14 code must only contain digits' })
//         }
//         else if (e.target.input.value.length < 1 | e.target.input.value.length === '') {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Please enter a value' })
//             this.generateBarcode(this.state.input);
//         }
//         else {
//             this.setState({ format: e.target.format.value, BarcodeExists: true, barcodeValue: this.state.input, input: e.target.input.value.toString().toUpperCase(), showWarning: false, errorMsg: '' });
//             console.log(this.state.input, this.state.format, e.target.format.value)
//             this.generateBarcode(this.state.input, this.state.format);
//             document.title = `BRCODIFY | ${this.state.input}`
//         }
//     }



//     handleChange = e => {

//         e.preventDefault();
//         const defaultValue = 'EXAMPLE CODE 12345';
//         if (e.target.value.length > 50) {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot be longer than 50 characters' })
//         } else if (e.target.value.startsWith(' ')) {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: true, errorMsg: 'Code cannot start with a blank space' })
//         } else if (e.target.value.length < 1 | e.target.value.length === '') {
//             this.setState({ BarcodeExists: false, barcodeValue: defaultValue, input: defaultValue, showWarning: false, errorMsg: 'Please enter a value' })
//         }
//         else {
//             this.setState({ BarcodeExists: true, barcodeValue: this.state.input, input: e.target.value.toString().toUpperCase(), showWarning: false })
//         }
//     }

//     handleSelect = e => {
//         const defaultCodeType = "CODE128";
//         if (e.target.value === defaultCodeType) {
//             this.setState({ format: defaultCodeType })
//         } else {
//             this.setState({ format: e.target.value })
//         }
//     }



//     render() {
//         const auto = '(Auto)';
//         const CODE128 = 'CODE128';
//         const CODE39 = 'CODE39';
//         const CODE128A = 'CODE128A';
//         const CODE128B = 'CODE128B';
//         const CODE128C = 'CODE128C';
//         // ITF14 requires input validation for exactly 13 numbers only (14th is calculated checksum)
//         const ITF14 = 'ITF14';
//         // MSI requires a check on input for digits only between 0-9
//         // const MSI = 'MSI'
//         // const MSI = 'MSI10'
//         // const MSI = 'MSI11'
//         // const MSI = 'MSI1010'
//         // const MSI = 'MSI1110'
//         const { showWarning, errorMsg } = this.state;
//         return (
//             <>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         type="text"
//                         className="form-field text-input"
//                         name="input"
//                         placeholder="Example code 12345"
//                         autoFocus
//                         autoComplete="off"
//                         onChange={this.handleChange}
//                     />
//                     <select name="format" className="form-field dropdown-select" onChange={this.handleSelect}>
//                         <optgroup label='CODE128 Series'>
//                             <option value={CODE128}>{CODE128} {auto}</option>
//                             <option value={CODE128A}>{CODE128A}</option>
//                             <option value={CODE128B}>{CODE128B}</option>
//                             <option value={CODE128C}>{CODE128C}</option>
//                         </optgroup>
//                         <optgroup label='CODE39 Series'>
//                             <option value={CODE39}>{CODE39}</option>
//                         </optgroup>
//                         <optgroup label='ITF-14 Series'>
//                             <option value={ITF14}>{ITF14}</option>
//                         </optgroup>
//                     </select>
//                     {showWarning && (<div id="warning" className="warning">{errorMsg}</div>)}
//                     <button className="btn">Generate <i className="btn__icon ri-arrow-right-s-line"></i></button>
//                 </form>
//                 <canvas id="barcode"></canvas>
//                 <div className="btn-group">
//                     <button className="btn btn--icon-only" onClick={this.printBarcode}><i className="btn__icon ri-printer-line"></i></button>
//                     <button className="btn btn--icon-only" onClick={this.downloadBarcode}><i className="btn__icon ri-download-line"></i></button>
//                 </div>
//             </>
//         )
//     }
// }


export default function FormComponentHooks() {

    const [format, setformat] = useState("CODE128")
    const [barcodeValue, setbarcodeValue] = useState("EXAMPLE CODE 12345")
    const [inputValue, setinputValue] = useState("EXAMPLE CODE 12345")
    const [message, setMessage] = useState(null);

    const auto = '(Auto)';
    const CODE128 = 'CODE128';
    const CODE39 = 'CODE39';
    const CODE128A = 'CODE128A';
    const CODE128B = 'CODE128B';
    const CODE128C = 'CODE128C';
    const defaultValue = 'EXAMPLE CODE 12345';
    // ITF14 requires input validation for exactly 13 numbers only (14th is calculated checksum)
    const ITF14 = 'ITF14';
    // MSI requires a check on input for digits only between 0-9
    // const MSI = 'MSI'
    // const MSI = 'MSI10'
    // const MSI = 'MSI11'
    // const MSI = 'MSI1010'

    const regexPattern = new RegExp("[^0-9]", "g");



    const downloadBarcode = () => {

        const canvas = document.getElementById('barcode');
        const img = canvas.toDataURL('image/png');
        FileSaver.saveAs(img, barcodeValue, { type: "image/png" })

    }

    const printBarcode = () => {

        const canvas = document.getElementById('barcode');
        const img = canvas.toDataURL('image/png');
        const url = "about:blank";
        const newWindow = window.open(url, "_new");
        newWindow.document.open();
        newWindow.document.write(`<img src='${img}' onload='window.print()' />`)
        console.log('Barcode printed:', barcodeValue);

    }


    const handleSubmit = e => {

        e.preventDefault(e);

        if (inputValue.length > 50) {
            setMessage("Value cannot be longer than 50 characters");
            setbarcodeValue(defaultValue)
        } else if (inputValue.startsWith(' ')) {
            setMessage("Value cannot start with a blank space");
            setbarcodeValue(defaultValue)
        } else if (format === ITF14 & inputValue.length !== 13) {
            setMessage("An ITF-14 code must be exactly 13 digits")
            setbarcodeValue(defaultValue)
        } else if (format === ITF14 & inputValue.length !== 13) {
            setMessage("'An ITF-14 code must be exactly 13 digits'")
            setbarcodeValue(defaultValue)
        } else if (format === ITF14 & regexPattern.test(inputValue)) {
            setMessage("An ITF-14 code must only contain digits")
            setbarcodeValue(defaultValue)
        } else {
            setbarcodeValue(inputValue)
            setMessage(null)
            document.title = `BRCODIFY | ${inputValue}`
        }

    }

    // Handle input change
    useEffect(
        () => {
            if (!inputValue) {
                setMessage("Please enter a value");
                setbarcodeValue(defaultValue)
                setinputValue(defaultValue)
            } else if (inputValue.length > 50) {
                console.log("Value too long")
                setMessage("Value cannot be longer than 50 characters");
                setbarcodeValue(defaultValue)
            } else if (inputValue.startsWith(' ')) {
                console.log("Value cannot start with blank space")
                setMessage("Value cannot start with a blank space");
                setbarcodeValue(defaultValue)
            } else if (format === ITF14 & inputValue.length !== 13) {
                setMessage("An ITF-14 code must be exactly 13 digits")
                setbarcodeValue(defaultValue)
            } else if (format === ITF14 & inputValue.length !== 13) {
                setMessage("'An ITF-14 code must be exactly 13 digits'")
                setbarcodeValue(defaultValue)
            } else if (format === ITF14 & regexPattern.test(inputValue)) {
                setMessage("An ITF-14 code must only contain digits")
                setbarcodeValue(defaultValue)
            }
            else {
                setMessage(null)
            }
        },
        [inputValue]
    );

    // Generate barcode
    useEffect(
        () => {
            JsBarcode("#barcode", barcodeValue, { format: format, fontOptions: "bold", font: "monospace" })
        }, [barcodeValue]
    )


    return (
        <Box p={4} display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column" maxW="95%">

            <Flex as="form" w="100%" display="flex" alignItems="center" flexDirection="column" onSubmit={e =>
                handleSubmit(e)
            }>
                <PseudoBox width={[
                    "100%", // base
                    "100%", // 480px upwards
                    "100%", // 768px upwards
                    "100%", // 992px upwards
                ]} mb={10} p={4} display="flex" alignItems="center" justifyContent="center" flexDirection="column" border="2px" borderRadius="md" borderColor="cyan.50">
                    <Stack spacing={4} w="100%">
                        <Input

                            focusBorderColor="pink.500"
                            bg="cyan.50"
                            variant="outline"
                            size="lg"
                            type="text"
                            name="input"
                            placeholder="Example code 12345"
                            autoFocus
                            autoComplete="off"
                            maxLength="51"
                            onChange={e =>
                                setinputValue(e.target.value.toString().toUpperCase())
                            }
                        />

                        <Select name="format" placeholder="Select barcode type" defaultValue={CODE128} variant="outline" focusBorderColor="pink.500" bg="cyan.50" size="lg" onChange={e => { setformat(e.target.value) }}>

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
                        </Select>
                    </Stack>

                    {message && (<Text color="red.500" m={2} fontSize="lg">{message}</Text>)}

                    <Button mt={6} size="lg" bg="pink.500" color="cyan.50" rounded="md" onClick={(e) => { handleSubmit(e) }}>Generate</Button>
                </PseudoBox>
            </Flex>


            <PseudoBox border="1px" borderRadius="md" borderColor="gray.200" mb={10} overflow="hidden" p={2} maxW="100%">
                <canvas style={{ maxWidth: "100%" }} id="barcode"></canvas>
            </PseudoBox>

            <ButtonGroup spacing={4} mb={2}>
                <Button bg="pink.500" size="lg" color="cyan.50" onClick={() => { printBarcode() }}>Print</Button>
                <Button bg="pink.500" size="lg" color="cyan.50" onClick={() => { downloadBarcode() }}>Download</Button>
            </ButtonGroup>

        </Box>
    )
}