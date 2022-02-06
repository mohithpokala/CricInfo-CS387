const express =require('express');
const {sy,player_full_info,scorecard_data,matches_info,match_info,comp,top3batsman,top3bowlers,pointstable,Venue,Venue_id,Venueb_id,Venuec_id,piechart} = require('../Controllers');
const routes = express.Router();
const pool = require("../Models/database");
routes.get('/scorecard/:arg1/:arg2/:arg3',scorecard_data);
routes.get('/matches',matches_info);
routes.get('/matches/:match_id',match_info);
routes.get('/scorecomparision/:match_id/:innings_number',comp);
routes.get('/top3batsman/:match_id/:innings_number',top3batsman);
routes.get('/top3bowlers/:match_id/:innings_number',top3bowlers);
routes.get('/piechart/:match_id/:innings_number',piechart);
routes.get('/players/:player_id/:type',player_full_info);
routes.get('/pointstable/:year',pointstable);
routes.get('/season_years',sy);
routes.get('/venue',Venue);
routes.get('/venue/:venue_id',Venue_id);   // Basic Info
routes.get('/venue/b/:venue_id',Venueb_id); //Win percentage
routes.get('/venue/c/:venue_id',Venuec_id);  //Avg First innings Score
routes.get('/years',async(req,res)=>{
  const todo = await pool.query("select distinct season_year as f from match");
  return res.status(200).json(todo.rows);
});
routes.get('/teams',async(req,res)=>{
  const todo = await pool.query("select team_name as f from team");
  return res.status(200).json(todo.rows);
});
routes.post("/add_venue", async (req, res) => {
    console.log(req.body);
    try {


      const newTodo = await pool.query(
        "INSERT INTO venue (venue_name,city_name,country_name,capacity) VALUES($1,$2,$3,$4) RETURNING *",
        [req.body['v1'],req.body['v2'],req.body['v3'],req.body['v4']]
      );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(req);
    }
  });
module.exports = {routes};