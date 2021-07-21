import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInvoiceContext } from "../context/invoice_context";
import { Invoice } from "../context/invoice_context";
import { createId } from "../helpers";

const NewInvoiceModal = () => {
  const { toggleNewInvoiceModal, isNewInvoiceOpen, handleInvoiceForm ,addInvoice} =
    useInvoiceContext()!;

  const modalRef = useRef();

  const [result, setResult] = useState<Invoice>({
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 0,
    clientName: "",
    clientEmail: "",
    status: "pending",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ],
    total: 0,
  });

  const [itemNumber, setItemNumber] = useState(1);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      toggleNewInvoiceModal();
    }
  };
  const addNewItem = (e: { preventDefault: () => void; }) => {
    e.preventDefault();    
    setItemNumber(itemNumber+1);

  }

  // Close the modal when press 'Esc' ================================

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

  //CREATES THE INVOICE ID ===========================================
  useEffect(() => {
    let generateId = createId();
    setResult({ ...result, id: generateId });
  }, []);


  const handleOnChange = (e: any) => {
    if (e.target.name.includes("sender")) {
      if (e.target.name.includes("City")) {
        setResult({
          ...result,
          senderAddress: { ...result.senderAddress, city: e.target.value },
        });
      }
      if (e.target.name.includes("Street")) {
        setResult({
          ...result,
          senderAddress: { ...result.senderAddress, street: e.target.value },
        });
      }
      if (e.target.name.includes("Postcode")) {
        setResult({
          ...result,
          senderAddress: {
            ...result.senderAddress,
            postCode: e.target.value,
          },
        });
      }
      if (e.target.name.includes("Country")) {
        setResult({
          ...result,
          senderAddress: { ...result.senderAddress, country: e.target.value },
        });
      }
    } else if (e.target.name.includes("receiver")) {
      if (e.target.name.includes("City")) {
        setResult({
          ...result,
          clientAddress: { ...result.clientAddress, city: e.target.value },
        });
      }
      if (e.target.name.includes("Street")) {
        setResult({
          ...result,
          clientAddress: { ...result.clientAddress, street: e.target.value },
        });
      }
      if (e.target.name.includes("Postcode")) {
        setResult({
          ...result,
          clientAddress: {
            ...result.clientAddress,
            postCode: e.target.value,
          },
        });
      }
      if (e.target.name.includes("Country")) {
        setResult({
          ...result,
          clientAddress: { ...result.clientAddress, country: e.target.value },
        });
      }
    } else {
      setResult({ ...result, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // handleInvoiceForm(result);
    addInvoice(result)
    toggleNewInvoiceModal();
  };

  return (
    <div className="modal-bg" ref={modalRef} onClick={closeModal}>
      <div className="newInvoice-modal">
        <div className="go-back-container" onClick={toggleNewInvoiceModal}>
          <img src="/assets/icon-arrow-left.svg" alt=""></img>
          <h4>Go Back</h4>
        </div>
        <form>
          <h4>Bill from</h4>
          {/* SENDER ================= */}
          <label htmlFor="senderStreet" className="p-gray">
            Street Address
          </label>
          <input
            className="input-long"
            type="text"
            name="senderStreet"
            value={result.senderAddress.street}
            onChange={handleOnChange}
            placeholder="19 Union Terrace"
          />
          {/* SENDER CITY,POSTCODE,COUNTRY ================== */}

          <div className="city-postcode-country">
            <div className="form-line">
              <label htmlFor="senderCity" className="p-gray">
                City
              </label>
              <input
                className="input-short"
                type="text"
                name="senderCity"
                value={result.senderAddress.city}
                onChange={handleOnChange}
                placeholder="London"
              />
            </div>
            <div className="form-line">
              <label htmlFor="senderPostcode" className="p-gray">
                Post Code
              </label>
              <input
                className="input-short"
                type="text"
                name="senderPostcode"
                value={result.senderAddress.postCode}
                onChange={handleOnChange}
                placeholder="E13EZ"
              />
            </div>
            <div className="form-line country">
              <label htmlFor="senderCoutry" className="p-gray">
                Country
              </label>
              <input
                className="input-short"
                type="text"
                name="senderCountry"
                value={result.senderAddress.country}
                onChange={handleOnChange}
                placeholder="United Kingdom"
              />
            </div>
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
            value={result.clientName}
            onChange={handleOnChange}
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
            value={result.clientEmail}
            onChange={handleOnChange}
            placeholder="alexgrim@mail.com"
          />
          {/* CLIENT STREET ================== */}

          <label htmlFor="receiverStreet" className="p-gray">
            Client's Street
          </label>
          <input
            className="input-long"
            type="text"
            name="receiverStreet"
            value={result.clientAddress.street}
            onChange={handleOnChange}
            placeholder="84 Church Way"
          />
          {/*CLIENT CITY,POSTCODE,COUNTRY ================== */}
          <div className="city-postcode-country">
            <div className="form-line">
              <label htmlFor="receiverCity" className="p-gray">
                City
              </label>
              <input
                className="input-short"
                type="text"
                name="receiverCity"
                value={result.clientAddress.city}
                onChange={handleOnChange}
                placeholder="Bradford"
              />
            </div>
            <div className="form-line">
              <label htmlFor="receiverPostcode" className="p-gray">
                Post Code
              </label>
              <input
                className="input-short"
                type="text"
                name="receiverPostcode"
                value={result.clientAddress.postCode}
                onChange={handleOnChange}
                placeholder="BD1 9PB"
              />
            </div>
            <div className="form-line country">
              <label htmlFor="receiverCountry" className="p-gray">
                Country
              </label>
              <input
                className="input-short"
                type="text"
                name="receiverCountry"
                value={result.clientAddress.country}
                onChange={handleOnChange}
                placeholder="United Kingdom"
              />
            </div>
          </div>
          {/* INVOICE DATE ================== */}

          <label htmlFor="invoiceDate" className="p-gray">
            Invoice Date
          </label>
          <input
            className="input-long"
            type="date"
            name="paymentDue"
            value={result.paymentDue}
            onChange={handleOnChange}
          />

          {/* PAYMENT TERMS ================== */}

          <label htmlFor="paymentTerms" className="p-gray">
            Payment Terms
          </label>
          <select
            id="paymentTerms"
            name="paymentTerms"
            onChange={handleOnChange}
          >
            <option value="1">Net 1 day</option>
            <option value="7">Net 7 day</option>
            <option value="14">Net 14 day</option>
            <option value="30">Net 30 day</option>
          </select>
          {/* <input
            className="input-long"
            type="text"
            name="paymentTerms"
            value={result.paymentTerms}
            placeholder="net 30 Days"
          /> */}
          {/* PAYMENT TERMS ================== */}

          <label htmlFor="projectDesciption" className="p-gray">
            Project Desciption
          </label>
          <input
            className="input-long"
            type="text"
            name="description"
            value={result.description}
            onChange={handleOnChange}
            placeholder="Graphic design"
          />
          {/* PROVA ========================== */}
          <div className="item-list">
            <h2>Item List</h2>

            {[...Array(itemNumber)].map((index, i) => (
              <div className="item" key={i}>
                {/* ITEM NAME */}
                <div className="item-name">
                  <label htmlFor="name" className="p-gray">
                    Item Name
                  </label>
                  <input
                    className="input-long"
                    type="text"
                    name="name"
                    value={result.description}
                    onChange={handleOnChange}
                    placeholder="Item Name"
                  />
                </div>
                {/* ITEM QUANTITY */}
                <div className="item-qty">
                  <label htmlFor="quantity" className="p-gray">
                    Qty.
                  </label>
                  <input
                    className="input-long"
                    type="text"
                    name="number"
                    value={result.description}
                    onChange={handleOnChange}
                    placeholder="1"
                  />
                </div>
                {/* ITEM PRICE */}
                <div className="item-price-form">
                  <label htmlFor="price" className="p-gray">
                    Price
                  </label>
                  <input
                    className="input-long"
                    type="number"
                    name="price"
                    value={result.description}
                    onChange={handleOnChange}
                    placeholder="0.00"
                  />
                </div>
                {/* ITEM TOTAL */}
                <div className="item-total-form">
                  <label htmlFor="total" className="p-gray">
                    Total
                  </label>
                  <input
                    className="input-long"
                    type="number"
                    name="total"
                    value={result.description}
                    onChange={handleOnChange}
                    placeholder="0.00"
                    readOnly
                  />
                </div>
                <div className="remove-btn">
                  <img src="/assets/icon-delete.svg" alt="delete item" />
                </div>
              </div>
            ))}
          </div>
          <button className="btn" onClick={addNewItem}>
            ADD NEW ITEM
          </button>
          {/* PROVA ========================== */}

          <div className="invoiceDetails-btns">
            <button className="btn secondary-btn">Edit</button>
            <button className="btn dark-btn">Save as Draft</button>
            <button className="btn purple-btn" onClick={handleSubmit}>
              Save &amp; Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoiceModal;


