import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import Stock_Context from './Context/Stock_Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Stock_Context>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Stock_Context>
  </React.StrictMode>
);


