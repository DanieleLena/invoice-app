const router = require("express").Router();
let Invoice = require("../models/invoice.model.js");
//GET ALL THE INVOICES
router.route("/").get((req, res) => {
  Invoice.find()
    .then((invoices) => res.json(invoices))
    .catch((err) => res.status(400).json("Error: " + err));
});
//ADD AN INVOICE
router.route("/add").post((req, res) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;

  const newInvoice = new Invoice({
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  });

  newInvoice
    .save()
    .then(() => res.json("Invoice Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET AN INVOICE BY ID

router.route('/:id').get((req,res) => {
    Invoice.findById(req.params.id)
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE AN INVOICE BY ID 
router.route("/:id").delete((req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Invoice deleted!'))
    .catch((err) => res.status(400).json("Error: " + err));
});

//UPDATE INVOICE BY ID
router.route("/update/:id").post((req, res) => {
  Invoice.findById(req.params.id)
    .then((invoice) => {
        let { 
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = invoice;

   id = req.body.id;
   createdAt = req.body.createdAt;
    paymentDue = req.body.paymentDue;
    description = req.body.description;
    paymentTerms = req.body.paymentTerms;
    clientName = req.body.clientName;
    clientEmail = req.body.clientEmail;
    status = req.body.status;
    senderAddress = req.body.senderAddress;
    clientAddress = req.body.clientAddress;
    items = req.body.items;
    total = req.body.total;

    invoice.save()
    .then(()=> res.json('invoice updated'))
    .catch(err => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
