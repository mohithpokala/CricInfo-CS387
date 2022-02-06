const pool = require("./database");

const pointsTable = async(year) => {

    const query =
        `
        with F(r,t,s,ov) as 
        (select sum(runs_scored)+sum(extra_runs) as runs_scored,team_id,season_year,count(distinct (match.match_id,over_id))
        from ball_by_ball,player_match,match
        where
        ball_by_ball.striker=player_match.player_id and ball_by_ball.match_id=player_match.match_id and player_match.match_id=match.match_id
        group by team_id,season_year),
        G(r,t,s,ov) as 
        (select sum(runs_scored)+sum(extra_runs) as runs_scored,team_id,season_year,count(distinct (match.match_id,over_id))
        from ball_by_ball,player_match,match
        where
        ball_by_ball.bowler=player_match.player_id and ball_by_ball.match_id=player_match.match_id and player_match.match_id=match.match_id
        group by team_id,season_year),
        H(r,t,s) as
        (select 
        (select count(team1) from match where season_year=Y.season_year and team1=X.team_id)
        +
        (select count(team1) from match where season_year=Y.season_year and team2=X.team_id),
        team_id,season_year
        from match as Y,team as X 
        group by season_year,team_id),
        J(w,l,t,s) as 
        (select 
        sum(CASE when match_winner=team_id THEN 1 else 0 END) as won,
        sum(CASE when match_winner!=team_id and team_id in (team1,team2) THEN 1 else 0 END) as Lost,team_id,season_year
        from team,match
        where
        team_id in (team1,team2)
         group by team_id,season_year
        )
        select G.t as team_id,team_name,H.r as MATCH,J.w as WON,J.l as LOST,0 as TIED,Round(1.0*F.r/F.ov-1.0*G.r/G.ov,2) as NRR,2*J.w as POINTS,G.s
        
        from F,G,H,J,team where
        G.t=F.t and F.t=H.t  and J.t=H.t and team.team_id=G.t
        and
        G.s=F.s and F.s=H.s and J.s=H.s 
        and G.s=$1
        order by points desc, NRR desc
        

        `;
    const todo = await pool.query(query,[year]);
    return  todo.rows;
}

const syears = async() => {
    const query =`select distinct season_year from match order by season_year desc`;
    const todo = await pool.query(query,[]);
    return todo.rows;
}
module.exports={pointsTable,syears};