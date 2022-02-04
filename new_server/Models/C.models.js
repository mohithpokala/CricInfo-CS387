const pool = require("./database");

const player_bio = async(player_id) => {

    const query =
        `
            select player_name,country_name,batting_hand,bowling_skill
            from player where player_id=$1
        `;
    const todo = await pool.query(query,[player_id]);
    return  todo.rows;
}

const player_bat = async(player_id) => {

    const query =
        `
        SELECT number_of_matches_played,FOUR,SIX,total_runs,NUM_FIFTY,HS,sum(CASE WHEN b=0 then 0 else ROUND(1.0*a/b*100,2) end) as strike_rate,
        sum(case when d=0 then c else ROUND(1.0*c/d) end) as average from (
        with F(SCORE_MATCH) as 
        (select sum(runs_scored) as SCORE_MATCH from ball_by_ball where striker = $1 group by match_id)
        select 
        (select count(distinct match_id) from ball_by_ball where striker = $1 or non_striker = $1) as number_of_matches_played,
        sum(CASE when runs_scored=4 and striker = $1 THEN 1 ELSE 0 END) as FOUR,
        sum(CASE when runs_scored=6 and striker = $1 THEN 1 ELSE 0 END) as SIX,
        sum(CASE when  striker = $1 THEN runs_scored ELSE 0 END) as total_runs,
        coalesce((select sum(CASE WHEN SCORE_MATCH>=50 AND SCORE_MATCH<100  THEN 1 ELSE 0 END) from F),0) as NUM_FIFTY,
        coalesce((select max(SCORE_MATCH) from F),0) as HS,
        1.0*sum(CASE when  striker = $1 THEN runs_scored ELSE 0 END) as a,(sum( case when striker = $1 THEN 1 else 0 end)) as b,
        sum(CASE when  striker = $1 THEN runs_scored ELSE 0 END) as c,(select sum( case when striker = $1 and out_type is not null THEN 1 else 0 end) from ball_by_ball ) as d 
        from 
        ball_by_ball
) as ifgfjji group by number_of_matches_played,FOUR,SIX,total_runs,NUM_FIFTY,HS
        `;
    const todo = await pool.query(query,[player_id]);
    return  todo.rows;
}

const player_score_bat = async(player_id) => {

    const query =
        `
        select sum(runs_scored) as SCORE_MATCH,match_id from ball_by_ball where striker = $1 group by match_id
        `;
    const todo = await pool.query(query,[player_id]);
    return  todo.rows;
}

const player_bowl = async(player_id) => {

    const query =
        `
        with F(wkts) as (select count(out_type) from ball_by_ball where bowler=$1 group by match_id)
        select 
        count(distinct match_id) as num_matches,
        sum(runs_scored) as runs_given,
        count(out_type) as num_wkts,
        count(distinct (match_id,over_id,innings_no)) as overs,
        count(distinct (match_id,over_id,innings_no,ball_id)) as balls,
        ROUND(1.0*sum(runs_scored)/count(distinct (match_id,over_id,innings_no)),2) as economy,
        (select sum(CASE when wkts>=5 THEN 1 else 0 END) from F) as five_wkts
        from ball_by_ball 
        where bowler=$1
        `;
    const todo = await pool.query(query,[player_id]);
    return  todo.rows;
}

const player_score_bowl = async(player_id) => {

    const query =
        `
        select match_id,sum(runs_scored) as runs_given,count(out_type) as num_wkts from ball_by_ball where bowler=$1 group by match_id
        `;
    const todo = await pool.query(query,[player_id]);
    return  todo.rows;
}

module.exports = {player_bio,player_score_bat,player_bowl,player_bat,player_score_bowl};