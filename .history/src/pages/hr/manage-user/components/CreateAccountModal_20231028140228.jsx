import { LoadingButton } from '@mui/lab'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../../services/constraint'
import userApi from '../../../../services/userApi'
import axiosClient from '../../../../utils/axios-config'
import { validationSchema } from './until/validationSchema'

const CreateAccountModal = ({ handleCloseCreateAccount, openCreateAccount, setAllUser }) => {
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

  const [listDepartment, setListDepartment] = useState([])
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')
  const [username, setUsername] = useState('')

  const handleChangeRole = (e) => {
    setRole(e.target.value)
  }
  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value)
  }

  useEffect(() => {
    const getAllDepartment = async () => {
      let res = await userApi.getAllDepartment()
      setListDepartment(res)
    }
    getAllDepartment()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      username: username,
      password: '123',
      role: role,
      departmentName: department
    }
    try {
      await axiosClient.post(`${BASE_URL}/register`, data)
      let dataInfo = {
        username: username,
        statusId: '1',
        statusName: 'active',
        roleName: role
      }
      setAllUser((prevUser) => [...prevUser, dataInfo])
      toast.success('Create account succesfully!')
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('Role not found!')
      }
      if (error.response.status === 400) {
        toast.error('Username already exists!')
      }
    }

    handleCloseCreateAccount()
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      role: '',
      department: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let data = {
        username: values.username,
        password: '123',
        role: values.role,
        departmentName: values.department
      }
      console.log(data)
      try {
        axiosClient.post(`${BASE_URL}/register`, data)
        let dataInfo = {
          username: values.username,
          statusId: '1',
          statusName: 'active',
          roleName: values.role
        }
        setAllUser((prevUser) => [...prevUser, dataInfo])
        toast.success('Create account succesfully!')
      } catch (error) {
        if (error.response.status === 404) {
          toast.error('Role not found!')
        }
        if (error.response.status === 400) {
          toast.error('Username already exists!')
        }
        if (error.response.status === 409) {
          toast.error('Your department has manager already!')
        }
      }
      handleCloseCreateAccount()
    }
  })

  const handleSetRole = () => {
    if (formik.values.department === 'security') {
      return (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              label="Department"
              onBlur={formik.handleBlur}
              value={formik.values.role}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}>
              <MenuItem value="security">Security</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.role && formik.errors.role && (
            <div className="error-message">{formik.errors.role}</div>
          )}
        </>
      )
    } else if (formik.values.department === 'human resources') {
      return (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              label="Department"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              onChange={formik.handleChange}>
              <MenuItem value="hr">HR</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.role && formik.errors.role && (
            <div className="error-message">{formik.errors.role}</div>
          )}
        </>
      )
    } else if (formik.values.department === 'Admin') {
      return (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              label="Department"
              InputLabelProps={{ shrink: true }}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              onChange={formik.handleChange}>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.role && formik.errors.role && (
            <div className="error-message">{formik.errors.role}</div>
          )}
        </>
      )
    } else if (
      formik.values.department === 'tech D1' ||
      formik.values.department === 'tech D2' ||
      formik.values.department === 'tech D3' ||
      formik.values.department === 'tech D4' ||
      formik.values.department === 'tech D5' ||
      formik.values.department === 'tech D6'
    ) {
      return (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.role}
              InputLabelProps={{ shrink: true }}
              name="role"
              label="Role"
              onChange={formik.handleChange}>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          {formik.touched.role && formik.errors.role && (
            <div className="error-message">{formik.errors.role}</div>
          )}
        </>
      )
    }
  }

  return (
    <Modal
      open={openCreateAccount}
      onClose={handleCloseCreateAccount}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description">
      <Box sx={{ ...style, width: 400 }}>
        <Typography fontSize="25px" fontWeight="800" mb={2}>
          Create Account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack mb={3}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              type="username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error-message">{formik.errors.username}</div>
            )}
          </Stack>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.department}
              onChange={formik.handleChange}
              label="Department"
              name="department"
              InputLabelProps={{ shrink: true }}>
              {listDepartment.map((item, index) => (
                <MenuItem key={index} value={item.departmentName}>
                  {item.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.touched.department && formik.errors.department && (
            <div className="error-message">{formik.errors.department}</div>
          )}

          {handleSetRole()}

          {/* <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Age"
              onChange={handleChangeRole}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="director">Director</MenuItem>
              <MenuItem value="security">Security</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl> */}

          <Box width="100%" display="flex" justifyContent="flex-end">
            <LoadingButton
              variant="contained"userApiC
              //   loading={isLoading}
              sx={{ bgcolor: 'rgb(94, 53, 177)' }}
              type="submit">
              Save
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default CreateAccountModal
