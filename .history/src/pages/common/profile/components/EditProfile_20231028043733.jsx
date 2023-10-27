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
                  value={
                    props.firstName
                  }
                  label="First name"
                  onChange={
                    props.formik.handleChange
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
                    props.lastName
                  }
                  onChange={
                    props.formik.handleChange
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
                  value={ props.email}
                  required
                  onChange={
                    props.formik.handleChange
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={
                    props.phone
                  }
                  name="phone"
                  type="text"
                  onChange={
                    props.formik.handleChange
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
                  value={props.country}
                  name="country"
                  onChange={
                    props.formik.handleChange
                  }
                  InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={props.city}
                  name="city"
                  onChange={
                    props.formik.handleChange
                  }
                  InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={props.gender}
                    name='gender'
                    id='demo-gender'
                    label="Gender"
                    onChange={
                      props.formik.handleChange
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
          <Button type='submit' variant="contained" sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
            Save details
          </Button>
        </CardActions>
    </>
  )
}

export default EditProfile
