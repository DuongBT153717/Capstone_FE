import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useState } from 'react'
import securityApi from '../../../services/securityApi'
import DataTableControlLog from './component/DataTable'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebase/config'
import DataTableDeviceManage from './component/DataTable'
import CreateIcon from '@mui/icons-material/Create';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import formatDate from '../../../utils/formatDate'
import requestApi from '../../../services/requestApi'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const DeviceManage = () => {
    const navigate = useNavigate()
    const [listDevice, setListDevice] = useState([])
    const [listRoom, setListRoom] = useState([])

    const [isShowStatus, setIsShowStatus] = useState(false)
    const [isShowUpdate, setIsShowUpdate] = useState(false)
    const [changeStatus, setChangeStatus] = useState('')

    const [name, setName] = useState('')
    const [roomDevice, setRoomDevice] = useState("")
    const [deviceLcdId, setDeviceLcdId] = useState('')
    const [url, setUrl] = useState('')
    const [id, setId] = useState('')

    const [isShowView, setIsShowView] = useState(false)
    const [note, setNote] = useState('')

    useEffect(() => {
        const listAllDevice = async () => {
            try {
                const response = await securityApi.getAllDevice();
                setListDevice(response)
            } catch (error) {
            }
        }
        listAllDevice()
    }, [])

    useEffect(() => {
        const getAllRoom = async () => {
            try {
                const response = await requestApi.getAllRoom()
                setListRoom(response)
            } catch (error) {
            }
        }
        getAllRoom()
    }, [])

    console.log(listDevice);


    const columns = [
        {
            field: 'deviceId',
            headerName: 'Device ID',
            width: 100
        },
        {
            field: 'deviceName',
            headerName: 'Device name',
            width: 150
        },
        {
            field: 'roomName',
            headerName: 'Room',
            width: 150
        },
        {
            field: 'updateDate',
            headerName: 'Active date',
            width: 220,
            renderCell: (params) => {

                return (
                    <Box>
                        <Typography>{formatDate(params.row.updateDate)}</Typography>
                    </Box>
                )
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.status === "ACTIVE" && (<>
                            <Typography color='green'>ACTIVE</Typography>
                        </>)}
                        {params.row.status === "INACTIVE" && (<>
                            <Typography color='red'>IN ACTIVE</Typography>
                        </>)}
                        {params.row.status === "ERROR" && (<>
                            <Typography color='#E1A200'>ERROR</Typography>
                        </>)}
                    </Box>
                )
            }
        },
        {
            field: 'deviceUrl',
            headerName: 'Go to',
            width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            align: 'center',
            width: 180,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                let x = params.row.deviceId;
                return (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderRadius="4px"
                        width="100%">
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="4px"
                            width="100%">
                            <Button onClick={() => handleOpenChangeUpdate(params.row)}><CreateIcon /></Button>
                            <Button onClick={() => handleOpenChangeStatus(params.row)}><NotInterestedIcon /></Button>
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'a',
            headerName: ' ',
            headerAlign: 'center',
            align: 'center',
            width: 300,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return (
                    <Box
                        gap={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderRadius="4px"
                        width="100%">
                        <Box
                            gap={2}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius="4px"
                            width="100%">
                            {params.row.status === "ERROR" && (<>
                                <Button variant='contained'
                                    onClick={() => handleOpenView(params.row)} >View</Button>
                            </>)}
                            <Button variant='contained'>Detail</Button>

                        </Box>
                    </Box>
                )
            }
        }
    ]

    const handleOpenView = (e) => {
        setIsShowView(true);
        setNote(e?.deviceNote)
    }

    const handleCloseView = () => {
        setIsShowView(false);
        setNote('')
    }
    const handleOpenChangeStatus = (e) => {
        setIsShowStatus(true);
        setId(e?.deviceId)
        setChangeStatus(e?.status)
    }

    const handleCloseStatus = () => {
        setIsShowStatus(false);
        setId('')
        setChangeStatus("")
    }

    const handleSaveChangeStatus = async () => {
        let data = {
            id: id,
            status: changeStatus
        }
        let res = await securityApi.updateDeviceStatus(data)
        handleCloseStatus()
    }

    const handleCloseUpdate = () => {
        setIsShowUpdate(false);
        setId("")
        setName('')
        setDeviceLcdId("")
        setUrl("")
        setRoomDevice("")
        setChangeStatus("")
    }

    const handleOpenChangeUpdate = (e) => {
        setIsShowUpdate(true);
        setId(e?.deviceId)
        setName(e?.deviceName)
        setDeviceLcdId(e?.lcdId)
        setUrl(e?.deviceUrl)
        setChangeStatus(e?.status)
        setRoomDevice(e?.roomId)
    };

    const handleChangeStatus = (e) => {
        setChangeStatus(e.target.value)
    }

    const handleSaveChangeUpdate = async () => {
        let data = {
            deviceId: id,
            newRoomId: roomDevice.toString(),
            deviceName: name,
            deviceLcdId: deviceLcdId,
            deviceUrl: url
        }
        try {
            let res = await securityApi.updateDevice(data)
            handleCloseUpdate()
            toast.success('Update success')
        }
        catch (error) {
            if (error.response.status === 400) {
                toast.error('Not found')
            }
            if (error.response.status === 409) {
                toast.error('Conflic')
            }
        }
    }
    return (
        <>
            <Box mt={3}>
                <DataTableDeviceManage
                    rows={listDevice}
                    columns={columns}
                />
            </Box>
            {/* modal Change Status */}
            <Modal
                open={isShowStatus}
                onClose={handleCloseStatus}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Change Status
                    </Typography>
                    <Select
                        sx={{ width: '150px', marginTop: '20px', marginRight: '50px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={changeStatus}
                        label="Status"
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value='INACTIVE'>IN ACTIVE</MenuItem>
                        <MenuItem value='ERROR'>ERROR</MenuItem>
                        <MenuItem value='ACTIVE'>ACTIVE</MenuItem>
                    </Select>
                    <Button onClick={handleSaveChangeStatus} variant='contained'>Save</Button>
                </Box>
            </Modal>
            {/* modal update Device */}
            <Modal
                open={isShowUpdate}
                onClose={handleCloseUpdate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box mt={2}>
                        <Typography fontSize='20px'>
                            Change Infomation Device
                        </Typography>
                        <TextField sx={{ marginTop: '10px', width: '100%' }} id="outlined-basic"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            label=" Device Name" variant="outlined" />

                        {changeStatus === "INACTIVE" && (<>
                            <Select
                                sx={{ width: '100%', marginTop: '20px', marginRight: '50px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={roomDevice}
                                label='Device room'
                                onChange={(e) => setRoomDevice(e.target.value)}
                            >
                                {listRoom.map((item, index) => (
                                    <MenuItem key={item.roomId} value={item.roomId}>{item.roomName}</MenuItem>
                                ))}
                            </Select>
                        </>)}

                        <TextField sx={{ marginTop: '10px', width: '100%' }} id="outlined-basic"
                            onChange={(e) => setDeviceLcdId(e.target.value)}
                            value={deviceLcdId}
                            label="Device LcdId" variant="outlined" />

                        <TextField sx={{ marginTop: '10px', width: '100%' }} id="outlined-basic"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            label="Device Url" variant="outlined" />

                    </Box>
                    <Button sx={{ marginTop: '10px' }}
                        onClick={handleSaveChangeUpdate} variant='contained'>Save</Button>
                </Box>
            </Modal>
{/* Modal show not  */}
            <Modal
                open={isShowView}
                onClose={handleCloseView}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Note
                    </Typography>
                    <TextField id="outlined-basic"
                        sx={{ width: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        value={note}
                        variant="outlined" />

                </Box>
            </Modal>
        </>

    )
}

export default DeviceManage
