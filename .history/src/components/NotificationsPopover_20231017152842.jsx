import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Popover,
  Typography
} from '@mui/material'
import { useState } from 'react'
import EMAIL from '../assets/images/ic_notification_mail.svg'
const NotificationsPopover = () => {
  const [open, setOpen] = useState(null)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }
  return (
    <>
      <IconButton sx={{ color: 'rgb(94, 53, 177)' }} onClick={handleOpen} size="small">
        <Badge badgeContent={4} color="error">
          <NotificationsIcon />
        </Badge>
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
            width: 360,
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
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have 0 unread messages
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ px: 2.5, py: 1, typography: 'overline', fontSize: '13px', lineHeight: '1.5' }}>
              New
            </ListSubheader>
          }>
          <ListItemButton sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
            <Avatar sx={{ bgcolor: 'background.neutral' }}>
              <img src={EMAIL} />
            </Avatar>
            <ListItemText primary="You have new message sent from Guido Padberg" />
          </ListItemButton>
          <ListItemButton sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
            <Avatar sx={{ bgcolor: 'background.neutral' }}>
              <img src={EMAIL} />
            </Avatar>
            <ListItemText primary="You have new message sent from Guido Padberg" />
          </ListItemButton>
          <ListItemButton sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
            <Avatar sx={{ bgcolor: 'background.neutral' }}>
              <img src={EMAIL} />
            </Avatar>
            <ListItemText primary="You have new message sent from Guido Padberg" />
          </ListItemButton>
          <ListItemButton sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
            <Avatar sx={{ bgcolor: 'background.neutral' }}>
              <img src={EMAIL} />
            </Avatar>
            <ListItemText primary="You have new message sent from Guido Padberg" />
          </ListItemButton>
          <ListItemButton sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
            <Avatar sx={{ bgcolor: 'background.neutral' }}>
              <img src={EMAIL} />
            </Avatar>
            <ListItemText primary="You have new message sent from Guido Padberg" />
          </ListItemButton>
        </List>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple disablePadding>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default NotificationsPopover
