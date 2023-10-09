import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SecurityIcon from '@mui/icons-material/Security'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import Header from '../../../components/Header'
import DataTable from '../../../components/DataTable'
import { mockDataTeam } from '../../../services/mockData'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
const ManageUser = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'name',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
      flex: 1
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      width: 60
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300
    },
    {
      field: 'access',
      headerName: 'Access Level',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="80%"
            margin="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={access === 'admin' ? '#3da58a' : '#2e7c67'}
            borderRadius="4px">
            {access === 'admin' && <AdminPanelSettingsIcon />}
            {access === 'manager' && <SecurityIcon />}
            {access === 'user' && <LockOpenIcon />}
            <Typography color="#d0d1d5" sx={{ ml: '5px' }}>
              {access}
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: () => {
        return (
          <Box
            margin="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px">
            <IconButton>
              <EditIcon sx={{color: '#00FF00'}} />
            </IconButton>
            <IconButton>
              <DeleteIcon sx={{color: 'red'}}/>
            </IconButton>
          </Box>
        )
      }
    }
  ]
  return (
    <>
      <Header title="TEAM" subtitle="Managing the team Members" />
      <DataTable rows={mockDataTeam} columns={columns} x />
    </>
  )
}

export default ManageUser
