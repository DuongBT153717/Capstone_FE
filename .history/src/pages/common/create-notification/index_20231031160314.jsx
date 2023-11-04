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

const CreateNotification = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.bgColorPrimary.main}>
      <ChatTopbar />
      <Box
        className="App"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
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
                            name="radio-buttons-group">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid display="flex" alignItems="center" gap="10px" item xs={5}>
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
