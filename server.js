const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budget_db", {
  
  //process.env.MONGODB_URI || "mongodb+srv://Adriana-admin:Password1234@cluster0.2bfav.mongodb.net/budget_db?retryWrites=true&w=majorityuseNewUrlParser: true",{
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});