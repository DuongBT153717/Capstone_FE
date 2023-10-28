import { LoadingButton } from '@mui/lab'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userApi from '../../../../services/userApi'

const RoleModal = ({ open, handleClose, user, setAllUser }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
  }
  const [role, setRole] = useState('')
  const [allDepartment, setAllDepartment] = useState('')
  const [department, setDepartment] = useState('')
  const dispatch = useDispatch()
  const handleChange = (event) => {
    setRole(event.target.value)
  }

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value)
  }
  const isLoading = useSelector((state) => state.user.changeRoleAccount.isFetching)
  useEffect(() => {
    const fetchAllDepartmentManager = async () => {
      const res = await userApi.getAllDepartmentManager()
      setAllDepartment(res)
    }
    fetchAllDepartmentManager()
  },[])

  const handleSubmit = () => {
    let data = {
      accountId: user.accountId,
      roleName: role,
      departmentId: department
    }
    console.log(data);
    userApi.changeRoleAccount(data, dispatch)
    setAllUser((prevUser) =>
      prevUser.map((userInfo) => {
        if (userInfo.accountId === user.accountId) {
          return {
            ...userInfo,
            roleName: role,
            departmentId: department
          }
        } else {
          return userInfo;
        }
      })
    );
    handleClose()
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description">
      <Box sx={{ ...style, width: 400 }}>
        <Typography fontSize="25px" fontWeight="800" mb={2}>
          Change Role
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="security">Security</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
          {
            role === 'manager' || role === 'employee' ? <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={department}
              label="Department"
              onChange={handleChangeDepartment}>
                {
                  allDepartment.map((item) => (
                    <MenuItem key={item.departmentId} value={item.departmentId}>{item.departmentName}</MenuItem>
                  ))
                }
            </Select>
          </FormControl>: <></>
          }
          <Box width="100%" display="flex" justifyContent="flex-end">
            <LoadingButton
              variant="contained"
              loading={isLoading}
              sx={{ bgcolor: 'rgb(94, 53, 177)' }}
              type="submit"
              >
              Save
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default RoleModal
