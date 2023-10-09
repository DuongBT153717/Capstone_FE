import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'; 
import './table.css'; 
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SecurityIcon from '@mui/icons-material/Security'
import { Box, Grid, IconButton, Typography } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DataTable from '../../components/DataTable';
import { mockDataTeam } from '../../services/mockData';
import Header from '../../components/Header';


const ManagerDashboard = () => {
  const data = [
    { id: 1, date: new Date(2000, 0, 1) }, // January 1, 2000
    { id: 2, date: new Date(1995, 5, 15) }, // June 15, 1995
    // Add more data as needed
  ];
  const DateDataRaw = ({ value }) => {
    const formattedDate = new Date(value).toLocaleDateString('en-GB', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
    return <div>{formattedDate}</div>;
  };
  // return (
  //   <>
  //     {/* <div className="div1">
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>Column 1</TableCell>
  //             <TableCell>Column 2</TableCell>
  //             <TableCell>Column 3</TableCell>
  //             <TableCell>Column 4</TableCell>
  //             <TableCell>Column 5</TableCell>
  //             <TableCell>Column 6</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           <TableRow>
  //             <TableCell>Row Data 1</TableCell>
  //             <TableCell>Row Data 2</TableCell>
  //             <TableCell>Row Data 3</TableCell>
  //             <TableCell>Row Data 4</TableCell>
  //             <TableCell>Row Data 5</TableCell>
  //             <TableCell>Row Data 6</TableCell>
  //           </TableRow>
  //           <TableRow>
  //             <TableCell>Row Data 1</TableCell>
  //             <TableCell>Row Data 2</TableCell>
  //             <TableCell>Row Data 3</TableCell>
  //             <TableCell>Row Data 4</TableCell>
  //             <TableCell>Row Data 5</TableCell>
  //             <TableCell>Row Data 6</TableCell>
  //           </TableRow>
  //           <TableRow>
  //             <TableCell>Row Data 1</TableCell>
  //             <TableCell>Row Data 2</TableCell>
  //             <TableCell>Row Data 3</TableCell>
  //             <TableCell>Row Data 4</TableCell>
  //             <TableCell>Row Data 5</TableCell>
  //             <TableCell>Row Data 6</TableCell>
  //           </TableRow>
  //         </TableBody>
  //       </Table>
  //     </div> */}

  //   </>
    
  // );
  const columns = [
    { field: 'id', headerName: '#', width: 40 },
    {
      field: 'date',
      headerName: 'Date',
      cellClassName: 'center',
      width: 300,  
      
      renderCell: DateDataRaw,
    },
    {
      field: 'entry',
      headerName: 'First Entry',
      headerAlign: 'left',
      align: 'left',
      width: 120,  
      
    },
    {
      field: 'exit',
      headerName: 'Last Exit',
      width: 150
    },
    {
      field: 'OTstatus',
      headerName: 'OT Status',
      width: 150
    },
    {
      field: 'OTtime',
      headerName: 'OT Time',
      width: 150
    },
    {
      field: 'OtType',
      headerName: 'OT Type',
      width: 150
    },
    {
      field: 'Des',
      headerName: 'Description',
      width: 340
    },
    {
      field: 'Total',
      headerName: 'Total Time',
      width: 150
    },
  ]
  return (
    <>
      <Header title="TEAM" subtitle="Managing the team Members" />
      <DataTable rows={mockDataTeam} columns={columns} x />
    </>
  )

};

export default ManagerDashboard;
