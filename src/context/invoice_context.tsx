import React, { useContext, useEffect, useReducer, createContext } from "react";
import reducer from "../reducers/invoice_reducer";

export interface Invoice {
  id: string;
  createdAt: String;
  paymentDue: String;
  description: String;
  paymentTerms: number;
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
      quantity: number;
      price: number;
      total: number;
    }
  ];
  total: number;
}
interface Filter {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

interface State {
  isDark: boolean;
  invoices: Array<Invoice>;
  total_invoices: number;
  filter: Filter;
}
const initialState: State = {
  isDark: false,
  invoices: [
    {
      id: "RT3080",
      createdAt: "2021-08-18",
      paymentDue: "2021-08-19",
      description: "Re-branding",
      paymentTerms: 1,
      clientName: "gino1",
      clientEmail: "jensenh@mail.com",
      status: "paid",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientAddress: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom",
      },
      items: [
        {
          name: "Brand Guidelines",
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    },
    {
      id: "RT3080",
      createdAt: "2021-08-18",
      paymentDue: "2021-08-19",
      description: "Re-branding",
      paymentTerms: 1,
      clientName: "pino2",
      clientEmail: "jensenh@mail.com",
      status: "pending",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientAddress: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom",
      },
      items: [
        {
          name: "Brand Guidelines",
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    },
    {
      id: "RT3080",
      createdAt: "2021-08-18",
      paymentDue: "2021-08-19",
      description: "Re-branding",
      paymentTerms: 1,
      clientName: "dino3",
      clientEmail: "jensenh@mail.com",
      status: "draft",
      senderAddress: {
        street: "19 Union Terrace",
        city: "London",
        postCode: "E1 3EZ",
        country: "United Kingdom",
      },
      clientAddress: {
        street: "106 Kendell Street",
        city: "Sharrington",
        postCode: "NR24 5WQ",
        country: "United Kingdom",
      },
      items: [
        {
          name: "Brand Guidelines",
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    },
  ],
  total_invoices: 1, // TO CHANGE
  filter: {
    draft: true,
    pending: true,
    paid: true,
  },
};

const InvoiceContext = React.createContext(null);

export const InvoiceProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };
  const updateFilter = (e: React.FormEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    dispatch({ type: "UPDATE_FILTER", payload: name });
  };

  return (
    <InvoiceContext.Provider
      value={{
        ...state,
        toggleTheme,
        updateFilter,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
