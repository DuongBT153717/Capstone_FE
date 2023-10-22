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
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import userApi from '../../../../services/userApi'

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

  const dispatch = useDispatch()

  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')
  const handleChange = (e) => {
    setRole(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
        username: username,
        password: '123',
        role: role
    }
    userApi.createAccount(data, dispatch)
    let dataInfo = {
        username: username,
        statusId: "1",
        statusName: "active",
        roleName: role
    }
    setAllUser(prevUser => [...prevUser, dataInfo])
    handleCloseCreateAccount()
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
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Stack>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Age"
              onChange={handleChange}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="director">Director</MenuItem>
              <MenuItem value="security">Security</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <LoadingButton
              variant="contained"
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
