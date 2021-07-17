import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInvoiceContext } from "../context/invoice_context";

const NewInvoiceModal = () => {
  const { toggleNewInvoiceModal, isNewInvoiceOpen } = useInvoiceContext()!;

  const modalRef = useRef();

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      toggleNewInvoiceModal();
    }
  };
  const keyEsc = useCallback(
    (e: any) => {
      if (e.key === "Escape" && isNewInvoiceOpen) {
        toggleNewInvoiceModal();
      }
    },
    [isNewInvoiceOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyEsc);
    return () => document.removeEventListener("keydown", keyEsc);
  }, [keyEsc]);

  return (
    <div className="modal-bg" ref={modalRef} onClick={closeModal}>
      <div className="newInvoice-modal">
        <div className="go-back-container" onClick={toggleNewInvoiceModal}>
          <img src="/assets/icon-arrow-left.svg" alt=""></img>
          <h4>Go Back</h4>
        </div>
        <form action="submit">
          <h4>Bill from</h4>
          {/* SENDER ================== */}
          <label htmlFor="streetSender" className="p-gray">
            Street Address
          </label>
          <input
            className="input-long"
            type="text"
            name="streetSender"
            placeholder="19 Union Terrace"
          />
          {/* SENDER CITY,POSTCODE,COUNTRY ================== */}
          <div className="city-postcode-country">
            <label htmlFor="citySender" className="p-gray">
              City
            </label>
            <input
              className="input-short"
              type="text"
              name="citySender"
              placeholder="London"
            />

            <label htmlFor="postcodeSender" className="p-gray">
              Post Code
            </label>
            <input
              className="input-short"
              type="text"
              name="postcodeSender"
              placeholder="E13EZ"
            />

            <label htmlFor="countrySender" className="p-gray">
              Country
            </label>
            <input
              className="input-short"
              type="text"
              name="countrySender"
              placeholder="United Kingdom"
            />
          </div>

          {/* CLIENT ================== */}
          <h4>Bill To</h4>
          {/* CLIENT NAME ================== */}

          <label htmlFor="clientName" className="p-gray">
            Client's Name
          </label>
          <input
            className="input-long"
            type="text"
            name="clientName"
            placeholder="Alex Grinn"
          />
          {/* CLIENT E-MAIL ================== */}

          <label htmlFor="clientEmail" className="p-gray">
            Client's Email
          </label>
          <input
            className="input-long"
            type="email"
            name="clientEmail"
            placeholder="alexgrim@mail.com"
          />
          {/* CLIENT STREET ================== */}

          <label htmlFor="clientStreet" className="p-gray">
            Client's Street
          </label>
          <input
            className="input-long"
            type="text"
            name="clientStreet"
            placeholder="84 Church Way"
          />
          {/*CLIENT CITY,POSTCODE,COUNTRY ================== */}
          <div className="city-postcode-country">
            <label htmlFor="clientCity" className="p-gray">
              City
            </label>
            <input
              className="input-short"
              type="text"
              name="clientCity"
              placeholder="Bradford"
            />

            <label htmlFor="clientPostcode" className="p-gray">
              Post Code
            </label>
            <input
              className="input-short"
              type="text"
              name="clientPostcode"
              placeholder="BD1 9PB"
            />

            <label htmlFor="clientCountry" className="p-gray">
              Country
            </label>
            <input
              className="input-short"
              type="text"
              name="clientCountry"
              placeholder="United Kingdom"
            />
          </div>
          {/* INVOICE DATE ================== */}

          <label htmlFor="invoiceDate" className="p-gray">
            Invoice Date
          </label>
          <input className="input-long" type="date" name="invoiceDate" />
          {/* PAYMENT TERMS ================== */}

          <label htmlFor="paymentTerms" className="p-gray">
            Payment Terms
          </label>
          <input
            className="input-long"
            type="text"
            name="paymentTerms"
            placeholder="net 30 Days"
          />
          {/* PAYMENT TERMS ================== */}

          <label htmlFor="projectDesciption" className="p-gray">
            Project Desciption
          </label>
          <input
            className="input-long"
            type="text"
            name="projectDesciption"
            placeholder="Graphic design"
          />
          <div className="invoiceDetails-btns">
            <button className="btn secondary-btn">Edit</button>
            <button className="btn dark-btn">Save as Draft</button>
            <button className="btn purple-btn">Save &amp; Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceModal;
