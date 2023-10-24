import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
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
  }

  useEffect(() => {
    const getMessageDetail = async () => {
      const res = await requestApi.getDetailAttendanceMessageById(requestId)
      console.log(res)
      setRequest(res)
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

  console.log('>>>' + request[0]?.requestMessageResponse?.senderId)

  

  // console.log("requestID " + requestId);
  // console.log("userID >> " + userId);
  // console.log("departmant " + userInfo.departmentName);

  useEffect(() => {
    scrollbarsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  return (
    <>
      {request.length === 0 ? (
        <></>
      ) : (
        <Box height="100vh">
          <ChatTopbar />
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
                {request[0]?.requestMessageResponse?.receiverId === userId ? (
                  <>
                    {index === 0 ? (
                      <StyledPaper>
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
                        <Typography
                          dangerouslySetInnerHTML={{ __html: req?.object?.content }}></Typography>
                        <Box display="flex" gap="10px" justifyContent='flex-end'>
                          <LoadingButton variant="contained" sx={{ bgcolor: 'red' }}>
                            Reject
                          </LoadingButton>
                          <LoadingButton variant="contained" sx={{ bgcolor: 'green' }}>
                            Accept
                          </LoadingButton>
                        </Box>
                      </StyledPaper>
                    ) : (
                      <StyledPaper>
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
                        <Typography
                          dangerouslySetInnerHTML={{ __html: req?.object?.content }}></Typography>
                      </StyledPaper>
                    )}
                  </>
                ) : (
                  <>
                    <StyledPaperAns>
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
            <Button
              sx={{ alignSelf: 'flex-end', mr: 2 }}
              onClick={handleSendMessage}
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}>
              Send
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}

export default TicketDetail
