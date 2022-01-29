const pool = require("./database");

const mf= async(skip,limit)=>{

    const query=`
    with  b as
    (
        select row_number() over ( order by match_id) as row_num,* from match
    )
    select * from b
    where row_num>$1
    limit $2
    `;
    const todo = await pool.query(query,[skip,limit]);
    return  todo.rows
}

const mfi= async(match_id)=>
{
  const query=`
  select * from match
where match_id=$1
  `;
  const todo= await pool.query(query,[match_id]);
  return todo.rows

}

module.exports = {mf,mfi};