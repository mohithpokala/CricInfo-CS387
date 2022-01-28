const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { scorecard } = require('./Controllers')
app.use(cors());
app.use(express.json()); 
app.get("/scorecard/:arg1/:arg2/:arg3", scorecard.scorecard);


app.listen(5000, () => {
  console.log("server has started on port 5000");
});