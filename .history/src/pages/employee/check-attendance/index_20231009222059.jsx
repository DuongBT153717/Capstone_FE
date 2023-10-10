import { Box, IconButton } from "@mui/material"
import Header from "../../../components/Header"
import DataTableCheckAttendance from "./components/DataTable"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from "react";
import axiosClient from "../../../utils/axios-config";
import { BASE_URL } from "../../../services/constraint";
import { useSelector } from "react-redux";
import AttendanceDetailModal from "./components/AttedanceDetailModal";

const CheckAttendance = () => {
  const userId = useSelector((state) => state.auth.login.currentUser.accountId)
  const [userAttendance, setUserAttendance] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const handleOpen = (data) => {
    setOpen(true)
    setDate(data.date)
  }
  const handleClose = () => setOpen(false)
  useEffect(() => {
    setIsLoading(true)
    const fetchAllAttendanceUser = async () => {
      const response = await axiosClient.get(`${BASE_URL}/getAttendanceUser`, {
        params: {
          user_id: userId
        }
      })
      setUserAttendance(response)
      setIsLoading(false)
      
    }
    fetchAllAttendanceUser()
  }, [])

  console.log(userAttendance);
  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: 'firstEntry',
      headerName: 'First Entry',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: 'lastExit',
      headerName: 'Last Exit',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: 'totalTime',
      headerName: 'Total Time',
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            margin="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="4px">
            <IconButton onClick={() => handleOpen(params.row)}>
              <RemoveRedEyeIcon sx={{ color: 'rgb(0, 150, 255)' }} />
            </IconButton>
          </Box>
        )
      }
    }
  ]
  return (
    <>
     <Header title="Check Attendance" subtitle="Check your daily attendance" />
      <DataTableCheckAttendance rows={userAttendance} columns={columns} isLoading={isLoading} />
      <AttendanceDetailModal open={open} handleClose={handleClose} date={date} userId={userId} />
    </>
  )
}

export default CheckAttendance