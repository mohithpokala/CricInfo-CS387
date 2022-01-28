const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require("fs");
app.use(cors());
app.use(express.json()); 
app.get("/scorecard/:arg1/:arg2/:arg3",async (req, res)=>{
  try {
    var x;
    switch(req.params.arg3){
      case "0" : x = "/../Queries/Query2_batting.txt" ; break;
      case "1" : x = "/../Queries/Query2_bowling.txt" ; break;
      case "2" : x = "/../Queries/Query2_extra_runs.txt" ; break;
      case "3" : x = "/../Queries/Query2_misc.txt" ; break;
      case "4" : x = "/../Queries/Query2_umpires.txt" ; break;
      case "5" : x = "/../Queries/Query2_playingXI.txt" ; break;
    }
    console.log(req.params);
    console.log(x);
    var data = fs.readFileSync(__dirname + x);
    console.log(data.toString())
    const todo = await pool.query(data.toString(),[req.params.arg1,req.params.arg2]);
    res.json(todo.rows);  } 
  catch (err) {
    console.error(err.message);
  }
});


app.listen(5000, () => {
  console.log("server has started on port 5000");
});