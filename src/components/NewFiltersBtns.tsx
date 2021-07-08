import React from "react";
import { useInvoiceContext } from "../context/invoice_context";

const NewFiltersBtns = () => {
  const { total_invoices, updateFilter, filter:{draft,pending,paid} } = useInvoiceContext()!;

  return (
    <div className="filters-btn-container">
      <div className="filter-btn-left">
        <h1>Invoices</h1>

        <p>
          <span className="hidden-mobile-span">There are </span>
          {total_invoices} <span className="hidden-mobile-span">total </span>{" "}
          invoices
        </p>
      </div>
      <div className="filter-btn-right">
        <div className="dropdownMenu">
          <button className="dropdowBtn">
            Filter<span className="hidden-mobile-span">By Status</span>
            <span>
              <img src="/assets/icon-arrow-down.svg"></img>
            </span>
          </button>
          <div className="dropdown-content">
            <div>
              <input
                type="checkbox"
                id="draft"
                name="draft"
                checked={draft}
                onChange={updateFilter}
              ></input>
              <label htmlFor="draft"> Draft</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="pending"
                name="pending"
                checked={pending}
                onChange={updateFilter}
              ></input>
              <label htmlFor="pending"> Pending</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="paid"
                name="paid"
                checked={paid}
                onChange={updateFilter}
              ></input>
              <label htmlFor="paid">Paid</label>
            </div>
          </div>
        </div>
        <div className="new-btn-container">
          <div className="plus-container">
            <img src="/assets/icon-plus.svg"></img>
          </div>
          <span>
            New <span className="hidden-mobile-span">Invoice</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewFiltersBtns;
