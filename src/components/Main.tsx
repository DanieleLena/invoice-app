import React from "react";
import { NewFiltersBtns, Empty } from ".";
import { useInvoiceContext } from "../context/invoice_context";

const Main = () => {
  const { total_invoices } = useInvoiceContext()!;

  return (
    <main className="main">
      <NewFiltersBtns />
      {total_invoices ? <h2>ooki</h2> : <Empty />}
    </main>
  );
};

export default Main;
