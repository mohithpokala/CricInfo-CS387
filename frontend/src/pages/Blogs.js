import React, {useState, useEffect} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import TablePagination from '@mui/material/TablePagination';

const Blogs = () => {

  const [matches, setMatches] =useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(()=>{
  getMatchesChange(page*rowsPerPage,rowsPerPage);},[]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getMatchesChange(newPage*rowsPerPage,rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getMatchesChange(0,parseInt(event.target.value, 10));
  };

  function getMatchesChange(skip,limit)
  {
    console.log("http://localhost:5000/matches?"+"skip="+skip+"&limit="+limit);
    fetch(
      "http://localhost:5000/matches?"+"skip="+skip+"&limit="+limit)
                  .then((res) => res.json())
                  .then((json) => {
                     setMatches(json);
                     console.log(json);
                  });

  }
  

  function getMatches()
  {
    fetch(
      "http://localhost:5000/matches/")
                  .then((res) => res.json())
                  .then((json) => {
                     setMatches(json);
                     console.log(json);
                  });
  };



    return <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Team1</TableCell>
            <TableCell>Team2</TableCell>
            <TableCell>Venue</TableCell>
            <TableCell>Summary</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
        {
        matches.map( 
          x => { return <TableRow>
            <TableCell>{x.team1}</TableCell>
            <TableCell>{x.team2}</TableCell>
            <TableCell>{x.venue_name}</TableCell>
            <Link href={"/matches/"+x.match_id} ><TableCell>{x.winner+" won by "+x.win_margin+" "+x.win_type}</TableCell></Link>
            
            </TableRow>
            }
          )
        }
        </TableBody>
      </Table>
      {/* Matches
        {
        matches.map( 
          x => {return <h2>{x.match_id}</h2>}
          )
        } */}
<TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />

      </React.Fragment>;
  };
  
  export default Blogs;



