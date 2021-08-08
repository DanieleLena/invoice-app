require("dotenv").config({ path: ".ENV" });
const mongoose = require("mongoose");

// const uri = process.env.ATLAS_URI;
// console.log(process.env.ATLAS_URI);
// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
