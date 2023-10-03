import {
  Box,
  CardContent,
  Grid,
  Typography,
  styled,
  Divider,
  CardActions,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'

const TypoOverView = styled(Typography)(() => ({
  fontSize: '18px',
  textAlign: 'left'
}))


const Overview = (props) => {
  return (
    <>
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Grid item container spacing={3}>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>First name: {props.userInfo.firstName}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>Last name: {props.userInfo.lastName}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>Email Address: {props.userInfo.email}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>Phone Number: {props.userInfo.telephoneNumber}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>Country: {props.userInfo.country}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>City: {props.userInfo.city}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>Gender: {props.userInfo.gender}</TypoOverView>
            </Grid>
            <Grid item xs={12} md={6}>
              <TypoOverView fullWidth>Date of birth: {props.userInfo.dateOfBirth}</TypoOverView>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-start' }}>
        <Link to="/admin">
          <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
            Back to Dashboard
          </Button>
        </Link>
      </CardActions>
    </>
  )
}

export default Overview
