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
              <TextField
                fullWidth
                value={userInfo? props.firstNameUpdate : firstName}
                label="First name"
                onChange={userInfo?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}
                name="firstName"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last name"
                value={props.userInfo.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
                name="lastName"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={props.userInfo.email}
                required
                onChange={(e) => props.setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={props.userInfo.telephoneNumber}
                name="phone"
                type="number"
                onChange={(e) => props.setPhone(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    value={props.birth}
                    onChange={(newValue) => props.setBirth(newValue)}
                    renderInput={(props) => <TextField sx={{width: '100%'}} {...props} />}
                  />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={props.userInfo.country}
                name="country"
                onChange={(e) => props.setCountry(e.target.value)}
                InputLabelProps={{ shrink: true }}
                ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                value={props.userInfo.city}
                name="city"
                onChange={(e) => props.setCity(e.target.value)}
                InputLabelProps={{ shrink: true }}
                ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={props.userInfo.gender}
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
        <Button
          onClick={props.handleSubmit}
          variant="contained"
          sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
          Save details
        </Button>
      </CardActions>
    </>
  )
}

export default EditProfile
