import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Tab,
  Typography
} from '@mui/material'
import { useState } from 'react'
import Header from '../../../components/Header'
import EditProfile from './components/EditProfile'
import Overview from './components/Overview'
import USER from '../../../assets/images/user.png'
const Profile = () => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userImage, setuserImage] = useState({
    file: [],
    filepreview: null
  })

  const handleInputChange = (event) => {
    if (event && event.target.files && event.target.files[0]) {
      setuserImage({
        ...userImage,
        file: event.target.files[0],
        filepreview: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box textAlign="center" bgcolor="seashell" height="100vh">
      <Box pt={5}>
        <Header title="PROFILE USER" subtitle="Overview and Update New User Profile" />

        <Box px={5} mt={8}>
          <form autoComplete="off" noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                {value == '2' ? (
                  <>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                          }}>
                          {userImage.filepreview !== null ? (
                            <Avatar
                              src={userImage.filepreview}
                              sx={{
                                height: 80,
                                mb: 2,
                                width: 80
                              }}
                            />
                          ) : (
                            <Avatar
                              src={`${USER}`}
                              sx={{
                                height: 80,
                                mb: 2,
                                width: 80
                              }}
                            />
                          )}

                          <Typography gutterBottom fontSize="20px" fontWeight="700">
                            Anika Visser
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            Admin
                          </Typography>
                        </Box>
                      </CardContent>

                      <Divider />
                      <CardActions>
                        <label
                          htmlFor="test"
                          style={{
                            width: '100%',
                            background: isHovered ? 'rgb(94, 53, 177)' : '#fff',
                            borderRadius: '10px',
                            color: isHovered ? '#fff' : '#000',
                            textAlign: 'center',
                            cursor: 'pointer',
                            padding: '8px 0px'
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}>
                          Upload picture
                        </label>
                        <input
                          id="test"
                          type="file"
                          hidden
                          onChange={(e) => handleInputChange(e)}
                        />
                      </CardActions>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                        <Avatar
                          src={`${USER}`}
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                          }}
                        />

                        <Typography gutterBottom fontSize="20px" fontWeight="700">
                          Anika Visser
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          Admin
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <Card>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Overview" value="1" />
                        <Tab label="Edit Profile" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Overview />
                    </TabPanel>
                    <TabPanel value="2">
                      <EditProfile />
                    </TabPanel>
                  </TabContext>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
