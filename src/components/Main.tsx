import React from "react";
import { NewFiltersBtns, Empty,InvoicePreview } from ".";
import { useInvoiceContext } from "../context/invoice_context";

const Main = () => {
  const { total_invoices } = useInvoiceContext()!;

  return (
    <main className="main">
      <NewFiltersBtns />
      {total_invoices ? (
        <>
          <InvoicePreview />
          <InvoicePreview />
          <InvoicePreview />
        </>
      ) : (
        <Empty />
      )}
    </main>
  );
};

export default Main;
