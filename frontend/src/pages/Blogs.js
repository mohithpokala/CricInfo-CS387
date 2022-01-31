import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';


const blue = {
  200: '#A5D8FF',
  400: '#3399FF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }
  `,
);

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }
  & .MuiTablePaginationUnstyled-select {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    background-color: transparent;
    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }
  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }
  & .MuiTablePaginationUnstyled-actions {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    text-align: center;
  }
  & .MuiTablePaginationUnstyled-actions > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;
    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }
  `,
);

const Blogs = () => {

  const [matches, setMatches] =useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(()=>{
  getMatches(page*rowsPerPage,rowsPerPage);},[]);
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getMatchesChange(newPage*rowsPerPage,rowsPerPage);
    console.log(newPage*rowsPerPage,rowsPerPage);
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



return (
  <Root sx={{ width: 1000, maxWidth: '100%' }}>
    <table aria-label="custom pagination table">
      <thead>
        <tr>
          <th>Team1</th>
          <th>Team2</th>
          <th>Venue</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((row) => (
          <tr key={row.match_id}>
          <td>{row.team1}</td>
            <td>{row.team2}</td>
            <td style={{ width: 300 }} align="right">
              {row.venue_name}
            </td>
            <td style={{ width: 300 }} align="right"  >
            <Link href={"/matches/"+row.match_id}>{row.winner+" won by "+row.win_margin+" "+row.win_type}</Link>
            </td>
          </tr>
        ))}

        {/* {emptyRows > 0 && (
          <tr style={{ height: 41 * emptyRows }}>
            <td colSpan={3} />
          </tr>
        )} */}
      </tbody>
      <tfoot>
        <tr>
          <CustomTablePagination
             rowsPerPageOptions={[5, 10, 25, { label: 'All', value:500 }]}
            colSpan={4}
            count={40}
            rowsPerPage={rowsPerPage}
            page={page}
            componentsProps={{
              select: {
                'aria-label': 'rows per page',
              },
              actions: {
                showFirstButton: true,
                showLastButton: true,
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </tr>
      </tfoot>
    </table>
  </Root>
);



  };
  
  export default Blogs;



