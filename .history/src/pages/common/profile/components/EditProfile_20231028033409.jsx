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
      <form onSubmit={props.handleSubmit}>
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Grid item container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  value={
                    props.userInfo?.firstName !== 'unknown'
                      ? props.firstNameUpdate
                      : props.firstName
                  }
                  label="First name"
                  onChange={
                    props.userInfo?.firstName !== 'unknown'
                      ? (e) => props.setFirstNameUpdate(e.target.value)
                      : (e) => props.setFirstName(e.target.value)
                  }
                  name="firstName"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  value={
                    props.userInfo.lastName !== 'unknown' ? props.lastNameUpdate : props.lastName
                  }
                  onChange={
                    props.userInfo.lastName !== 'unknown'
                      ? (e) => props.setLastNameUpdate(e.target.value)
                      : (e) => props.setLastName(e.target.value)
                  }
                  name="lastName"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={props.userInfo.email !== 'unknown' ? props.emailUpdate : props.email}
                  required
                  onChange={
                    props.userInfo.email !== 'unknown'
                      ? (e) => props.setEmailUpdate(e.target.value)
                      : (e) => props.setEmail(e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={
                    props.userInfo.telephoneNumber !== 'unknown' ? props.phoneUpdate : props.phone
                  }
                  name="phone"
                  type="number"
                  onChange={
                    props.userInfo.telephoneNumber !== 'unknown'
                      ? (e) => props.setPhoneUpdate(e.target.value)
                      : (e) => props.setPhone(e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    value={
                      props.userInfo.dateOfBirth !== 'unknown' ? props.birthUpdate : props.birth
                    }
                    onChange={
                      props.userInfo.dateOfBirth !== 'unknown'
                        ? (newValue) => props.setBirthUpdate(newValue)
                        : (newValue) => props.setBirth(newValue)
                    }
                    renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={props.userInfo.country !== 'unknown' ? props.countryUpdate : props.country}
                  name="country"
                  onChange={
                    props.userInfo.country !== 'unknown'
                      ? (e) => props.setCountryUpdate(e.target.value)
                      : (e) => props.setCountry(e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={props.userInfo.city !== 'unknown' ? props.cityUpdate : props.city}
                  name="city"
                  onChange={
                    props.userInfo.city !== 'unknown'
                      ? (e) => props.setCityUpdate(e.target.value)
                      : (e) => props.setCity(e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={props.userInfo.gender !== 'unknown' ? props.genderUpdate : props.gender}
                    label="Gender"
                    onChange={
                      props.userInfo.gender !== 'unknown'
                        ? (e) => props.setGenderUpdate(e.target.value)
                        : (e) => props.setGender(e.target.value)
                    }>
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
          <Button variant="contained" sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
            Save details
          </Button>
        </CardActions>
      </form>
    </>
  )
}

export default EditProfile
