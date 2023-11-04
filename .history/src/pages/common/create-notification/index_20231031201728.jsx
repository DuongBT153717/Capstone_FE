import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import ChatTopbar from '../chat/components/ChatTopbar'
import Header from '../../../components/Header'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import requestApi from '../../../services/requestApi'

ClassicEditor.defaultConfig = {
  toolbar: {
    items: ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList']
  },
  language: 'en'
}
const CreateNotification = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const [checkedSetupTime, setCheckedSetupTime] = useState(true)
  const [departments, setDepartments] = useState([])
  const [isAllDepartment, setIsAllDepartment] = useState('')
  const theme = useTheme()
  const handleChangeSetupTime = (event) => {
    setCheckedSetupTime(event.target.checked)
  }

  const handleChangeRadioDepartment = (event) => {
    setIsAllDepartment(event.target.value)
  }

  const handleChangeDepartment = (event) => {
    setIsAllDepartment(event.target.value)
  }
 

  useEffect(() => {
    const getAllDepartments = async () => {
      const res = await requestApi.getAllDepartment()
      setDepartments(res)
    }

    getAllDepartments()
  }, [])

  console.log(isAllDepartment)
  return (
    <Box bgcolor={theme.palette.bgColorPrimary.main}>
      <ChatTopbar />
      <Box
        className="App"
        sx={{
          mx: 4,
          mt: 2
        }}>
        <Grid container>
          <Grid item xs={12}>
            <form autoComplete="off" noValidate>
              <Card>
                <CardContent>
                  <Header title="Create Notification" />
                  <Box sx={{ mb: 1 }}>
                    <Grid item container spacing={3}>
                      <Grid item xs={12}>
                        <Typography>Title: </Typography>
                        <TextField fullWidth label="Title" type="text" name="title" />
                      </Grid>
                      <Grid item xs={7}>
                        <Typography>Choose Receiver: </Typography>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={handleChangeRadioDepartment}>
                            <FormControlLabel
                              value="allDepartment"
                              control={<Radio />}
                              label="All"
                            />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      {
                        isAllDepartment === 'other' && <Grid item xs={7}>
                        <FormControl component="fieldset" variant="standard">
                          <FormLabel component="legend">Department: </FormLabel>
                          <FormGroup>
                            {departments.map((item) => (
                              <>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={handleChangeDepartment}
                                      name={item.departmentId}
                                    />
                                  }
                                  label={item.departmentName}
                                />
                              </>
                            ))}
                          </FormGroup>
                        </FormControl>
                      </Grid>
                      }
                      
                      <Grid display="flex" alignItems="center" gap="10px" item xs={12}>
                        <Typography>Priority: </Typography>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox defaultChecked />} />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography mb={2}>Attach file: </Typography>
                        <TextField
                          id="customFileInput"
                          fullWidth
                          type="file"
                          sx={{ display: 'none' }}
                        />
                        <label
                          htmlFor="customFileInput"
                          id="customFileLabel"
                          style={{
                            padding: '10px',
                            backgroundColor: 'yellow',
                            borderRadius: '5px',
                            margin: '0px',
                            cursor: 'pointer'
                          }}>
                          Choose file
                        </label>
                        <TextField
                          id="customInput"
                          fullWidth
                          type="file"
                          sx={{ display: 'none' }}
                        />
                        <label
                          htmlFor="customInput"
                          id="customFileLabel"
                          style={{
                            padding: '10px',
                            backgroundColor: 'red',
                            borderRadius: '5px',
                            marginLeft: '10px',
                            cursor: 'pointer'
                          }}>
                          Choose Image
                        </label>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Content: </Typography>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                          }}
                        />
                      </Grid>
                      <Grid display="flex" alignItems="center" gap="5px" item xs={7}>
                        <Typography>Setup upload time: </Typography>
                        <Checkbox
                          checked={checkedSetupTime}
                          onChange={handleChangeSetupTime}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </Grid>
                      {checkedSetupTime && (
                        <Grid display="flex" alignItems="center" gap="10px" item xs={7}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              renderInput={(props) => (
                                <TextField sx={{ width: '100%' }} {...props} />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'space-between', py: '8px' }}>
                  {currentUser?.role === 'hr' ? (
                    <Link to="/manage-user">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'employee' ? (
                    <Link to="/request-list-employee">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'manager' ? (
                    <Link to="/request-list-manager">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'admin' ? (
                    <Link to="/request-list-admin">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : currentUser?.role === 'security' ? (
                    <Link to="/manage-user">
                      <Button variant="contained" sx={{ bgcolor: 'rgb(100, 149, 237)' }}>
                        Back to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <></>
                  )}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
                    Save
                  </LoadingButton>
                </CardActions>
              </Card>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CreateNotification
