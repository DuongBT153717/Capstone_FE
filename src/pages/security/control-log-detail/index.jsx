import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import securityApi from '../../../services/securityApi';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import ChatTopbar from '../../common/chat/components/ChatTopbar';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebase/config';

const ControlLogDetail = () => {
    const { username, controlLogId } = useParams()
    console.log(username);
    console.log(controlLogId);
    const [control, setControl] = useState()
    const [deviceImg,setDeviceImg] = useState("")
    const [AvatarImg,setAvatarImg] = useState("")

    useEffect(() => {
        const getControlLogDetail = async () => {
            let res = await securityApi.getControlLogDetail(username, controlLogId);
            setControl(res);
        }
        getControlLogDetail();
    }, [])

    const imgurl = async () => {
        const storageRef = ref(storage, `/${control?.avatar}`)
        try {
          const url = await getDownloadURL(storageRef)
          setAvatarImg(url)
        } catch (error) {
          console.error('Error getting download URL:', error)
        }
      }
      const imgurldevice = async () => {
        const storageRef = ref(storage, `/${control?.image}`)
        try {
          const url = await getDownloadURL(storageRef)
          setDeviceImg(url)
        } catch (error) {
          console.error('Error getting download URL:', error)
        }
      }
      
      if (control && control?.avatar && control?.image) {
        imgurl()
        imgurldevice()
      }

   

    console.log(control);

    return (
        <Box>
            <ChatTopbar />
            <Box display='flex' alignItems='center' mb={3}>
                <Box flex='1' >
                    <Avatar
                    src={AvatarImg}
                        sx={{
                            margin: 'auto',
                            height: 100,
                            width: 100
                        }}
                    />
                </Box>
                <Box flex='1' display="flex" marginTop="40px" height='80px'>
                    <Box flex="1" textAlign='left' borderRight="1px solid #999">
                        <Typography >Account </Typography>
                        <Typography mt={4}>Role </Typography>
                    </Box>
                    <Box flex="2" textAlign='left' marginLeft="20px">
                        <Typography>{control?.account}</Typography>
                        <Typography mt={4} sx={{ textTransform: 'capitalize' }}>{control?.role} </Typography>
                    </Box>
                </Box>
                <Box flex='1' display="flex" marginTop="40px" height='80px'>
                    <Box flex="1" textAlign='left' borderRight="1px solid #999">
                        <Typography >Department </Typography>
                        <Typography mt={4}>Hire DateDate </Typography>
                    </Box>
                    <Box flex="2" textAlign='left' marginLeft="20px">
                        <Typography sx={{ textTransform: 'capitalize' }}>{control?.department} </Typography>
                        <Typography mt={4}>{control?.hireDate} </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box m={5}>
                <Avatar
                src={deviceImg}
                    sx={{
                        marginLeft: '135px',
                        height: 100,
                        width: 100
                    }}
                />
                <Box display='flex' marginLeft='100px' >
                <Box flex='1' display="flex" marginTop="40px" height='220px'>
                    <Box flex="1" textAlign='left' borderRight="1px solid #999">
                        <Typography >Device id </Typography>
                        <Typography mt={4}>Device name </Typography>
                        <Typography mt={4}>Time </Typography>
                        <Typography mt={4}>Similar </Typography>
                    </Box>
                    <Box flex="2" textAlign='left' marginLeft="20px">
                        <Typography sx={{ textTransform: 'capitalize' }}>{control?.deviceId} </Typography>
                        <Typography mt={4}>{control?.deviceName} </Typography>
                        <Typography mt={4}>{control?.time} </Typography>
                        <Typography mt={4}>{control?.similar} </Typography>
                    </Box>
                </Box>

                <Box flex='1' display="flex" marginTop="40px" height='220px'>
                    <Box flex="1" textAlign='left' borderRight="1px solid #999">
                        <Typography >Operator </Typography>
                        <Typography mt={4}>Person ID </Typography>
                        <Typography mt={4}>Verify Status </Typography>
                        <Typography mt={4}>Temperature </Typography>
                    </Box>
                    <Box flex="2" textAlign='left' marginLeft="20px">
                        <Typography sx={{ textTransform: 'capitalize' }}>{control?.operator} </Typography>
                        <Typography mt={4}>{control?.personId} </Typography>
                        <Typography mt={4}>{control?.verifyStatus} </Typography>
                        <Typography mt={4}>{control?.temperature} </Typography>
                    </Box>
                </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default ControlLogDetail
