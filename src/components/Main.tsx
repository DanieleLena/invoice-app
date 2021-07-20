import React from "react";
import { NewFiltersBtns, Empty,InvoicePreview,NewInvoiceModal } from ".";
import { useInvoiceContext } from "../context/invoice_context";
import {Invoice} from "../context/invoice_context"

const Main = () => {
  const { total_invoices, isInvoicesLoading, filtered_invoices, isNewInvoiceOpen } =
    useInvoiceContext()!;



  return (
    <main className="main">
      <NewFiltersBtns />
      {isNewInvoiceOpen && <NewInvoiceModal />}

      {isInvoicesLoading && <h2>LOADING...</h2>}

      { total_invoices ? (
        filtered_invoices.map((item: Invoice, index: number): JSX.Element => {
          return <InvoicePreview key={index} item={item} />;
        })
      ) : (
        <Empty />
      )}
    </main>
  );
};

export default Main;
