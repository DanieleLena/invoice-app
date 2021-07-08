const invoice_reducer = (state: any, action: { type: any; payload?: any }) => {
  const { type, payload } = action;
  console.log(type);

  switch (type) {
    case "TOGGLE_THEME":
      {
        if (state.isDark) document.body.classList.remove("dark-theme");
        else {
          document.body.classList.add("dark-theme");
        }

        return { ...state, isDark: !state.isDark };
      }
      break;
  }

  throw new Error(`No Matching "${action.type}" - action type`);

  return state;
};

export default invoice_reducer;
