import React, { useContext, useEffect, useReducer, createContext } from "react";
import reducer from "../reducers/invoice_reducer";

interface Invoice {
  id: string;
  createdAt: Date;
  paymentDue: Date;
  description: String;
  paymentTerms: Number;
  clientName: String;
  clientEmail: String;
  status: String;
  senderAddress: {
    street: String;
    city: String;
    postCode: String;
    country: String;
  };
  clientAddress: {
    street: String;
    city: String;
    postCode: String;
    country: String;
  };
  items: [
    {
      name: String;
      quantity: Number;
      price: Number;
      total: Number;
    }
  ];
  total: Number;
}

interface State {
  isDark: boolean;
  invoices: Array<Invoice>;
  total_invoices: Number;
}
const initialState: State = {
  isDark: false,
  invoices: [],
  total_invoices: 0,
};

const InvoiceContext = React.createContext(null);

export const InvoiceProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <InvoiceContext.Provider
      value={{
        ...state,
        toggleTheme,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
