import React, { Component } from 'react';
import { ThemeProvider, CSSReset, Box, Text } from '@chakra-ui/core'

import BarcodeForm from './components/Functional/BarcodeForm'
import Credits from './components/Layout/Credits';


export default class App extends Component {

  render() {
    return (
      <ThemeProvider>
        <CSSReset />
        <div className="App" >

          <Box bg="gray.900" minHeight="100vh" display="flex" alignItems="center" justifyContent="flex-start" flexDirection="column" p={2} textAlign="center">
            <Text fontSize="5xl" color="cyan.50" mt={2} mb={4}>BRCODIFY</Text>
            <Text fontSize="3xl" color="cyan.50" mb={6}>A simple barcode generator.</Text>

            <BarcodeForm></BarcodeForm>
            <Credits></Credits>
          </Box>

        </div>
      </ThemeProvider>
    )
  }
}
