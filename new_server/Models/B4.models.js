const pool = require("./database");

const tbat = async(match_id,innings_number) => {

    const query =
        `
            select 
            player.player_id,player_name,sum(runs_scored) as runs_scored,
            RANK() OVER(
                ORDER BY sum(runs_scored) desc ,
                count(player_name) asc,
                player_name asc
            ) as ranks ,
            count(player_name) as balls_faced 
            from ball_by_ball,player
            where 
            player.player_id=ball_by_ball.striker 
            and 
            match_id=$1 and innings_no=$2
            group by player_name,player.player_id
            order by ranks
            limit 3
        `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows;
}

const tbowl = async(match_id,innings_number) => {

    const query =
        `
		    select player_id,player_name,runs_given,wkts_taken,ranks,balls_bowled 
		    from
		    (	
                select 
                player.player_id,player_name,sum(runs_scored) as runs_given,
                count(out_type) as wkts_taken,
                RANK() OVER(
                    ORDER BY 
                    count(out_type) desc,
                    sum(runs_scored) asc ,
                    player_name asc
                ) as ranks ,
                count(player_name) as balls_bowled 
                from ball_by_ball,player
                where 
                player.player_id=ball_by_ball.bowler 
                and 
                match_id=$1 and innings_no=$2
                group by player_name,player.player_id
			    order by ranks
                limit 3
		    ) as F where wkts_taken>=1
        `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows;
}

module.exports = {tbat,tbowl};