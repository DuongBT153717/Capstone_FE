import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const EditProfile = (props) => {
  
  return (
    <>
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Grid item container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="First name" onChange={(e) => props.setFirstName(e.target.value)} name="firstName"  />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Last name" onChange={(e) => props.setLastName(e.target.value)} name="lastName" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="number"
                onChange={(e) => props.setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  sx={{ width: '100%' }}
                  label="Date of birth"
                  value={props.birth}
                  onChange={(newValue) => props.setBirth(newValue)}
                  renderInput={(props) => <TextField {...props} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Country" name="country" onChange={(e) => props.setCountry(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="City" name="city" onChange={(e) => props.setCity(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={props.gender}
                  label="Gender"
                  onChange={(e) => props.setGender(e.target.value)}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={props.handleSubmit} variant="contained" sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
          Save details
        </Button>
      </CardActions>
    </>
  )
}

export default EditProfile
