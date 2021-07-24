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

//  calcolate the total of th single invoice server side
  let newTotal = 0;
    items.map((item)=>{
      newTotal = newTotal + item.total;
    })

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
    total:newTotal,
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
        
    invoice.id = req.body.id;
    invoice.createdAt = req.body.createdAt;
    invoice.paymentDue = req.body.paymentDue;
    invoice.description = req.body.description;
    invoice.paymentTerms = req.body.paymentTerms;
    invoice.clientName = req.body.clientName;
    invoice.clientEmail = req.body.clientEmail;
    invoice.status = req.body.status;
    invoice.senderAddress = req.body.senderAddress;
    invoice.clientAddress = req.body.clientAddress;
    invoice.items = req.body.items;
    invoice.total = req.body.total;

    invoice.save()
    .then(()=> res.json('invoice updated'))
    .catch(err => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
