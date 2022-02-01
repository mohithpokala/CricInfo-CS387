const pool = require("./database");

const mf= async(skip,limit)=>{

    const query=`
    with  b as
    (
        select row_number() over ( order by match_id) as row_num,* from match
    ),
     d as (select * from team),
	 e as (select * from team)
    select match_id,team.team_name as team1,d.team_name as team2,venue.venue_name,venue.city_name,
	e.team_name as winner,b.win_margin,b.win_type,match_winner
    from b,team,d,venue,e
    where
	 team2=d.team_id
	and team1=team.team_id
	and e.team_id=b.match_winner
	and b.venue_id=venue.venue_id
    `;
    const todo = await pool.query(query);
    console.log(todo.rows);
    console.log("hrgh");
    return  todo.rows
}

const mfi= async(match_id)=>
{
  const query=`
  select * from match
where match_id=$1
  `;
  const todo= await pool.query(query,[match_id]);
  return todo.rows

}

module.exports = {mf,mfi};