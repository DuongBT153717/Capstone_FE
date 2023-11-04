import { Badge, Button, Box, Divider, IconButton, List, ListItemButton, ListItemText, ListSubheader, Popover, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axiosClient from '../utils/axios-config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BASE_URL } from '../services/constraint';

const NotificationsPopover = (props) => {
  const { row } = props
  const [open, setOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listNotifications, setListNotifications] = useState([]);
  const userId = useSelector((state) => state.auth.login.currentUser.accountId);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  }

  const handleClose = () => {
    setOpen(null);
  }

  useEffect(() => {
    setIsLoading(true);

    const fetchAllNotifications = async () => {
      try {
        const response = await axiosClient.get(`${BASE_URL}/getNotificationByUserId`, {
          params: {
            userId: userId
          }
        });

        if (response) {
          setListNotifications(response);
          setIsLoading(false);
        } else {
          toast.error('No data found');
        }
        console.log(response)
      } catch (error) {
        console.error('API request failed', error);
        toast.error('Failed to fetch data');
      }
    };
    fetchAllNotifications();
  }, [userId]);


  return (
    <>
      <IconButton sx={{ color: 'rgb(94, 53, 177)' }} onClick={handleOpen}>
        <Badge color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {}
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1, px: 2.5 }}>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle1">Notifications</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      
      </Typography>
    </Box>
  </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <List disablePadding>
          <ListSubheader
            disableSticky
            sx={{ px: 2.5, py: 1, typography: 'overline', fontSize: '13px', lineHeight: '1.5' }}>
            New
          </ListSubheader>
          {listNotifications?.notifications?.length > 0 ? (
            listNotifications.notifications.map((notifications_row) => (
              <ListItemButton key={notifications_row.notificationId} sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
                <ListItemText primary={notifications_row.title} />
                <ListItemText primary={notifications_row.uploadDate} />
              </ListItemButton>
            ))
          ) : (
            <ListItemButton sx={{ px: 2.5, pb: 1, display: 'flex', gap: '10px' }}>
              <ListItemText primary="No notifications found" />
            </ListItemButton>
          )}
        </List>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple disablePadding>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default NotificationsPopover;