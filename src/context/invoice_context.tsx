import axios from "axios";
import React, { useContext, useEffect, useReducer, createContext } from "react";
import reducer from "../reducers/invoice_reducer";
import {invoices_url as url } from "../helpers";

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "draft" | "pending";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: [
    {
      name: string;
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
  isNewInvoiceOpen: boolean,
  invoices: Array<Invoice>;
  filtered_invoices: Array<Invoice>
  total_invoices: number;
  filter: Filter;
  single_invoice: Object;
}
const initialState: State = {
  isDark: false,
  isNewInvoiceOpen: false, // TO  CHANGEEEEE
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
      id: "HH3080",
      createdAt: "2021-08-18",
      paymentDue: "2021-08-02",
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
      id: "ZZ3080",
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
  filtered_invoices: [],
  total_invoices: 0,
  filter: {
    draft: true,
    pending: true,
    paid: true,
  },
  single_invoice: {},
};


const InvoiceContext = React.createContext(null);

export const InvoiceProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };
  const fetchInvoices = async (url:string) => {
    dispatch({type: "FETCH_INVOICES_START"})
         console.log(url);

     try {
       const response = await axios.get(url);
       const invoices = response.data;
       dispatch({ type: "FETCH_INVOICES_COMPLETED", payload: invoices });
     } catch (error) {
       console.log(error);
       
       dispatch({ type: "FETCH_INVOICES_ERROR" });
     }
  }
  const updateFilter = (e: React.FormEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    dispatch({ type: "UPDATE_FILTER", payload: name });
  };
  const getFilteredInvoices = () => {
    dispatch({type:"GET_FILTERED_INVOICES"});
  }
  const getSingleInvoice = (id: string) => {
    dispatch({ type: "GET_SINGLE_INVOICE", payload: id });
  };
  const getTotalInvoices = () => {
    dispatch({ type: "GET_TOTAL_INVOICES" });
  };
   const toggleNewInvoiceModal = () => {
     dispatch({type: "TOGGLE_NEW_INVOICE_MODAL"})
   };
   const handleInvoiceForm = (result:Invoice) => {     
     dispatch({type:"HANDLE_SUBMIT",payload:result});
   };
  
   useEffect(() => {
     
     fetchInvoices(url);
   }, [])

  return (
    <InvoiceContext.Provider
      value={{
        ...state,
        toggleTheme,
        updateFilter,
        getSingleInvoice,
        getTotalInvoices,
        getFilteredInvoices,
        toggleNewInvoiceModal,
        handleInvoiceForm,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
