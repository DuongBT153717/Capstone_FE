import { Avatar, Box, Chip, Divider, IconButton, Paper, Typography, useTheme } from '@mui/material'
import ChatTopbar from '../chat/components/ChatTopbar'
import DownloadIcon from '@mui/icons-material/Download'
import { useEffect, useState } from 'react'
import notificationApi from '../../../services/notificationApi'
import ClearIcon from '@mui/icons-material/Clear'
import { useSelector } from 'react-redux'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebase/config'
const NotificationDetail = () => {
  const theme = useTheme()
  const [notificationDetail, setNotificationDetail] = useState('')
  const [notificationFiles, setNotificationFiles] = useState([])
  const [notificationImages, setNotificationImages] = useState([])
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const handleDownload = (item) => {
    const base64Data = item?.data
    if (!base64Data) {
      return
    }

    const binaryData = atob(base64Data)
    const byteNumbers = new Array(binaryData.length)
    for (let i = 0; i < binaryData.length; i++) {
      byteNumbers[i] = binaryData.charCodeAt(i)
    }
    const uint8Array = new Uint8Array(byteNumbers)

    const blob = new Blob([uint8Array], {
      type: item?.type
    })

    const blobUrl = URL.createObjectURL(blob)

    const downloadLink = document.createElement('a')
    downloadLink.href = blobUrl
    downloadLink.download = item?.fileName
    downloadLink.click()
  }

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      let data = {
        userId: currentUser?.accountId,
        notificationId: 'a6886d04-2b36-43b7-963e-5b294b6b4289'
      }

      const res = await notificationApi.getNotificationDetail(data)
      setNotificationDetail(res)
      setNotificationFiles(res?.notificationFiles)
      setNotificationImages(res?.notificationImages)
    }

    fetchNotificationDetail()
  }, [])

  const imgurl = async () => {
    if (notificationImages.length > 0) {
      try {
        const downloadURLPromises = notificationImages.map((item) => {
          if (item.imageFileName === 'unknown') {
            return Promise.resolve(null);
          } else {
            const storageRef = ref(storage, `/${item.imageFileName}`);
            return getDownloadURL(storageRef);
          }
        });

        const downloadURLs = await Promise.all(downloadURLPromises)
        console.log(downloadURLs);
        const updatedUsersProfile = notificationImages.map((item, index) => ({
          ...item,
          imageFileName: downloadURLs[index]
        }))
        setNotificationImages(updatedUsersProfile)
      } catch (error) {
        console.error('Error getting download URLs:', error)
      }
    }
  }

  useEffect(() => {
    imgurl()
  }, [notificationImages])

  console.log(notificationDetail)
  console.log(notificationImages)
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
        <Box mt={2} minHeight="450px">
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
          <Box mb={3} alignItems="center" gap="10px" display="flex">
            
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default NotificationDetail