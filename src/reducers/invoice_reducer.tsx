// import { stat } from "fs";
import { Invoice } from "../context/invoice_context";
import { invoices_url } from "../helpers";

const invoice_reducer = (state: any, action: { type: any; payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case "TOGGLE_THEME": {
      if (state.isDark) document.body.classList.remove("dark-theme");
      else {
        document.body.classList.add("dark-theme");
      }

      return { ...state, isDark: !state.isDark };
    }
    case "FETCH_INVOICES_START": {
      return { ...state, isInvoicesLoading: true };
    }
    case "FETCH_INVOICES_COMPLETED": {
      console.log(action.payload);

      return { ...state, isInvoicesLoading: false, invoices: action.payload };
    }
    case "FETCH_INVOICES_ERROR": {
      return { ...state };
    }
    case "ADD_INVOICE_COMPLETED": {      
      const newInvoice = action.payload;     
      return { ...state, invoices: [...state.invoices, newInvoice] };
    }
    case "DELETE_INVOICE_COMPLETED": {
      console.log("success");
      let newInvoiceList = state.invoices.filter((item: any) => {
        return item._id !== action.payload;
      });

      return { ...state, invoices: newInvoiceList };
    }
    case "DELETE_INVOICE_ERROR": {
      console.log("error");

      return { ...state };
    }

    case "UPDATE_FILTER": {
      let newvalue = !state.filter[payload];
      return { ...state, filter: { ...state.filter, [payload]: newvalue } };
    }
    case "GET_FILTERED_INVOICES": {
      const totalInvoices = state.invoices;
      const { paid, pending, draft } = state.filter;
      let paidTemp = "";
      let draftTemp = "";
      let pendingTemp = "";
      let filteredInvoices = totalInvoices.filter((invoice: Invoice) => {
        if (paid) paidTemp = "paid";
        if (pending) pendingTemp = "pending";
        if (draft) draftTemp = "draft";
        return (
          invoice.status === paidTemp ||
          invoice.status === pendingTemp ||
          invoice.status === draftTemp
        );
      });
      return { ...state, filtered_invoices: filteredInvoices };
    }
    case "GET_SINGLE_INVOICE": {
      let { id } = payload;
      let singleInvoice = state.invoices.find((item: Invoice) => {
        return item.id === id;
      });
      return { ...state, single_invoice: singleInvoice };
    }
    case "GET_TOTAL_INVOICES": {
      let totalInvoices = state.invoices.length;
      return { ...state, total_invoices: totalInvoices };
    }
    case "TOGGLE_NEW_INVOICE_MODAL": {
      return { ...state, isNewInvoiceOpen: !state.isNewInvoiceOpen };
    }
    case "HANDLE_SUBMIT": {
      console.log(action.payload);

      return { ...state, invoices: [...state.invoices, action.payload] };
    }
    case "UPDATE_INVOICE_COMPLETED": {
      const { newStatus, id } = action.payload;
    
      return {
        ...state,
        single_invoice: { ...state.single_invoice, status: newStatus },
      };
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`);

 
};

export default invoice_reducer;
