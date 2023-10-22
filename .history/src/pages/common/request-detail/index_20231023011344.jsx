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
  const inputRef = useRef()
  const [request, setRequest] = useState([])
  const [roleReceive, setRoleReceive] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = inputRef.current
    if (input.value.trim() !== '') {
      input.value = ''
    }
  }

  useEffect(() => {
    const getMessageDetail = async () => {
      const res = await requestApi.getDetailAttendanceMessageById(requestId);
      setRequest(res)
    }
    getMessageDetail()
  }, [])

  useEffect(() => {
    if (request.length !== 0) {
      const getRoleByID = async () => {
        const res = await userApi.getRoleByUserId(request[0]?.Detail?.requestMessageResponse?.senderId);
        setRoleReceive(res.roleName)
        console.log(res);
      }
      getRoleByID()
    }
  }, [request[0]?.Detail?.requestMessageResponse?.senderId])


  console.log(">>>" + request[0]?.Detail?.requestMessageResponse?.senderId);
  const { requestId } = useParams()
  const userRole = useSelector((state) => state.auth.login?.currentUser.role);
  const userId = useSelector((state) => state.auth.login?.currentUser?.accountId)
  const userInfo = useAuth();

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
        <Box height='100vh'>
          <ChatTopbar />
          <div
            ref={scrollbarsRef}
            style={{ overflow: 'auto', backgroundColor: '#f5f7f9', maxHeight: '420px' }}>
            <Box m={2} sx={{ left: "0" }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined">{request[0]?.Detail?.object?.topic}</Button>
              </Box>
            </Box>
            {request?.map((req) => (
              <>
                {request[0]?.Detail?.requestMessageResponse?.receiverId === userId
                  ?
                  (<>
                    <StyledPaper>
                      <Box display="flex" gap={1} alignItems="center" mb={2}>
                        <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
                        <Box display='flex' flexDirection='column'>
                          <Typography fontSize='16px' variant="body1" >
                            {req?.Detail?.requestMessageResponse?.senderFirstName || req?.Detail?.requestMessageResponse?.senderLastName === null ? (<>unknown</>) :
                              (<>                        {req?.Detail?.requestMessageResponse?.senderFirstName} {req?.Detail?.requestMessageResponse?.senderLastName}
                              </>)}
                          </Typography>
                          <Typography fontSize='12px' variant="body1">
                            {userRole}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography dangerouslySetInnerHTML={{ __html: req?.Detail?.object?.content }}>

                      </Typography>
                    </StyledPaper>
                  </>)
                  :
                  (<>
                    <StyledPaperAns>
                      <Box display="flex" gap={1} alignItems="center" mb={2}>
                        <Avatar src="/path/to/avatar.jpg" alt="Avatar" />
                        <Box display='flex' flexDirection='column'>
                          <Typography fontSize='16px' variant="body1" >
                            {req?.Detail?.requestMessageResponse?.receiverFirstName || req?.Detail?.requestMessageResponse?.receiverLastName === null ? (<>unknown</>) :
                              (<>                        {req?.Detail?.requestMessageResponse?.receiverFirstName} {req?.Detail?.requestMessageResponse?.receiverLastName}
                              </>)}
                          </Typography>
                          <Typography fontSize='12px' variant="body1">
                            {roleReceive}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography dangerouslySetInnerHTML={{ __html: req?.Detail?.object?.content }}>

                      </Typography>
                    </StyledPaperAns>
                  </>)}

              </>
            ))
            }
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <CKEditor editor={ClassicEditor} onInit={() => { }} />
            <Button sx={{ alignSelf: 'flex-end', mr: 2 }} type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Send
            </Button>
          </form>
        </Box>
      )}
    </>

  )
}

export default TicketDetail
