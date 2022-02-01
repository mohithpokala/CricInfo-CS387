const pool = require("./database");

const bats_stats = async(match_id,innings_number)=>{

    const query=`
    select
    player.player_id,
    player_name as Batter,
    sum(CASE WHEN player.player_id=striker THEN runs_scored else 0 END) as Runs,
    sum(CASE WHEN runs_scored=4 AND player.player_id=striker THEN 1 else 0 END) as fours,
    sum(CASE WHEN runs_scored=6 AND player.player_id=striker THEN 1 else 0 END) as sixes,
    sum(CASE WHEN player.player_id=striker THEN 1 else 0 END) as Balls_faced,
    MIN(CASE WHEN player.player_id=striker THEN (10*over_id+ball_id) else 500 END) as least_ball
    from ball_by_ball,player,match,player_match
    where
    match.match_id=ball_by_ball.match_id and match.match_id=$1 and innings_no=$2 and 
	player_match.match_id=match.match_id and player.player_id=player_match.player_id
	and
	((innings_no=1 and team1=player_match.team_id) or (innings_no=2 and team2=player_match.team_id))
    group by player_name,player.player_id,playermatch_key
	order by least_ball asc,playermatch_key asc
    `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows
}

const bowl_stats = async(match_id,innings_number)=>{

    const query=`select 
    player.player_id,
    player_name as Bowler,
    count(player_id) as Bowls_Bowled,
    sum(runs_scored) as runs_given,
    count(out_type) as wickets
    from ball_by_ball,player,match
    where
    bowler=player_id and match.match_id=ball_by_ball.match_id and match.match_id=$1 and innings_no=$2
    group by player_name,player.player_id
    order by wickets desc,runs_given asc
    `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows
}

const match_info = async(match_id)=>{
    const query=
    `select distinct
    X.team_name as team1name,Y.team_name as team2name,team1,team2,toss_winner,toss_name,venue_name,city_name,season_year
    from match,venue,team as X,team as Y,team as Z,team as Q
    where 
    venue.venue_id=match.venue_id and
    X.team_id=team1 and Z.team_id in (X.team_id,Y.team_id) and Q.team_id in (X.team_id,Y.team_id)
    and Z.team_id  in (X.team_id,Y.team_id) and
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
        group by match_id
    `;
    const todo = await pool.query(query,[match_id]);
    return todo.rows;
}

const player_info1 = async(match_id)=>{
    console.log(match_id);
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
    const todo = await pool.query(query,[match_id]);
    return todo.rows;
}


const player_info2 = async(match_id)=>{
    console.log(match_id);
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
    const todo = await pool.query(query,[match_id]);
    return todo.rows;
}

module.exports = {player_info1,player_info2,umpire_info,match_info,bats_stats,bowl_stats,summary};