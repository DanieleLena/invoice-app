const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
  id: {
    type: String, required: true,
  },
  createdAt: {
    type: String,
  },
  paymentDue: {
    type: String,
  },
  description: {
    type: String,
  },
  paymentTerms: {
    type: Number,
  },
  clientName: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  status: {
    type: String,
  },
  senderAddress: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String },
    country: { type: String },
  },
  clientAddress: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String },
    country: { type: String },
  },
  items: {
    type: Array,
  },
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("invoice", InvoiceSchema);
