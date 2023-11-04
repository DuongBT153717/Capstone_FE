import { Avatar, Box, Chip, Divider, IconButton, Paper, Typography, useTheme } from '@mui/material'
import ChatTopbar from '../chat/components/ChatTopbar'
import DownloadIcon from '@mui/icons-material/Download'
import { useEffect, useState } from 'react'
import notificationApi from '../../../services/notificationApi'
import { useSelector } from 'react-redux'
const NotificationDetail = () => {
  const theme = useTheme()
  const [notificationDetail, setNotificationDetail] = useState('')
  const [notificationFiles, setNotificationFiles] = useState([])
  const [notificationImages, setNotificationImages] = useState([])
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const handleDownload = () => {
    const base64Data = notificationFiles[0]?.data
    if (!base64Data) {
      // Handle the case where data is missing or undefined
      return
    }

    // Decode the Base64 data into a Uint8Array
    const binaryData = atob(base64Data)
    const byteNumbers = new Array(binaryData.length)
    for (let i = 0; i < binaryData.length; i++) {
      byteNumbers[i] = binaryData.charCodeAt(i)
    }
    const uint8Array = new Uint8Array(byteNumbers)

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    // Create a Blob URL
    const blobUrl = URL.createObjectURL(blob)

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a')
    downloadLink.href = blobUrl
    downloadLink.download = notificationFiles[0].fileName
    downloadLink.click()
  }

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      let data = {
        userId: currentUser?.accountId,
        notificationId: '54038ad6-0573-4da3-a666-a2d0138cc579'
      }

      const res = await notificationApi.getNotificationDetail(data)
      setNotificationDetail(res)
      setNotificationFiles(res?.notificationFiles)
      setNotificationImages(res?.notificationImages)
    }

    fetchNotificationDetail()
  }, [])

  console.log(notificationDetail)
  return (
    <Box bgcolor={theme.palette.bgColorPrimary.main}>
      <ChatTopbar />
      <Paper sx={{ padding: 2, m: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={1} alignItems="center" mb={2}>
            <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
            <Box display="flex" flexDirection="column">
              <Typography fontSize="16px" variant="body1">
                {notificationDetail?.creatorFirstName} {notificationDetail?.creatorLastName}
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }} fontSize="12px" variant="body1">
                Admin
              </Typography>
            </Box>
          </Box>
          <Box>{notificationDetail?.uploadDate}</Box>
        </Box>
        <Divider />
        <Box mt={2} height="450px">
          <Typography
            dangerouslySetInnerHTML={{
              __html: notificationDetail?.content
            }}></Typography>
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography mb={2} fontWeight="700">
            Attachments:{' '}
          </Typography>
          {notificationFiles !== null &&
            notificationFiles.length > 0 &&
            notificationFiles.map((item) => (
              <>
                <Chip
                  sx={{
                    mr: 1
                  }}
                  variant="outlined"
                  size="medium"
                  label={item?.fileName}
                  icon={
                    <IconButton onClick={handleDownload}>
                      <DownloadIcon />
                    </IconButton>
                  }
                />
              </>
            ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default NotificationDetail
