import { Avatar, Box, Chip, Divider, IconButton, Paper, Typography, useTheme } from '@mui/material'
import ChatTopbar from '../chat/components/ChatTopbar'
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from 'react';
import notificationApi from '../../../services/notificationApi';
import { useSelector } from 'react-redux';
const NotificationDetail = () => {
  const theme = useTheme()
  const [notificationDetail, setNotificationDetail] = useState('')
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const handleDownload = () => {
     const blob = new Blob(['Your file content'], { type: 'application/octet-stream' });

     const blobUrl = URL.createObjectURL(blob);
 
     const downloadLink = document.createElement('a');
     downloadLink.href = blobUrl;
     downloadLink.download = 'example.txt'; 
 
     downloadLink.click();
  }

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      let data = {
        userId: currentUser?.accountId,
        notificationId: '323660f1-54d5-46bc-9653-b9753d14036f'
      }
      const res = await notificationApi.getNotificationDetail(data)
      setNotificationDetail(res);
    }

    fetchNotificationDetail()
  },[])
  return (
    <Box bgcolor={theme.palette.bgColorPrimary.main}>
      <ChatTopbar />
      <Paper sx={{ padding: 2, m: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={1} alignItems="center" mb={2}>
            <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
            <Box display="flex" flexDirection="column">
              <Typography fontSize="16px" variant="body1">
                Kelbin
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }} fontSize="12px" variant="body1">
                Admin
              </Typography>
            </Box>
          </Box>
          <Box>2023-03-11</Box>
        </Box>
        <Divider />
        <Box mt={2} height="450px">
          <Typography>ascas sa sa cascas</Typography>
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography mb={2} fontWeight='700'>Attachments: </Typography>
          <Chip variant='outlined' size='medium' label="With Icon" icon={<IconButton onClick={handleDownload}><DownloadIcon /></IconButton>} />
        </Box>
      </Paper>
    </Box>
  )
}

export default NotificationDetail
