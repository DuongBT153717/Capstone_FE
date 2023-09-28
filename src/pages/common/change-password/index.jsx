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
import { Link } from 'react-router-dom'
import Header from '../../../components/Header'
import authApi from '../../../services/authApi'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
const AdminChanagePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const accountId = localStorage.getItem('ACCOUNTID')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      accountId: accountId,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    try {
      setIsLoading(true)
      await authApi.changePassword(data)
      setIsLoading(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast.success('Change password sucessfully!')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Password wrong, please try again!')
        setIsLoading(false)
      }
      if (error.response.status === 403) {
        toast.error('Your account has been blocked')
        setIsLoading(false)
      }
    }
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
                          required
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="New Password"
                          onChange={(e) => setNewPassword(e.target.value)}
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
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', py: '8px' }}>
                  <Link to="/admin">
                    <Button variant="contained" sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
                      Back to Dashboard
                    </Button>
                  </Link>
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
