import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header'
import userApi from '../../../services/userApi'
const AdminChanagePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const isLoading = useSelector((state) => state.user.changePassword?.isFetching)
  const accountId = useSelector((state) => state.auth.login?.currentUser?.accountId)
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  console.log(accountId)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      accountId: accountId,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    userApi.changePassword(data, dispatch)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <Box height="100vh" bgcolor="seashell">
      <Box
        className="App"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <Grid container>
          <Grid item xs={12}>
            <form autoComplete="off" noValidate>
              <Card>
                <CardContent>
                  <Header title="Change Password" subtitle="Update Password" />
                  <Box sx={{ mb: 1 }}>
                    <Grid item container spacing={3}>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Old Password"
                          onChange={(e) => setOldPassword(e.target.value)}
                          name="oldPassword"
                          value={oldPassword}
                          required
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="New Password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          value={newPassword}
                          name="newPassword"
                          required
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          name="confirmPassword"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', py: '8px' }}>
                  {currentUser?.role === 'hr' ? (
                    <Link to="/manage-user">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'employee' ? (
                    <Link to="/manage-user">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'manager' ? (
                    <Link to="/request-list-manager">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'admin' ? (
                    <Link to="/request-list-admin">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'security' ? (
                    <Link to="/manage-user">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <></>
                  )}
                  <LoadingButton
                    onClick={handleSubmit}
                    loading={isLoading}
                    variant="contained"
                    sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
                    Save
                  </LoadingButton>
                </CardActions>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AdminChanagePassword
