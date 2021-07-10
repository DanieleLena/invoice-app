import { Invoice } from "../context/invoice_context";

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
    case "UPDATE_FILTER": {
      let newvalue = !state.filter[payload];

      return { ...state, filter: { ...state.filter, [payload]: newvalue } };
    }
    case "GET_SINGLE_INVOICE": {
      let { id } = payload;
      let singleInvoice = state.invoices.find((item: Invoice) => {
        return item.id === id;
      });
      return { ...state, single_invoice: singleInvoice };
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`);

  return state;
};

export default invoice_reducer;
