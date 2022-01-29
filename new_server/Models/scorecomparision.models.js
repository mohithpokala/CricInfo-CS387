

const pool = require("./database");

const sc = async(match_id,innings_number) => {

    const query =
        `
            select 
            over_id,sum(X) 
            over(order by over_id rows unbounded preceding) 
            from 
                (
                    select over_id,sum(runs_scored) as X 
                    from ball_by_ball 
                    where 
                    match_id= 829720 
                    and
                    innings_no =1 
                    group by over_id
                ) 
            as G
        `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows;
}

module.exports = {sc};