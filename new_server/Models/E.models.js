const pool = require("./database");

const venues = async() => {

    const query =
        `
        with e as
 (
 select match_id,venue.venue_id
 from match,venue
 where match.venue_id=venue.venue_id),
  f as
  (
select match_id, 1 as matches
	  from ball_by_ball
group by match_id),
i as
(
 	select e.venue_id,e.match_id,matches
	from f,e
	where e.match_id=f.match_id
),
g as
(
select e.venue_id,matches
from f,e
where e.match_id=f.match_id
),
h as
(
select venue_id
from g
group by venue_id
), j as
(
select venue_id,
	sum(matches) as matches
from i
group by venue_id
),
l as
(
select h.venue_id,matches
from h,j
where h.venue_id=j.venue_id
)
select venue.*,l.matches
from venue,l
where venue.venue_id=l.venue_id

        `;
    const todo = await pool.query(query,[]);
    return  todo.rows;
}


const Venue_Id = async(venue_id) => {

    const query =
        `
        with d as
  (
  with b as
  (
  select  match_id,innings_no,sum(runs_scored+extra_runs) as score
  from ball_by_ball
  group by match_id,innings_no
  order by match_id)
  select b.match_id,score
  from match,b
  where b.match_id=match.match_id
  and win_type='wickets'
  and innings_no=1
 ), e as
 (
 select match_id,venue.venue_id
 from match,venue
 where match.venue_id=venue.venue_id),
 b as
  (
  select  match_id,innings_no,sum(runs_scored+extra_runs) as score
  from ball_by_ball
  group by match_id,innings_no
  order by match_id),
  f as
  (
select match_id,max(score) as max_score,
	  min(score) as min_score , 1 as matches
	  from b
group by match_id),
i as
(
 	select e.venue_id,e.match_id,max_score,min_score,matches
	from f,e
	where e.match_id=f.match_id
),
g as
(
select e.venue_id,d.score as chase,f.min_score,f.max_score,matches
from d,f,e
where d.match_id=f.match_id
and e.match_id=d.match_id
),
h as
(
select venue_id,
max(chase) as chase
from g
group by venue_id
), j as
(
select venue_id,
	max(max_score) as max_scores,
	min(min_score) as min_scores,
	sum(matches) as matches
from i
group by venue_id
),
l as
(
select h.venue_id,chase,max_scores,min_scores,matches
from h,j
where h.venue_id=j.venue_id
)
select venue.venue_name,city_name,capacity,l.*
from venue,l
where venue.venue_id=l.venue_id
and l.venue_id=$1

        `;
    const todo = await pool.query(query,[venue_id]);
    return  todo.rows;
}



const Venueb_Id = async(venue_id) => {

    const query =
        `
        with b as
        (
            select venue_id,count(venue_id) as bat
        from match
        where win_type='runs'
        and match_winner=toss_winner
        group by venue_id
        ), d as
        (
            select venue_id,count(venue_id) as bowl
        from match
        where win_type='wickets'
        and match_winner=toss_winner
        group by venue_id
        ),
        e as 
        (
            select venue_id,count(*) as total
        from match
        where toss_winner=match_winner
        group by venue_id
        order by venue_id
        ), f as
        (
        select b.venue_id,
        bat,bowl,total
        from b,d,e
        where b.venue_id=d.venue_id
        and e.venue_id=d.venue_id
            )
        select f.venue_id,venue.venue_name,(100.0*bat)/total as bat,
        (100.0*bowl)/total as bowl
        from f,venue
        where f.venue_id=venue.venue_id
        and f.venue_id=$1

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