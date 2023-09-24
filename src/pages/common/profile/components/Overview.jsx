import { Box, CardContent, Grid, Typography, styled,Divider,CardActions,Button } from "@mui/material"
import { Link } from "react-router-dom";

const TypoOverView = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  textAlign:'Left'

}));

const Overview = () => {
  return (
    <>
    <CardContent >
      <Box sx={{ mb: 1   }}>
        <Grid item container spacing={3}>
          <Grid item xs={12} md={6}>
            <TypoOverView fullWidth>
              First name: Anika
            </TypoOverView>
          </Grid>
          <Grid item xs={12} md={6}>
            <TypoOverView fullWidth>
              Last name: Visser
            </TypoOverView>
          </Grid>
          <Grid item xs={12} md={6}>
            <TypoOverView fullWidth>
              Email Address: demo@devias.io
            </TypoOverView>
          </Grid>
          <Grid item xs={12} md={6}>
            <TypoOverView fullWidth>
              Phone Number: 0987212912
            </TypoOverView>
          </Grid>
          <Grid item xs={12} md={6}>
            <TypoOverView fullWidth>
              Country: USA
            </TypoOverView>
          </Grid>
          <Grid item xs={12} md={6}>
            <TypoOverView fullWidth>
              Select State: (Text for state)
            </TypoOverView>
          </Grid>
        </Grid>
      </Box>
    </CardContent> 
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-start' }}>
      <Link to='/admin'>
        <Button  variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
          Back to Dashboard
        </Button>
      </Link>
      </CardActions>
    </>
  )
}

export default Overview;
