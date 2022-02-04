const pool = require("./database");

const sc = async(match_id,innings_no) => {

    const query =
        `
        with f(o,r1,w1) as (
			select 
        	over_id  as g,
        	sum(CASE WHEN over_id<=over_id   THEN runs_scored+extra_runs ELSE 0 END) as r1,
        	sum(CASE WHEN over_id=over_id and out_type is not NULL THEN 1 ELSE 0 END) as w1
			from ball_by_ball where match_id = $1 and innings_no=1 group by over_id
		),
		g(o,r2,w2) as (
			select 
        	over_id  as g,
        	sum(CASE WHEN over_id<=over_id  THEN runs_scored+extra_runs ELSE 0 END) as r1,
        	sum(CASE WHEN over_id=over_id  and out_type is not NULL THEN 1 ELSE 0 END) as w1
			from ball_by_ball where match_id = $1 and innings_no=2 group by over_id
		)
		select f.o,r1,r2,w1,w2 from f full join g on f.o=g.o order by f.o asc
        `;

    console.log(query);
    const todo = await pool.query(query,[match_id]);
    return  todo.rows;
}

module.exports = {sc};