import { timeout } from "q";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useInvoiceContext } from "../context/invoice_context";
import { formatDate, formatPrice } from "../helpers";

const InvoiceDetails = () => {
  let id = useParams();
  const { invoices, getSingleInvoice, single_invoice } = useInvoiceContext();

  console.log(single_invoice);

  useEffect(() => {
    getSingleInvoice(id);
  }, [invoices]);

  //TO CHANGE WITH A LOADING STATUS LATER WHEN WE GONNA FETCH DATA FROM DATABASE
  if (Object.keys(single_invoice).length === 0) {
    console.log("laoding");
    return <h2>Loading</h2>;
  }

  const {
    id: idInvoice,
    clientName,
    status,
    description,
    senderAddress: {
      city: citySender,
      street: streetSender,
      country: countrySender,
      postCode: postCodeSender,
    },
    clientAddress: {
      city:cityClient,
      street:streetClient,
      country:countryClient,
      postCode: postCodeClient,
    },
    total,
    clientEmail,
    createdAt,
    paymentDue,
  } = single_invoice;
  

  


  return (
    <section className="invoiceDetails-section">
      <Link to="/">
        <div className="go-back-container">
          <img src="/assets/icon-arrow-left.svg" alt=""></img>
          <h4>Go Back</h4>
        </div>
      </Link>
      <div className="status-container">
        <p>Status</p>
        <div className={`status-cell ${status}`}>
          <div className="status">
            <div className="status-circle"></div>
            <h2>{status}</h2>
          </div>
          <img src="/assets/icon-arrow-right.svg" className="right-arrow"></img>
        </div>
      </div>
      <div className="invoiceDetails-btns">
        <button className="btn secondary-btn">Edit</button>
        <button className="btn delete">Delete</button>
        <button className="btn confirm">Mark as Pending</button>
      </div>

      <div className="invoiceDetails-main">
        <div className="invoiceDetails-text">
          <div className="id-job">
            <h3>#{idInvoice}</h3>
            <p className="p-gray">{description}</p>
          </div>
          <div className="sender-address-container">
            <p className="p-gray">{streetSender}</p>
            <p className="p-gray">{citySender}</p>
            <p className="p-gray">{postCodeSender}</p>
            <p className="p-gray">{countrySender}</p>
          </div>
          <div className="dates-container">
            <div className="invoice-date">
              <p className="p-gray">Invoice Date:</p>
              <h2>{formatDate(createdAt)}</h2>
            </div>
            <div className="invoice-date">
              <p className="p-gray">Invoice Due:</p>
              <h2>{formatDate(paymentDue)}</h2>
            </div>
          </div>
          <div className="client-address-container">
            <p className="p-gray">Bill to</p>
            <h2>{clientName}</h2>
            <p className="p-gray">{streetClient}</p>
            <p className="p-gray">{cityClient}</p>
            <p className="p-gray">{postCodeClient}</p>
            <p className="p-gray">{countryClient}</p>
          </div>
          <div className="email-container">
            <p className="p-gray">Sent to</p>
            <h2>{clientEmail}</h2>
          </div>
        </div>
        <div className="invoiceDetails-items-container">
          <div className="invoiceDetails-item">
            <div className="item-name">
              <p className="p-gray">Item</p>
            </div>
            <div className="item-quantity">
              <p className="p-gray">QTY.</p>
            </div>
            <div className="item-price">
              <p className="p-gray">Price</p>
            </div>
            <div className="item-total">
              <p className="p-gray">Total</p>
            </div>
          </div>
          <div className="invoiceDetails-item">
            <div className="item-name">
              <h4>Banner Design</h4>
            </div>
            <div className="item-quantity">
              <h4>1x</h4>
            </div>
            <div className="item-price">
              <h4>{formatPrice(35)}</h4>
            </div>
            <div className="item-total">
              <h4>{formatPrice(350)}</h4>
            </div>
          </div>

          <div className="invoiceDetails-item">
            <div className="item-name">
              <h4>Banner Design</h4>
            </div>
            <div className="item-quantity">
              <h4>1x</h4>
            </div>
            <div className="item-price">
              <h4>{formatPrice(35)}</h4>
            </div>
            <div className="item-total">
              <h4>{formatPrice(350)}</h4>
            </div>
          </div>

          <div className="invoiceDetails-grandTotal">
            <p>Grand Total</p>
            <h2>556,30$</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetails;
