import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import  { useEffect, useState } from 'react'
import securityApi from '../../../services/securityApi'
import { format } from 'date-fns'
import DataTableControlLog from './component/DataTable'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../firebase/config'

const ControlLogSecurity = () => {
    const navigate = useNavigate()
    const [month, setMonth] = useState(new Date())
    const [firstTime, setFirstTime] = useState(new Date())
    const [lastTime, setLastTime] = useState(new Date())
    const [listDevice, setListDevice] = useState([])
    const [device, setDevice] = useState("")
    const [listControl, setListControl] = useState([])


    useEffect(() => {
        const listAllDevice = async () => {
            try {
                const response = await securityApi.listAllDevice();
                setListDevice(response)
            } catch (error) {
                    console.log("");
            }
        }
        listAllDevice()
    }, [])

    const imgurlMessage = async () => {
        try {
            if (listControl.length > 0) {

                const downloadURLPromisesImage = listControl.map((item) => {
                    const storageRef = ref(storage, `/${item?.image}`)
                    return getDownloadURL(storageRef)
                })
                const downloadURLsImage = await Promise.all(downloadURLPromisesImage)
                const updatedListControl = listControl.map((item, index) => ({
                    ...item,
                    imageFileName: downloadURLsImage[index]
                }))
                setListControl(updatedListControl)
            }
        } catch (error) {
            console.error('Error getting download URLs:', error)
        }
    }

    useEffect(() => {
        imgurlMessage()
    }, [listControl])

    const handleChangeDevice = (e) => {
        setDevice(e.target.value);
    }
    console.log(listControl);
    const handleSearch = async () => {
        if (device !== "") {
            let data = {
                date: format(month, 'yyyy-MM-dd'),
                startTime: format(firstTime, 'HH:mm:ss'),
                endTime: format(lastTime, 'HH:mm:ss'),
                deviceId: device
            }
            console.log(data);
            try {
                const response = await securityApi.getListControlLogByDayAndDevice(data);
                setListControl(response)
            } catch (error) {
                if (error.response.status === 400) {
                    toast.error('End time must be greater than start time')
                }
            }
        } else {
            toast.error("Please select device ")
        }

    }

    const columns = [
        // {
        //     field: 'image',
        //     headerName: 'Image',
        //     width: 280
        // },
        {
            field: 'username',
            headerName: 'Account',
            width: 150
        },
        {
            headerName: 'Name',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        <Typography>{params?.row?.firstName} {params?.row?.lastName}</Typography>
                    </Box>
                )
            }

        },
        {
            field: 'department',
            headerName: 'Department',
            flex: 1
        },
        {
            field: 'timeRecord',
            headerName: 'Time record',
            flex: 1
        },
        {
            field: 'verifyType',
            headerName: 'Verify Type',
            flex: 1
        },
        {
            field: 'room',
            headerName: 'Room',
            flex: 1
        },

        {
            field: 'action',
            headerName: 'Action',
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
                            <Button
                                variant="contained"
                                sx={{ fontSize: '14px' }}
                                onClick={() => navigate(`/control-log-detail-security/${params.row.username}/${params.row.controlLogId}`)}>
                                View Log
                            </Button>
                        </Box>
                    </Box>
                )
            }
        }
    ]

    console.log(listControl);

    return (
        <Box m={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    maxDate={new Date()}
                    // minDate={formatDateNotTime(createdDate?.createdDate)}
                    value={month}
                    views={['day', 'month', 'year']}
                    onChange={(newDate) => setMonth(newDate.toDate())}
                    renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
                />
            </LocalizationProvider>

            <Box mt={3} display='flex' gap={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        // ampm={false}
                        // minDate={formatDateNotTime(createdDate?.createdDate)}
                        value={firstTime}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={(newTime) => setFirstTime(newTime.toDate())}
                        renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        // ampm={false}
                        // minDate={formatDateNotTime(createdDate?.createdDate)}
                        value={lastTime}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={(e) => setLastTime(e.toDate())}
                        renderInput={(props) => <TextField sx={{ width: '20%' }} {...props} />}
                    />
                </LocalizationProvider>

                {listDevice && (<>
                    <Select
                        sx={{ width: '20%' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={device}
                        label="Device"
                        onChange={(e) => handleChangeDevice(e)}
                    >
                        {listDevice.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <MenuItem value={item?.deviceId}>{item?.deviceName}</MenuItem>
                        ))}
                    </Select>
                </>)}
                <Button variant="outlined" onClick={(e) => handleSearch(e)} >Search</Button>
            </Box>
            <Box mt={3}>
                <DataTableControlLog
                    rows={listControl}
                    columns={columns}
                />
            </Box>

        </Box>
    )
}

export default ControlLogSecurity
