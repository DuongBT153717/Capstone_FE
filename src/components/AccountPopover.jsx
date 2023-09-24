import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import PasswordIcon from '@mui/icons-material/Password'
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    MenuItem,
    Popover,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AVATAR from '../assets/images/user.png'
const AccountPopover = () => {
  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }
  const navigate = useNavigate()
  return (
    <>
      <IconButton sx={{ color: 'rgb(94, 53, 177)' }} onClick={handleOpen} size="small">
        <Avatar
          sx={{
            cursor: 'pointer',
            height: 40,
            width: 40
          }}
          src={AVATAR}
        />
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 230,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={() => navigate('/profile')}>
          <Box display="flex" gap={1.5} alignItems="center">
            <AccountCircleIcon sx={{ height: '30px', width: '30px' }} />{' '}
            <Typography>Profile</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => navigate('/change-password')}>
          <Box display="flex" gap={1.5} alignItems="center">
            <PasswordIcon sx={{ height: '30px', width: '30px' }} />{' '}
            <Typography>Change Password</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Box display="flex" gap={1.5} alignItems="center">
            <LogoutIcon sx={{ height: '30px', width: '30px' }} /> <Typography>Logout</Typography>
          </Box>
        </MenuItem>
      </Popover>
    </>
  )
}

export default AccountPopover
