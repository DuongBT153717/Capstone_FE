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
import ChatTopbar from '../chat/components/ChatTopbar'
import Header from '../../../components/Header'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'

const CreateNotification = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  return (
    <Box>
      <ChatTopbar />
      <Grid container>
        <Grid item xs={12}>
          <form autoComplete="off" noValidate>
            <Card>
              <CardContent>
                <Header title="Create Notification" />
                <Box sx={{ mb: 1 }}>
                  <Grid item container spacing={3}>
                    <Grid item xs={7}>
                      <TextField
                        fullWidth
                        label="Old Password"
                        type="password"
                        name="oldPassword"
                        required
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        name="newPassword"
                        required
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        name="confirmPassword"
                        required
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
                  <Link to="/request-list-employee">
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
                  type="submit"
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
  )
}

export default CreateNotification
