import DownloadIcon from '@mui/icons-material/Download'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Typography,
  useTheme
} from '@mui/material'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { storage } from '../../../firebase/config'
import notificationApi from '../../../services/notificationApi'
import ChatTopbar from '../chat/components/ChatTopbar'
const [imageSender, setImageSender] = useState('')
const NotificationDetail = () => {
  const theme = useTheme()
  const { notificationId } = useParams()
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
        notificationId: notificationId
      }

      const res = await notificationApi.getNotificationDetailByCreator(data)
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
            return Promise.resolve(null)
          } else {
            const storageRef = ref(storage, `/${item.imageFileName}`)
            return getDownloadURL(storageRef)
          }
        })

        const downloadURLs = await Promise.all(downloadURLPromises)
        console.log(downloadURLs)
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

  const imgurlSender = async () => {
    const storageRef = ref(storage, `/${request[0]?.requestMessageResponse?.imageSender}`)
    try {
      const url = await getDownloadURL(storageRef)
      setImageSender(url)
    } catch (error) {
      console.error('Error getting download URL:', error)
    }
  }

  if (request[0]?.requestMessageResponse && request[0]?.requestMessageResponse?.imageSender) {
    imgurlSender()
  }

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
            {notificationFiles.length > 0 &&
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
                      <IconButton onClick={() => handleDownload(item)}>
                        <DownloadIcon />
                      </IconButton>
                    }
                  />
                </>
              ))}
            {notificationImages.length > 0 &&
              notificationImages.map((item, index) => (
                <>
                  <img width="150px" height="100px" key={index} src={item?.imageFileName} />
                </>
              ))}
          </Box>
        </Box>
        <Divider />
        <Box mt={2} display="flex" justifyContent="flex-start">
          {currentUser?.role === 'hr' ? (
            <Link to="/manage-user">
              <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                Back to Dashboard
              </Button>
            </Link>
          ) : currentUser?.role === 'employee' ? (
            <Link to="/check-attendance">
              <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                Back to Dashboard
              </Button>
            </Link>
          ) : currentUser?.role === 'manager' ? (
            <Link to="/request-list-manager">
              <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                Back to Dashboard
              </Button>
            </Link>
          ) : currentUser?.role === 'admin' ? (
            <Link to="/request-list-admin">
              <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                Back to Dashboard
              </Button>
            </Link>
          ) : currentUser?.role === 'security' ? (
            <Link to="/manage-user">
              <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                Back to Dashboard
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default NotificationDetail