const pool = require("./database");

const sc = async(match_id,innings_number) => {

    const query =
        `
            select 
            over_id,sum(X) 
            over(order by over_id rows unbounded preceding) as score,wkts
            from 
                (
                    select over_id,sum(runs_scored) as X , count(out_type) as wkts
                    from ball_by_ball 
                    where 
                    match_id = $1 
                    and
                    innings_no = $2
                    group by over_id
                ) 
            as G
        `;
    const todo = await pool.query(query,[match_id,innings_number]);
    return  todo.rows;
}

module.exports = {sc};