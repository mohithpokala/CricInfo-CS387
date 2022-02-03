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


const pieChart = async(match_id,innings_number) => {

    const query =
        `
        with q0 as(
            select * from ball_by_ball 
            where match_id =$1
            and innings_no = $2
            ),
            q1 as(
            select match_id, innings_no,
            sum(extra_runs) as extra_runs from q0
            group by match_id, innings_no
            ),
            q2 as(
            select match_id, innings_no,
            sum(runs_scored) as sixes from q0
            where runs_scored = '6'
            group by match_id, innings_no
            ),
            q3 as(
            select match_id, innings_no,
            sum(runs_scored) as fours from q0
            where runs_scored = '4'
            group by match_id, innings_no
            ),
            q4 as(
            select match_id, innings_no,
            sum(runs_scored),0 as threes from q0
            where runs_scored = '3'
            group by match_id, innings_no
            ),
            q5 as(
            select match_id, innings_no, 
            COALESCE(sum(runs_scored),0) as twos from q0
            where runs_scored = '2'
            group by match_id, innings_no
            ),
            q6 as(
            select match_id, innings_no, sum(runs_scored) as ones
            from q0
            where runs_scored = '1'
            group by match_id, innings_no
            ),q7 as
            (
            select * from
            q1 full outer join q2 using(match_id, innings_no)
            full outer join  q3 using(match_id, innings_no)
            full outer join  q4 using(match_id, innings_no)
            full outer join  q5 using(match_id, innings_no)
            full outer join  q6 using(match_id, innings_no)
            )
            select match_id,innings_no ,
            COALESCE(extra_runs,0) as extra_runs,
            COALESCE(sixes,0) as sixes,
            COALESCE(fours,0) as fours,
            COALESCE(threes,0) as threes,
            COALESCE(twos,0) as twos,
            COALESCE(ones,0) as ones
            from q7
		    
        `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows;
}


module.exports = {tbat,tbowl,pieChart};