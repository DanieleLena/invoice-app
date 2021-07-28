import React from "react";
import { NewFiltersBtns, Empty,InvoicePreview,NewInvoiceModal } from ".";
import { useInvoiceContext } from "../context/invoice_context";
import {Invoice} from "../context/invoice_context";
import { useDelayUnmount } from "../helpers";


const Main = () => {
  const { total_invoices, isInvoicesLoading, filtered_invoices, isNewInvoiceOpen } =
    useInvoiceContext()!;

 const shouldRenderChild = useDelayUnmount(isNewInvoiceOpen, 300);
 const mountedStyle = {
   animation: "inAnimation 300ms ease-in",
   position: "fixed",
   top: 0,
   left: 0,
 } as React.CSSProperties;;
 const unmountedStyle = {
   animation: "outAnimation 310ms ease-in",
   position: "fixed",
   top: 0,
   left: 0,
 } as React.CSSProperties;;

 console.log(shouldRenderChild);
 
// isNewInvoiceOpen ? mountedStyle : unmountedStyle;
  return (
    <main className="main">
      <NewFiltersBtns />
      {shouldRenderChild && (
        <div  style={ isNewInvoiceOpen ? mountedStyle : unmountedStyle}>
          <NewInvoiceModal  />
        </div>
      )}

      {isInvoicesLoading && <h2>LOADING...</h2>}

      {total_invoices ? (
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
