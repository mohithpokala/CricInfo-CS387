const pool = require("./database");

const sc = async(match_id,innings_no) => {

    const query =
        `
        with r(g) as (
            SELECT  num
            FROM    generate_series(1, 20) num
        )
        select 
        g as over_id,
        sum(CASE WHEN over_id<=g and innings_no=1  THEN runs_scored+extra_runs ELSE 0 END) as r1,
        sum(CASE WHEN over_id<=g and innings_no=2  THEN runs_scored+extra_runs ELSE 0 END) as r2,
        sum(CASE WHEN over_id=g and innings_no=1 and out_type is not NULL THEN 1 ELSE 0 END) as w1,
        sum(CASE WHEN over_id=g and innings_no=2 and out_type is not NULL THEN 1 ELSE 0 END) as w2
        from r,ball_by_ball 
        where match_id=$1
        group by g
        order by g asc
        `;

    console.log(query);
    const todo = await pool.query(query,[match_id]);
    return  todo.rows;
}

module.exports = {sc};