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
                value={props.userInfo?.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                label="First name"
                onChange={props.userInfo?.firstName !== 'unknown'?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}
                name="firstName"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last name"
                value={props.userInfo.lastName !== 'unknown'? props.lastNameUpdate : props.lastName}
                onChange={props.userInfo.lastName !== 'unknown'?(e) => props.setlastNameUpdate(e.target.value): (e) => props.setlastName(e.target.value)}
                name="lastName"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={props.userInfo.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                required
                onChange={props.userInfo.firstName !== 'unknown'?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={props.userInfo.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                name="phone"
                type="number"
                onChange={props.userInfo.firstName !== 'unknown'?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of birth"
                    value={props.userInfo.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                    onChange={(newValue) => props.setBirth(newValue)}
                    renderInput={(props) => <TextField sx={{width: '100%'}} {...props} />}
                  />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={props.userInfo.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                name="country"
                onChange={props.userInfo.firstName !== 'unknown'?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                value={props.userInfo.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                name="city"
                onChange={props.userInfo.firstName !== 'unknown'?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={props.userInfo.firstName !== 'unknown'? props.firstNameUpdate : props.firstName}
                  label="Gender"
                  onChange={props.userInfo.firstName !== 'unknown'?(e) => props.setFirstNameUpdate(e.target.value): (e) => props.setFirstName(e.target.value)}>
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
