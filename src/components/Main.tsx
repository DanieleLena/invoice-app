import React from "react";
import { NewFiltersBtns, Empty,InvoicePreview } from ".";
import { useInvoiceContext } from "../context/invoice_context";
import {Invoice} from "../context/invoice_context"

const Main = () => {
  const {total_invoices,invoices,filtered_invoices} = useInvoiceContext()!;



  return (
    <main className="main">
      <NewFiltersBtns />
      {total_invoices ? (
        filtered_invoices.map((item: Invoice, index: number): JSX.Element => {
          return <InvoicePreview key={index} item={item}  />;
        })
      ) : (
        <Empty />
      )}
    </main>
  );
};

export default Main;
