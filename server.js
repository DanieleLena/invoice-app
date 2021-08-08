const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const connectDB = require("./db");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());


// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("mongoDb database connection established succesfully");
// });

const invoicesRouter = require('./routes/invoices');


app.use('/invoices', invoicesRouter);

if(process.env.NODE_ENV  === "production") {
  app.use(express.static("client/build"));

  app.get('*', (req,res) => {
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
