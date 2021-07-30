import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/invoice_reducer";
import { invoices_url as url } from "../helpers";


export interface Item {
      itemId: number,
      name: string;
      quantity: number;
      price: number;
      total: number;
      
}
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
  items: Item[];

  total: number;
}
interface Filter {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

interface State {
  isDark: boolean;
  isInvoicesLoading: boolean;
  isNewInvoiceOpen: boolean;
  invoices: Array<Invoice>;
  filtered_invoices: Array<Invoice>;
  total_invoices: number;
  filter: Filter;
  single_invoice: Object;
}
const initialState: State = {
  isDark: false,
  isInvoicesLoading: false,
  isNewInvoiceOpen: false, // TO  CHANGEEEEE
  invoices: [],
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
  const fetchInvoices = async (url: string) => {
    dispatch({ type: "FETCH_INVOICES_START" });
    try {
      const response = await axios.get(url);
      const invoices = response.data;
      dispatch({ type: "FETCH_INVOICES_COMPLETED", payload: invoices });
    } catch (error) {
      console.log(error);

      dispatch({ type: "FETCH_INVOICES_ERROR" });
    }
  };
  //ADD NEW INVOICE =============================================================
  const addInvoice = async (invoice: any, isDraft: boolean) => {
    let addUrl = url + "add";
    if (isDraft) {
      invoice = { ...invoice, status: "draft" };
    }
    try {
      const response = await axios.post(addUrl, invoice);
      console.log(response);
      dispatch({ type: "ADD_INVOICE_COMPLETED", payload: invoice });
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE INVOICE =============================================================
  const deleteInvoice = async (id: string) => {
    let deleteUrl = url + id;

    try {
      const response = await axios.delete(deleteUrl);
      dispatch({ type: "DELETE_INVOICE_COMPLETED", payload: {id,response} });
    } catch (error) {
      console.log(error);
      dispatch({ type: "DELETE_INVOICE_ERROR", payload: id });
    }
  };
  //FILTERS, PAID,PENDING,DRAFT ====================================================
  const updateFilter = (e: React.FormEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    dispatch({ type: "UPDATE_FILTER", payload: name });
  };
  const getFilteredInvoices = () => {
    dispatch({ type: "GET_FILTERED_INVOICES" });
  };
  const getSingleInvoice = (id: string) => {
    dispatch({ type: "GET_SINGLE_INVOICE", payload: id });
  };
  //TOTAL No OF INVOICES ====================================================
  const getTotalInvoices = () => {
    dispatch({ type: "GET_TOTAL_INVOICES" });
  };
  //TOGGLE THE NEW INVOICE MODAL ====================================================
  const toggleNewInvoiceModal = () => {
    dispatch({ type: "TOGGLE_NEW_INVOICE_MODAL" });
  };
  const toggleEditInvoiceModal = () => {
    dispatch({ type: "TOGGLE_EDIT_INVOICE_MODAL" });
  };
  const handleInvoiceForm = (result: Invoice) => {
    dispatch({ type: "HANDLE_SUBMIT", payload: result });
  };
  const changeStatus = async (
    invoice: Invoice,
    status: "pending" | "paid",
    id: string
  ) => {
    let updateUrl = url + "update/" + id;

    if (status === "pending") invoice.status = "paid";
    if (status === "paid") invoice.status = "pending";
    let newStatus = invoice.status;
    try {
      const response = await axios.post(updateUrl, invoice);
      dispatch({
        type: "UPDATE_INVOICE_COMPLETED",
        payload: { response, newStatus },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_INVOICE_ERROR", payload: id });
    }
  };
  const editInvoice = async (invoice: Invoice, id: String) => {
    let updateUrl = url + "update/" + id;

    try {
      const response = await axios.post(updateUrl, invoice);
      dispatch({
        type: "EDIT_INVOICE_COMPLETED",
        payload: {invoice,response},
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "EDIT_INVOICE_ERROR", payload: id });
    }
  };

  useEffect(() => {
    fetchInvoices(url);
  }, [state.total_invoices]);

 

  return (
    <InvoiceContext.Provider
      value={{
        ...state,
        fetchInvoices,
        toggleTheme,
        updateFilter,
        getSingleInvoice,
        getTotalInvoices,
        getFilteredInvoices,
        toggleNewInvoiceModal,
        handleInvoiceForm,
        deleteInvoice,
        addInvoice,
        changeStatus,
        toggleEditInvoiceModal,
        editInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
