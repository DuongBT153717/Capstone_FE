import { Avatar, Box, Divider, Paper, Typography, useTheme } from '@mui/material'
import ChatTopbar from '../chat/components/ChatTopbar'

const NotificationDetail = () => {
  const theme = useTheme()
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
        <Box>
          <Typography>Attachments</Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default NotificationDetail
