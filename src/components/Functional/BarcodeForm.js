import React, { useState, useEffect } from 'react';

import { Text, Stack, Button, ButtonGroup, Box, Input, Select, Flex, PseudoBox } from '@chakra-ui/core'

import JsBarcode from 'jsbarcode';
import FileSaver from 'file-saver';

export default function FormComponentHooks() {

    const [codeFormat, setCodeFormat] = useState("CODE128")
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
        } else if (codeFormat === ITF14 & inputValue.length !== 13) {
            setMessage("An ITF-14 code must be exactly 13 digits")
            setbarcodeValue(defaultValue)
        } else if (codeFormat === ITF14 & inputValue.length !== 13) {
            setMessage("'An ITF-14 code must be exactly 13 digits'")
            setbarcodeValue(defaultValue)
        } else if (codeFormat === ITF14 & regexPattern.test(inputValue)) {
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
            } else if (codeFormat === ITF14 & inputValue.length !== 13) {
                setMessage("An ITF-14 code must be exactly 13 digits")
                setbarcodeValue(defaultValue)
            } else if (codeFormat === ITF14 & inputValue.length !== 13) {
                setMessage("'An ITF-14 code must be exactly 13 digits'")
                setbarcodeValue(defaultValue)
            } else if (codeFormat === ITF14 & regexPattern.test(inputValue)) {
                setMessage("An ITF-14 code must only contain digits")
                setbarcodeValue(defaultValue)
            }
            else {
                setMessage(null)
            }
        },
        [inputValue] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Generate barcode
    useEffect(
        () => {
            JsBarcode("#barcode", barcodeValue, { format: codeFormat, fontOptions: "bold", font: "monospace" })
        }, [barcodeValue] // eslint-disable-line react-hooks/exhaustive-deps
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

                        <Select name="format" placeholder="Select barcode type" defaultValue={CODE128} variant="outline" focusBorderColor="pink.500" bg="cyan.50" size="lg" onChange={e => { setCodeFormat(e.target.value) }}>

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