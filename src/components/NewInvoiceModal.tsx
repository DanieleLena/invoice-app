import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Item, useInvoiceContext } from "../context/invoice_context";
import { Invoice } from "../context/invoice_context";
import { createId } from "../helpers";
import { invoices_url as url } from "../helpers";

const NewInvoiceModal = () => {
  const {
    toggleNewInvoiceModal,
    isNewInvoiceOpen,
    handleInvoiceForm,
    addInvoice,
    fetchInvoices,
  } = useInvoiceContext()!;

  const modalRef = useRef();
  const formRef = useRef<HTMLFormElement>(null);

  const [isFirstRender, setIsFirstRender] = useState(false);
  useEffect(() => {
    setIsFirstRender(true);
  }, []);

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
        itemId: Math.floor(1000 + Math.random() * 9000),
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
      },
    ],
    total: 0,
  });

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      toggleNewInvoiceModal();
    }
  };

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
    console.log("ID GENERATED " + generateId);
  }, []);

  //ITEMS FUCNTION ==================================================================

  const handleItemOnChange = (e: any) => {
    //THE ID  = index of the elemnt in items array
    const id: any = e.target.parentNode.parentNode.id;
    //GET THE RIGHT ITEM BY ID
    let selectedItem: Item = result.items[id];

    selectedItem = { ...selectedItem, [e.target.name]: e.target.value };
    let totalItem = selectedItem.price * selectedItem.quantity;
    selectedItem = { ...selectedItem, total: totalItem };

    let newItemList = [...result.items];
    newItemList[id] = selectedItem;
    setResult({ ...result, items: newItemList });
  };
  const addNewItem = (e: { preventDefault: () => void }) => {
    // e.preventDefault();
    let newItem = {
      itemId: Math.floor(1000 + Math.random() * 9000),
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    };
    setResult({ ...result, items: [...result.items, newItem] });
  };

  const deleteItem = (id: number) => {
    let deleteItemList = result.items.filter((item) => item.itemId !== id);
    setResult({ ...result, items: deleteItemList });
  };

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
  const handleSubmit = ( isDraft: boolean,e?: any,) => {
    console.log(isDraft);

    if (e) e.preventDefault();

    let isValidated = true; //validate(); //if validate pass the validation return true

    if (isValidated) {
      if (isDraft) {
        addInvoice(result, true);
      } else {
        addInvoice(result, false);
      }
      fetchInvoices(url);
      toggleNewInvoiceModal();
    }
  };
  const validate = () => {
    let isformCompleted = true;
    const form: any = formRef.current;
    let formElements = form.elements;
    formElements = [...formElements]; //transform the html collection in an array
    formElements = formElements.filter((item: any) => {
      //keep only the input node
      return item.nodeName === "INPUT";
    });
    //remove the invalid-input class when you try to submit the seccond time
    formElements.forEach((item: any) => {
      item.classList.remove("invalid-input");
    });
    formElements.forEach((item: any) => {
      //check if input is empty and/or has dataset of required(not the default "required"attribute )
      if (!item.value && item.dataset.required === "true") {
        item.classList.add("invalid-input");
        isformCompleted = false;
      }
    });
    return isformCompleted;
  };
  // const saveAsDraft = (e: any) => {
  //   e.preventDefault();
  //   setResult({ ...result, status: "draft" });

  //   // handleSubmit(e);
  // };

  // useEffect(() => {
  // console.log(result);
  // if(isFirstRender){
  //     handleSubmit();
  // }
  // }, [result.status])

  return (
    <>
      <div className="modal-bg" ref={modalRef} onClick={closeModal}></div>
      <div className="newInvoice-modal">
        <div className="go-back-container" onClick={toggleNewInvoiceModal}>
          <img src="/assets/icon-arrow-left.svg" alt=""></img>
          <h4>Go Back</h4>
        </div>

        <form ref={formRef}>
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
            data-required="true"
          />
          {/* CLIENT EMAIL ================== */}

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
            data-required="true"
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
            data-required="true"
          />

          {/* PAYMENT TERMS ================== */}

          <label htmlFor="paymentTerms" className="p-gray">
            Payment Terms
          </label>
          <select
            id="paymentTerms"
            name="paymentTerms"
            onChange={handleOnChange}
            data-required="true"
          >
            <option value="1">Net 1 day</option>
            <option value="7">Net 7 day</option>
            <option value="14">Net 14 day</option>
            <option value="30">Net 30 day</option>
          </select>

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
          {/* ITEM LIST ========================== */}
          <div className="item-list">
            <h2>Item List</h2>

            {/* {[...Array(itemNumber)].map((index, i) => ( */}
            {result.items.map((item, i) => (
              <div className="item" key={i} id={i.toString()}>
                {/* ITEM NAME */}
                <div className="item-name">
                  <label htmlFor="name" className="p-gray">
                    Item Name
                  </label>
                  <input
                    className="input-long"
                    type="text"
                    name="name"
                    value={result.items[i].name}
                    onChange={handleItemOnChange}
                    placeholder="Item Name"
                    data-required="true"
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
                    name="quantity"
                    value={result.items[i].quantity}
                    onChange={handleItemOnChange}
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
                    value={result.items[i].price}
                    onChange={handleItemOnChange}
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
                    value={result.items[i].total}
                    onChange={handleItemOnChange}
                    placeholder="0.00"
                    readOnly
                  />
                </div>
                <div
                  className="delete-btn"
                  onClick={(e) => deleteItem(item.itemId)}
                >
                  <img src="/assets/icon-delete.svg" alt="delete item" />
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn addItem-btn"
            type="button"
            onClick={addNewItem}
          >
            + Add New Item
          </button>

          <div className="invoiceDetails-btns modal-btn">
            <button className="btn secondary-btn" type="button">
              Edit
            </button>
            <button
              className="btn dark-btn"
              name="sendAsDraft"
              type="button"
              onClick={() => handleSubmit(true)}
            >
              Save as Draft
            </button>
            <button
              className="btn purple-btn"
              name="send"
              type="button"
              onClick={() => handleSubmit(false)}
            >
              Save &amp; Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewInvoiceModal;
function fetchInvoices(url: string) {
  throw new Error("Function not implemented.");
}
