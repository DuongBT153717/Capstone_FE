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
import dayjs from 'dayjs'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import USER from '../../../assets/images/user.jpg'
import Header from '../../../components/Header'
import { storage } from '../../../firebase/config'
import useAuth from '../../../hooks/useAuth'
import userApi from '../../../services/userApi'
import EditProfile from './components/EditProfile'
import Overview from './components/Overview'
import { useFormik } from 'formik'
import { validationSchema } from './components/until/validationSchema'
const Profile = () => {
  const userInfo = useAuth()
  const [isHovered, setIsHovered] = useState(false)
  const [birth, setBirth] = useState(dayjs('2022-04-17'))
  const [userProfileImage, setUserProfileImage] = useState('')
  const [firstNameUpdate, setFirstNameUpdate] = useState('')
  const [lastNameUpdate, setLastNameUpdate] = useState('')
  const [genderUpdate, setGenderUpdate] = useState('')
  const [emailUpdate, setEmailUpdate] = useState('')
  const [cityUpdate, setCityUpdate] = useState('')
  const [countryUpdate, setCountryUpdate] = useState('')
  const [birthUpdate, setBirthUpdate] = useState('')
  const [phoneUpdate, setPhoneUpdate] = useState('')
  const [info, setInfo] = useState('')
  
  useEffect(() => {
    setBirthUpdate(userInfo?.dateOfBirth)
    setInfo(userInfo)
  }, [userInfo])

  console.log(birthUpdate);
  console.log(info?.firstName);
  const formik = useFormik({
    initialValues: {
      firstName: info?.firstName,
      lastName: info?.lastName,
      gender: info?.gender,
      email: info?.country,
      city: info?.city,
      country: info?.country,
      phone: info?.telephoneNumber
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let formData = new FormData()
      const data = {
        userId: accountId,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        dateOfBirth: birth.format('YYYY-MM-DD'),
        telephoneNumber: values.phone,
        country: values.country,
        city: values.city,
        email: values.email
      }
      formData.append('data', JSON.stringify(data))
      console.log(data)
      formData.append('image', userImage.file)
      userApi.updateProfile(formData, dispatch)
    }
  })

  console.log(formik.values.firstName)
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

  const imgurl = async () => {
    const storageRef = ref(storage, `/${userInfo.image}`)
    try {
      const url = await getDownloadURL(storageRef)
      setUserProfileImage(url)
    } catch (error) {
      console.error('Error getting download URL:', error)
    }
  }

  if (userInfo && userInfo.image) {
    imgurl()
  }
  console.log(userProfileImage)

  const accountId = useSelector((state) => state.auth.login?.currentUser?.accountId)
  const role = useSelector((state) => state.auth.login?.currentUser?.role)
  const dispatch = useDispatch()

  console.log(formik.values)
  return (
    <Box textAlign="center" bgcolor="seashell" height="100vh">
      <Box pt={5}>
        <Header title="PROFILE USER" subtitle="Overview and Update New User Profile" />
        <Box px={5} mt={8}>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                {value === '2' ? (
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
                          ) : userProfileImage !== null ? (
                            <Avatar
                              src={userProfileImage}
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
                            {userInfo.firstName} {userInfo.lastName}
                          </Typography>
                          <Typography sx={{ textTransform: 'capitalize' }} variant="body2">
                            {role}
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
                        {userProfileImage !== null ? (
                          <Avatar
                            src={userProfileImage}
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
                          {userInfo.firstName} {userInfo.lastName}
                        </Typography>
                        <Typography sx={{ textTransform: 'capitalize' }} variant="body2">
                          {role}
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
                      <Overview userInfo={userInfo} />
                    </TabPanel>
                    <TabPanel value="2">
                      <EditProfile
                        userInfo={userInfo}
                        firstNameUpdate={firstNameUpdate}
                        setFirstNameUpdate={setFirstNameUpdate}
                        lastNameUpdate={lastNameUpdate}
                        setLastNameUpdate={setLastNameUpdate}
                        cityUpdate={cityUpdate}
                        setCityUpdate={setCityUpdate}
                        birthUpdate={birthUpdate}
                        setBirthUpdate={setBirthUpdate}
                        phoneUpdate={phoneUpdate}
                        setPhoneUpdate={setPhoneUpdate}
                        emailUpdate={emailUpdate}
                        setEmailUpdate={setEmailUpdate}
                        countryUpdate={countryUpdate}
                        setCountryUpdate={setCountryUpdate}
                        setGendeUpdater={setGenderUpdate}
                        genderUpdate={genderUpdate}
                        firstName={formik.values.firstName}
                        lastName={formik.values.lastName}
                        city={formik.values.city}
                        birth={birth}
                        setBirth={setBirth}
                        phone={formik.values.phone}
                        email={formik.values.email}
                        country={formik.values.country}
                        gender={formik.values.gender}
                        formik={formik}
                      />
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
