const pool = require("./database");

const venues = async() => {

    const query =
        `
        select venue.venue_id,venue_name,city_name,capacity,country_name,count(distinct match_id) from venue left outer join match  on venue.venue_id=match.venue_id group  by venue.venue_id,venue_name,city_name,capacity,country_name
        `;
    const todo = await pool.query(query,[]);
    console.log(todo);
    return  todo.rows;
}


const Venue_Id = async(venue_id) => {

    const query =
        `
        with f1(r,m) as
(select sum(runs_scored)+sum(extra_runs),match_id from ball_by_ball where innings_no=1  group by match_id),
 f2(r,m) as
(select sum(runs_scored)+sum(extra_runs),match_id from ball_by_ball where innings_no = 2  group by match_id)

select 
venue_name,venue.venue_id,city_name,country_name,capacity,count(distinct match_id) as matches_played,
min(case when  f2.m!=match.match_id then 1000000 else case when f1.r<f2.r then f1.r else f2.r end end) as min_scores
,max(case when f2.m!=match.match_id then 0 else case when f1.r>f2.r and f2.m=match.match_id then f1.r else f2.r end end) as max_scores,
max(case when f2.m=match.match_id and ((toss_name='bat' and toss_winner!=match_winner) or (toss_name='field' and toss_winner=match_winner)) then f1.r else -1 end) as chase
from f1,f2,match   right outer join venue on
match.venue_id =venue.venue_id where f1.m=f2.m and venue.venue_id=$1 group by venue_name,venue.venue_id,city_name,country_name,capacity


        `;
    const todo = await pool.query(query,[venue_id]);
    return  todo.rows;
}



const Venueb_Id = async(venue_id) => {

    const query =
        `
        select venue.venue_id,
sum(case when match.venue_id=venue.venue_id and match.venue_id is not null and (
	(toss_name='bat' and toss_winner=match_winner) 
	or 
	(toss_name='field' and toss_winner!=match_winner)
) then 1 else 0 end) as batwin,
sum(case when match.venue_id=venue.venue_id and match.venue_id is not null and (
	(toss_name='field' and toss_winner=match_winner) 
	or 
	(toss_name='bat' and toss_winner!=match_winner)
) then 1 else 0 end
) as bowlwin,
sum(case when match.venue_id=venue.venue_id then 1 else 0 end) as nummat
from match right outer join venue on match.venue_id=venue.venue_id where venue.venue_id=$1 group by venue.venue_id,match.venue_id

        `;
    const todo = await pool.query(query,[venue_id]);
    return  todo.rows;
}




const Venuec_Id = async(venue_id) => {

    const query =
        `
        with b as
(
  select  match_id,sum(runs_scored+extra_runs) as score
  from ball_by_ball
  where innings_no=1
  group by match_id,innings_no
	), d as
	(
select b.match_id,season_year,score
from b,match
where b.match_id=match.match_id
		and venue_id=$1
)
select season_year,avg(score)
from d
group by season_year

        `;
    const todo = await pool.query(query,[venue_id]);
    return  todo.rows;
}

module.exports={venues,Venue_Id,Venueb_Id,Venuec_Id};