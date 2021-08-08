import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {InvoiceProvider} from "./context/invoice_context"

ReactDOM.render(
  <React.StrictMode>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

