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
        with F(SCORE_MATCH) as 
        (select sum(runs_scored) as SCORE_MATCH from ball_by_ball where striker = $1 group by match_id)
        select 
        (select count(distinct match_id) from ball_by_ball where striker=$1 or non_striker=$1) as number_of_matches_played,
        sum(CASE when runs_scored=4 THEN 1 ELSE 0 END) as FOUR,
        sum(CASE when runs_scored=6 THEN 1 ELSE 0 END) as SIX,
        sum(runs_scored) as total_runs,
        (select sum(CASE WHEN SCORE_MATCH>=50 THEN 1 ELSE 0 END) as NUM_FIFTY from F),
        (select max(SCORE_MATCH) from F) as HS,
        ROUND(1.0*sum(runs_scored)/count(striker)*100,2) as Strike_rate,
        ROUND(sum(runs_scored)/(select coalesce(count(out_type),1) from ball_by_ball where striker=$1),2) as average
        from 
        ball_by_ball
        where striker = $1
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
        select match_id,sum(runs_scored) as runs_given,count(out_type) as num_wkts from ball_by_ball where bowler=315 group by match_id
        `;
    const todo = await pool.query(query,[player_id]);
    return  todo.rows;
}

module.exports = {player_bio,player_score_bat,player_bowl,player_bat,player_score_bowl};