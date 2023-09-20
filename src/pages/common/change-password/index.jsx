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
import Header from '../../../components/Header'
import { Link } from 'react-router-dom'
const AdminChanagePassword = () => {
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
                        <TextField fullWidth label="Old Password" name="oldPassword" required />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField fullWidth label="New Password" name="newPassword" required />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          name="confirmPassword"
                          required
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
                  <Button variant="contained" sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
                    Save
                  </Button>
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
