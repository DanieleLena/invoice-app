import React from "react";
import { isTemplateTail } from "typescript";
import { Invoice } from "../context/invoice_context";
import {formatPrice,formatDate} from "../helpers"
import { Link } from "react-router-dom";


const InvoicePreview: React.FC<{item: Invoice}> = ({item}) => {

const {id,paymentDue,clientName, status,total} = item;
   
  //  onClick={openInvoice(item)}
  return (
    <Link to={`/${id}`}>
      <article className="invoice-preview">
        <h3 className="id">
          <span className="hashtag">#</span>
          {id}
        </h3>
        <p className="name">{clientName}</p>
        <p className="date">Due {formatDate(paymentDue)}</p>
        <h2 className="import">{formatPrice(total)}</h2>
        <div className={`status-cell ${status}`}>
          <div className="status">
            <div className="status-circle"></div>
            <h2>{status}</h2>
          </div>
          <img src="/assets/icon-arrow-right.svg" className="right-arrow"></img>
        </div>
      </article>
    </Link>
  );
};

export default InvoicePreview;
