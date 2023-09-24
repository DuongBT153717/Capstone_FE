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

const CreateStaff = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'seashell',
        height: '100vh'
      }}>
      <Card sx={{ maxWidth: '60%', textAlign: 'center' }}>
        <Header title="PROFILE USER" subtitle="Overview and Update New User Profile" />
        <Box>
          <CardContent>
            <Box sx={{ mb: 1 }}>
              <Grid item container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                    value="Anika"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Last name" name="lastName" required value="Visser" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    required
                    value="demo@devias.io"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="number"
                    value="0987212912"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Country" name="country" required value="USA" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Select State" name="state"></TextField>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
              Save details
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  )
}

export default CreateStaff
