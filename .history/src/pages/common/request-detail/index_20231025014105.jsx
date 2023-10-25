import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import requestApi from '../../../services/requestApi'
import userApi from '../../../services/userApi'
import ChatTopbar from '../chat/components/ChatTopbar'
import './components/style.css'
import { LoadingButton } from '@mui/lab'
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper
}))

const StyledPaperAns = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: 'lightblue'
}))

const TicketDetail = () => {
  const scrollbarsRef = useRef()
  const [request, setRequest] = useState([])
  const [roleSender, setRoleSender] = useState(null)
  const [content, setContent] = useState('')
  const { requestId } = useParams()
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const userRole = useSelector((state) => state.auth.login?.currentUser.role)
  const userId = useSelector((state) => state.auth.login?.currentUser?.accountId)
  const handleSendMessage = () => {
    let data = {
      userId: userId,
      requestId: requestId,
      content: content,
      departmentId: request[0]?.requestMessageResponse?.receiverDepartment?.departmentId
    }

    requestApi.otherFormExistRequest(data)
    setTimeout(function () {
      location.reload()
    }, 500)
  }

  useEffect(() => {
    const getMessageDetail = async () => {
      if (requestId.startsWith('AT')) {
        const res = await requestApi.getDetailAttendanceMessageById(requestId)
        console.log(res)
        setRequest(res)
      } else if (requestId.startsWith('LV')) {
        const res = await requestApi.getDetailLeaveMessageById(requestId)
        console.log(res)
        setRequest(res)
      }
    }
    getMessageDetail()
  }, [])

  useEffect(() => {
    if (request.length !== 0) {
      const getRoleByID = async () => {
        const res = await userApi.getRoleByUserId(request[0]?.requestMessageResponse?.senderId)
        setRoleSender(res.roleName)
        console.log(res)
      }
      getRoleByID()
    }
  }, [request[0]?.requestMessageResponse?.senderId])

  console.log('>>>' + request[0]?.object?.attendanceRequestId)

  const handleAccept = () => {
    if (request[0]?.object?.topic === 'ATTENDANCE_REQUEST') {
      requestApi.acceptAttendanceRequest(request[0]?.object?.attendanceRequestId)
    } else if (request[0]?.object?.topic === 'LEAVE_REQUEST') {
      requestApi.acceptLeaveRequest(request[0]?.object?.leaveRequestId)
    }
  }

  useEffect(() => {
    scrollbarsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  console.log('topic >>>' + request[0]?.object?.topic)

  const checkTopic = () => {
    if (request[0]?.object?.topic === 'ATTENDANCE_REQUEST') {
      return (
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Title : {request[0]?.requestMessageResponse?.title}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Department :{' '}
                      {request[0]?.requestMessageResponse?.receiverDepartment?.departmentName}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Date : {request[0]?.object?.manualDate}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Time Start : {request[0]?.object?.manualDate}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Time Exit : {request[0]?.object?.manualDate}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </List>
        </>
      )
    } else if (request[0]?.object?.topic === 'LEAVE_REQUEST') {
      return (
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Title : {request[0]?.requestMessageResponse?.title}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      Department :{' '}
                      {request[0]?.requestMessageResponse?.receiverDepartment?.departmentName}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      From Date : {request[0]?.object?.fromDate}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />

            <ListItem alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">
                      End Date : {request[0]?.object?.toDate}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </List>
        </>
      )
    }
  }
  return (
    <>
      {request.length === 0 ? (
        <></>
      ) : (
        <Box>
          <ChatTopbar />
          <Box height="100%" display="flex">
            <Box flex="1">{checkTopic()}</Box>
            <Box flex="4">
              <div
                ref={scrollbarsRef}
                style={{ overflow: 'auto', backgroundColor: '#f5f7f9', maxHeight: '420px' }}>
                <Box m={2} sx={{ left: '0' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined">{request[0]?.object?.topic}</Button>
                  </Box>
                </Box>
                {request?.map((req, index) => (
                  <>
                    {request[index]?.requestMessageResponse?.receiverId === userId ? (
                      <>
                        {index === 0 ? (
                          <StyledPaper>
                            <Box display="flex" justifyContent="space-between">
                              <Box display="flex" gap={1} alignItems="center" mb={2}>
                                <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
                                <Box display="flex" flexDirection="column">
                                  <Typography fontSize="16px" variant="body1">
                                    {req?.requestMessageResponse?.senderFirstName ||
                                    req?.requestMessageResponse?.senderLastName === null ? (
                                      <>unknown</>
                                    ) : (
                                      <>
                                        {' '}
                                        {req?.requestMessageResponse?.senderFirstName}{' '}
                                        {req?.requestMessageResponse?.senderLastName}
                                      </>
                                    )}
                                  </Typography>
                                  <Typography
                                    sx={{ textTransform: 'capitalize' }}
                                    fontSize="12px"
                                    variant="body1">
                                    {roleSender}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>{req?.requestMessageResponse?.createDate}</Box>
                            </Box>
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: req?.object?.content
                              }}></Typography>
                            <Box display="flex" gap="10px" justifyContent="flex-end">
                              <Button variant="contained" sx={{ bgcolor: 'red' }}>
                                Reject
                              </Button>
                              <LoadingButton
                                onClick={handleAccept}
                                variant="contained"
                                sx={{ bgcolor: 'green' }}>
                                Accept
                              </LoadingButton>
                            </Box>
                          </StyledPaper>
                        ) : (
                          <StyledPaper>
                            <Box display="flex" justifyContent="space-between">
                              <Box display="flex" gap={1} alignItems="center" mb={2}>
                                <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
                                <Box display="flex" flexDirection="column">
                                  <Typography fontSize="16px" variant="body1">
                                    {req?.requestMessageResponse?.senderFirstName ||
                                    req?.requestMessageResponse?.senderLastName === null ? (
                                      <>unknown</>
                                    ) : (
                                      <>
                                        {' '}
                                        {req?.requestMessageResponse?.senderFirstName}{' '}
                                        {req?.requestMessageResponse?.senderLastName}
                                      </>
                                    )}
                                  </Typography>
                                  <Typography
                                    sx={{ textTransform: 'capitalize' }}
                                    fontSize="12px"
                                    variant="body1">
                                    {roleSender}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box>{req?.requestMessageResponse?.createDate}</Box>
                            </Box>
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: req?.object?.content
                              }}></Typography>
                          </StyledPaper>
                        )}
                      </>
                    ) : (
                      <>
                        <StyledPaperAns>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" gap={1} alignItems="center" mb={2}>
                              <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
                              <Box display="flex" flexDirection="column">
                                <Typography fontSize="16px" variant="body1">
                                  {req?.requestMessageResponse?.receiverFirstName ||
                                  req?.requestMessageResponse?.receiverLastName === null ? (
                                    <>unknown</>
                                  ) : (
                                    <>
                                      {' '}
                                      {req?.requestMessageResponse?.receiverFirstName}{' '}
                                      {req?.requestMessageResponse?.receiverLastName}
                                    </>
                                  )}
                                </Typography>
                                <Typography
                                  sx={{ textTransform: 'capitalize' }}
                                  fontSize="12px"
                                  variant="body1">
                                  {userRole}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>{req?.requestMessageResponse?.createDate}</Box>
                          </Box>
                          <Typography
                            dangerouslySetInnerHTML={{ __html: req?.object?.content }}></Typography>
                        </StyledPaperAns>
                      </>
                    )}
                  </>
                ))}
              </div>
              <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setContent(data)
                  }}
                />
               <Box mt={2} justifyContent='space-between' display='flex'>
               {currentUser?.role === 'hr' ? (
                  <Link to="/request-list-hr">
                    <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                      Back
                    </Button>
                  </Link>
                ) : currentUser?.role === 'employee' ? (
                  <Link to="/request-list-employee">
                    <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                      Back
                    </Button>
                  </Link>
                ) : currentUser?.role === 'manager' ? (
                  <Link to="/request-list-manager">
                    <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                      Back
                    </Button>
                  </Link>
                ) : currentUser?.role === 'admin' ? (
                  <Link to="/request-list-admin">
                    <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                      Back
                    </Button>
                  </Link>
                ) : currentUser?.role === 'security' ? (
                  <Link to="/manage-user">
                    <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                      Back
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
                <Button
                  sx={{mr: 2 }}
                  onClick={handleSendMessage}
                  variant="contained"
                  color="primary"
                  >
                  Send
                </Button>
               </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default TicketDetail
