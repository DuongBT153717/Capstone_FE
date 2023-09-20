import { Box, CardContent, Grid, TextField } from "@mui/material"


const Overview = () => {
  return (
    <CardContent>
         <Box sx={{ mb: 1 }}>
          <Grid item container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
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
  )
}

export default Overview