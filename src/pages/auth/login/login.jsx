import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import { IconButton, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'
import authApi from '../../../services/authApi'
import { Base64 } from 'js-base64';
export default function Login() {
  // const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    let data = {
      username: username,
      password: password
    }

    try {
      const response = await authApi.signIn(data)
      localStorage.setItem('TOKEN', response.data.jwtToken)
      localStorage.setItem('ROLE', Base64.btoa(response.data.role))
      localStorage.setItem('ACCOUNTID', response.data.accountId)
      if(response.data.role === 'admin'){
        navigate('/admin')
      }else if(response.data.role === 'director'){
        navigate('/director')
      }else if(response.data.role === 'hr'){
        navigate('/hr')
      }
      setIsLoading(false)
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Password wrong, please try again!')
        setIsLoading(false)
      }
      if (error.response.status === 404) {
        toast.error('Username wrong, please try again!')
        setIsLoading(false)
      }
      if (error.response.status === 403) {
        toast.error('Your account has been blocked')
        setIsLoading(false)
      }
    }
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          height: '100vh'
        }}>
        <Grid container sx={{ flex: '1 1 auto' }}>
          <Grid
            xs={12}
            lg={6}
            sx={{
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            item>
            <Box
              sx={{
                backgroundColor: 'background.paper',
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Box
                sx={{
                  maxWidth: 550,
                  px: 3,
                  py: '100px',
                  width: '100%'
                }}>
                <div>
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '35px', fontWeight: '700' }}>Login</Typography>
                  </Stack>
                  <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        type="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                              onClick={handleClickShowPassword}
                              size="large">
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          )
                        }}
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" mt={1}>
                      <FormControlLabel
                        sx={{ width: '60%' }}
                        onClick={() => setRemember(!remember)}
                        control={<Checkbox checked={remember} />}
                        label="Remember Me"
                      />
                      <Typography
                        variant="body1"
                        component="span"
                        onClick={() => {
                          navigate('/reset-password')
                        }}
                        style={{
                          marginTop: '10px',
                          cursor: 'pointer',
                          color: 'rgb(99, 102, 241)'
                        }}>
                        Forgot password?
                      </Typography>
                    </Stack>
                    <LoadingButton
                      fullWidth
                      loading={isLoading}
                      size="large"
                      sx={{
                        mt: 2,
                        bgcolor: 'rgb(99, 102, 241)',
                        p: '11px 24px',
                        borderRadius: '12px'
                      }}
                      type="submit"
                      variant="contained">
                      Submit
                    </LoadingButton>
                  </form>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid
            xs={12}
            lg={6}
            sx={{
              alignItems: 'center',
              background: 'radial-gradient(circle, rgba(9,50,121,1) 16%, rgba(0,212,255,1) 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              '& img': {
                maxWidth: '100%'
              }
            }}
            item></Grid>
        </Grid>
      </Box>
    </>
  )
}
