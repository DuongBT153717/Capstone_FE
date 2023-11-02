import { Box, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../../../components/Header'
import { BASE_URL } from '../../../services/constraint'
import userApi from '../../../services/userApi'
import axiosClient from '../../../utils/axios-config'
import { toast } from 'react-toastify'
import DataTableListNoti from './components/DataTable'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const NotificationsList = () => {
  const userId = useSelector((state) => state.auth.login.currentUser.accountId)
  const dispatch = useDispatch()
  const [allNoti, setAllNoti] = useState([])
  const [user, setUser] = useState('')
  const [open, setOpen] = useState(false)
  const [openCreateAccount, setOpenCreateAccount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const navigate = useNavigate()
  const handleOpen = (data) => {
    setOpen(true)
    setUser(data)
  }
  const options = [
    'Make as read(unread)',
    'Delete',
  ]
  const ITEM_HEIGHT = 58;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleClose = () => setOpen(false)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    setIsLoading(true)
    const fetchAllNoti = async () => {
      const response = await axiosClient.get(`${BASE_URL}/getListNotificationByUserId`, {
        params: {
          userId: userId
        }
      })
      setAllNoti(response)
      setIsLoading(false)
    }
    fetchAllNoti()
  }, [])

  console.log(allNoti)


  const columns = [
    {
      field: '',
      headerName: '',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      width: 60,
      renderCell: (params) => {
        return (
          <Box
            margin="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px">
            <div>
              <Checkbox {...label} icon={<StarBorderIcon />} checkedIcon={<StarIcon
                color='warning' />} />
            </div>
          </Box>
        )
      }
    },
    {
      field: 'creatorLastName',
      headerName: 'From',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Title',
      headerAlign: 'center',
      align: 'center',
      width: 300,
    },
    {
      field: 'content',
      headerName: 'Content',
      headerAlign: 'center',
      align: 'center',
      width: 250,
    },
    {
      field: 'imageFileName',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      width: 350,
      sortable: false,
      filterable: false,
    },
    {
      field: 'uploadDate',
      headerName: 'Date',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      width: 230,
    },
    {
      field: 'action',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Box
            margin="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px">
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openMenu ? 'long-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose2}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '25ch',
                    boxShadow:'1px 1px 1px #999'

                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose2} >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Box>
        )
      }
    }
    ,

  ]
  return (
    <>
      <Header title="NOTIFICATIONS" />
      <DataTableListNoti
        rows={allNoti}
        columns={columns}
        isLoading={isLoading}

      />

    </>
  )

}


export default NotificationsList
