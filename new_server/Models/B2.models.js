const pool = require("./database");

const bats_stats = async(match_id,innings_number)=>{

    const query=`select
        player_name as Batter,
        sum(runs_scored) as Runs,
        sum(CASE WHEN runs_scored=4 THEN 1 else 0 END) as fours,
        sum(CASE WHEN runs_scored=6 THEN 1 else 0 END) as sixes,
        count(striker) as Balls_faced
        from ball_by_ball,player,match
        where
        striker=player_id and match.match_id=ball_by_ball.match_id and match.match_id=$1 and innings_no=$2
        group by player_name
    `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows
}

const bowl_stats = async(match_id,innings_number)=>{

    const query=`select 
        player_name as Bowler,
        count(player_id) as Bowls_Bowled,
        sum(runs_scored) as runs_given,
        count(out_type) as wickets
        from ball_by_ball,player,match
        where
        bowler=player_id and match.match_id=ball_by_ball.match_id and match.match_id=$1 and innings_no=$2
        group by player_name
    `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows
}

const match_info = async(match_id)=>{
    const query=
    `select 
        toss_winner,toss_name,venue_name,city_name,season_year,X.team_name,Y.team_name
        from match,venue,team as X,team as Y
        where 
        venue.venue_id=match.venue_id and
        X.team_id=team1 and
        Y.team_id=team2 and match_id=$1 
    `;
    const todo = await pool.query(query,[match_id]);
    return todo.rows;
}

const umpire_info = async(match_id)=>{
    const query=
    `
        select umpire_name
        from umpire_match , umpire
        where
        umpire.umpire_id=umpire_match.umpire_id and
        match_id = $1
    `;
    const todo = await pool.query(query,[match_id]);
    return todo.rows;
}

const summary = async(match_id)=>{
    const query=
    `
        select match_id,
        sum(CASE when innings_no=1 THEN extra_runs else 0 END) as extra1,
        sum(CASE when innings_no=2 THEN extra_runs else 0 END) as extra2,
        sum(CASE when innings_no=1 THEN extra_runs+runs_scored else 0 END) as total1,
        sum(CASE when innings_no=2 THEN extra_runs+runs_scored else 0 END) as total2,
        sum(CASE WHEN innings_no=1 and out_type is not NULL THEN 1 else 0 END) as wkts1,
        sum(CASE WHEN innings_no=2 and out_type is not NULL THEN 1 else 0 END) as wkts2
        from ball_by_ball
        where match_id = $1
    `;
    const todo = await pool.query(query,[match_id]);
    return todo.rows;
}

const player_info1 = async(match_id,team_number)=>{
    console.log(match_id,team_number);
    const query=
    `
        select player_name 
        from player_match,player,match 
        where 
        player_match.player_id = player.player_id
        and
        player_match.match_id = match.match_id
        and 
        player_match.team_id = match.team1
        and
        player_match.match_id=$1
    `;
    const todo = await pool.query(query,[match_id,team_number]);
    return todo.rows;
}


const player_info2 = async(match_id,team_number)=>{
    console.log(match_id,team_number);
    const query=
    `
        select player_name 
        from player_match,player,match 
        where 
        player_match.player_id = player.player_id
        and
        player_match.match_id = match.match_id
        and 
        player_match.team_id = match.team2
        and
        player_match.match_id=$1
    `;
    const todo = await pool.query(query,[match_id,team_number]);
    return todo.rows;
}

module.exports = {player_info1,player_info2,umpire_info,match_info,bats_stats,bowl_stats,summary};