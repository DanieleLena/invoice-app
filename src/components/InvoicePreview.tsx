import React from "react";

const InvoicePreview = () => {
  return (
    <article className="invoice-preview">
      <h3 className="id">
        <span className="hashtag">#</span>RT5786
      </h3>
      <p className="name">Daniele Lena</p>

      <p className="date">Due 19 Aug 2021</p>
      <h2 className="import">£1,800.90</h2>
<div className="status-cell">
      <div className="status">
        <div className="status-circle"></div>
        <h2>Paid</h2>
      </div>
      <img src="/assets/icon-arrow-right.svg" className="right-arrow"></img>
      </div>
    </article>
  );
};

export default InvoicePreview;
