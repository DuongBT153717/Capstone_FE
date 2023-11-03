import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  LinearProgress,
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
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import userApi from '../../../services/userApi'
import { toast } from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear'
import notificationApi from '../../../services/notificationApi'
import dayjs from 'dayjs'
import axiosClient from '../../../utils/axios-config'
import { BASE_URL } from '../../../services/constraint'
import { useFormik } from 'formik'
import { validationSchema } from './util/validationSchema'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
ClassicEditor.defaultConfig = {
  toolbar: {
    items: ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList']
  },
  language: 'en'
}

const CreateNotification = () => {
  const theme = useTheme()
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  const [checkedSetupTime, setCheckedSetupTime] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [setupTime, setSetupTime] = useState(dayjs(new Date()))
  const [departments, setDepartments] = useState([])
  const [priority, setPriority] = useState(false)
  const [isAllDepartment, setIsAllDepartment] = useState('')
  const [departmentId, setDepartmentId] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [users, setUsers] = useState([])
  const [updateFilteredUsers, setUpdateFilteredUsers] = useState([])
  const [file, setFile] = useState([])
  const [isSave, setIsSave] = useState(true)
  const [fileImage, setFileImage] = useState({
    file: [],
    filepreview: []
  })
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await userApi.getAllUserByUserId(currentUser?.accountId)
      setUsers(response)
    }
    fetchAllUsers()
  }, [])
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedUsers(newValue.map((option) => option.accountId))
    setUpdateFilteredUsers(newValue.map((option) => option))
  }

  console.log(selectedUsers)
  const handleChangeSetupTime = (event) => {
    setCheckedSetupTime(event.target.checked)
  }

  const handleSaveDraft = (event) => {
    setIsSave(event.target.checked)
  }

  const handleChangeRadioDepartment = (event) => {
    setIsAllDepartment(event.target.value)
  }

  const handleChangePriority = (event) => {
    setPriority(event.target.checked)
  }
  const handleChangeDepartment = (event) => {
    const { name, checked } = event.target
    let updatedDepartmentId

    if (checked) {
      updatedDepartmentId = [...departmentId, name]
      const filteredSelectedUser = users.filter((user) => user.departmentId === name)
      console.log(filteredSelectedUser)
      const updateFilteredUser = filteredSelectedUser.map((item) => {
        return item.accountId
      })
      setSelectedUsers((prevSelectedUsers) => [
        ...new Set([...prevSelectedUsers, ...updateFilteredUser])
      ])
      setUpdateFilteredUsers((prevUpdateFilteredUsers) => [
        ...new Set([...prevUpdateFilteredUsers, ...filteredSelectedUser])
      ])
    } else {
      updatedDepartmentId = departmentId.filter((id) => id !== name)
      setUpdateFilteredUsers((prevUpdateFilteredUsers) =>
        prevUpdateFilteredUsers.filter((user) => user.departmentId !== name)
      )
      const filteredSelectedUser = users.filter((user) => user.departmentId !== name)
      const updateFilteredUser = filteredSelectedUser.map((item) => item.accountId)

      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers.filter((accountId) => updateFilteredUser.includes(accountId))
      ])
    }

    setDepartmentId(updatedDepartmentId)

    const filteredUser = users.filter((user) => updatedDepartmentId.includes(user.departmentId))
    setFilteredUsers(filteredUser)
  }

  useEffect(() => {
    const getAllDepartments = async () => {
      const res = await requestApi.getAllDepartment()
      setDepartments(res)
    }

    getAllDepartments()
  }, [])

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files

    if (selectedFiles.length > 0) {
      const acceptedFileTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'text/csv'
      ]
      const invalidFiles = []

      for (let i = 0; i < selectedFiles.length; i++) {
        if (!acceptedFileTypes.includes(selectedFiles[i].type)) {
          invalidFiles.push(selectedFiles[i].name)
        }
      }

      if (invalidFiles.length === 0) {
        setFile([...file, ...selectedFiles])
      } else {
        toast.error(
          `Invalid file types: ${invalidFiles.join(', ')}. Please select Word, PDF, or CSV files.`
        )
      }
    }
  }

  const handleDelete = (fileToDelete) => () => {
    const updatedFiles = file.filter((file) => file !== fileToDelete)
    setFile(updatedFiles)
  }

  const handleInputImageChange = (event) => {
    if (event && event.target.files) {
      const selectedFiles = event.target.files
      const fileArray = Array.from(selectedFiles)

      const previews = fileArray.map((file) => URL.createObjectURL(file))

      setFileImage({
        file: [...fileImage.file, ...fileArray],
        filepreview: [...fileImage.filepreview, ...previews]
      })
    }
  }

  console.log(fileImage.file)
  const handleDeleteImage = (index) => {
    const updatedFiles = [...fileImage.file]
    const updatedPreviews = [...fileImage.filepreview]

    updatedFiles.splice(index, 1)
    updatedPreviews.splice(index, 1)

    setFileImage({
      file: updatedFiles,
      filepreview: updatedPreviews
    })
  }
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isSave) {
        let formData = new FormData()
        const data = {
          buttonStatus: 'save',
          userId: currentUser?.accountId,
          title: title,
          sendAllStatus: isAllDepartment === 'allDepartment' ? true : false,
          receiverId: isAllDepartment === 'allDepartment' ? [] : selectedUsers,
          priority: priority,
          content: content,
          uploadDatePlan: checkedSetupTime ? setupTime.format('YYYY-MM-DD HH:mm:ss') : null
        }
        formData.append('data', JSON.stringify(data))
        console.log(data)
        fileImage.file.forEach((file) => {
          formData.append(`image[]`, file)
        })
        file.forEach((files) => {
          formData.append(`file[]`, files)
        })
        try {
          await axiosClient.post(`${BASE_URL}/saveNewNotification`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (data) => {
              setProgress(Math.round((100 * data.loaded) / data.total))
            }
          })
          toast.success('Save draft notification successfully!!')
        } catch (error) {
          if (error.response.status === 400) {
            toast.error("You can't select upload time before current time!")
          }
        }
      } else {
        let formData = new FormData()
        const data = {
          buttonStatus: 'upload',
          userId: currentUser?.accountId,
          title: title,
          sendAllStatus: false,
          receiverId: selectedUsers,
          priority: priority,
          content: content,
          uploadDatePlan: setupTime.format('YYYY-MM-DD HH:mm:ss')
        }
        formData.append('data', JSON.stringify(data))
        console.log(data)
        fileImage.file.forEach((file) => {
          formData.append(`image[]`, file)
        })
        file.forEach((files) => {
          formData.append(`file[]`, files)
        })
        try {
          await axiosClient.post(`${BASE_URL}/saveNewNotification`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (data) => {
              setProgress(Math.round((100 * data.loaded) / data.total))
            }
          })
          toast.success('Upload notification successfully!!')
        } catch (error) {
          if (error.response.status === 400) {
            toast.error("You can't select upload time before current time!")
          }
        }
      }
    },
  });
  // const handleCreateNotification = async (e) => {
  //   e.preventDefault()
  //   if (isSave) {
  //     let formData = new FormData()
  //     const data = {
  //       buttonStatus: 'save',
  //       userId: currentUser?.accountId,
  //       title: title,
  //       sendAllStatus: isAllDepartment === 'allDepartment' ? true : false,
  //       receiverId: isAllDepartment === 'allDepartment' ? [] : selectedUsers,
  //       priority: priority,
  //       content: content,
  //       uploadDatePlan: checkedSetupTime ? setupTime.format('YYYY-MM-DD HH:mm:ss') : null
  //     }
  //     formData.append('data', JSON.stringify(data))
  //     console.log(data)
  //     fileImage.file.forEach((file) => {
  //       formData.append(`image[]`, file)
  //     })
  //     file.forEach((files) => {
  //       formData.append(`file[]`, files)
  //     })
  //     try {
  //       await axiosClient.post(`${BASE_URL}/saveNewNotification`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         },
  //         onUploadProgress: (data) => {
  //           setProgress(Math.round((100 * data.loaded) / data.total))
  //         }
  //       })
  //       toast.success('Save draft notification successfully!!')
  //     } catch (error) {
  //       if (error.response.status === 400) {
  //         toast.error("You can't select upload time before current time!")
  //       }
  //     }
  //   } else {
  //     let formData = new FormData()
  //     const data = {
  //       buttonStatus: 'upload',
  //       userId: currentUser?.accountId,
  //       title: title,
  //       sendAllStatus: false,
  //       receiverId: selectedUsers,
  //       priority: priority,
  //       content: content,
  //       uploadDatePlan: setupTime.format('YYYY-MM-DD HH:mm:ss')
  //     }
  //     formData.append('data', JSON.stringify(data))
  //     console.log(data)
  //     fileImage.file.forEach((file) => {
  //       formData.append(`image[]`, file)
  //     })
  //     file.forEach((files) => {
  //       formData.append(`file[]`, files)
  //     })
  //     try {
  //       await axiosClient.post(`${BASE_URL}/saveNewNotification`, formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         },
  //         onUploadProgress: (data) => {
  //           setProgress(Math.round((100 * data.loaded) / data.total))
  //         }
  //       })
  //       toast.success('Upload notification successfully!!')
  //     } catch (error) {
  //       if (error.response.status === 400) {
  //         toast.error("You can't select upload time before current time!")
  //       }
  //     }
  //   }
  // }

  console.log(progress)
  return (
    <Box bgcolor={theme.palette.bgColorPrimary.main}>
      <ChatTopbar />
      <Box
        className="App"
        sx={{
          mx: 4,
          my: 2
        }}>
        <Grid container>
          <Grid item xs={12}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Card>
                <CardContent>
                  <Header title="Create Notification" />
                  <Box sx={{ mb: 1 }}>
                    <Grid item container spacing={3}>
                      <Grid item xs={12}>
                        <Typography mb={1}>Title: </Typography>
                        <TextField
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          fullWidth
                          label="Title"
                          type="text"
                          name="title"
                        />
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
                      {isAllDepartment === 'other' && (
                        <>
                          <Grid item xs={6}>
                            <FormControl component="fieldset" variant="standard">
                              <FormLabel component="legend">Department: </FormLabel>
                              <FormGroup>
                                {departments.map((item) => (
                                  <>
                                    <FormControlLabel
                                      key={item.departmentId}
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
                          <Grid item xs={6}>
                            {filteredUsers.length > 0 && (
                              <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                disableCloseOnSelect
                                options={filteredUsers}
                                getOptionLabel={(option) => option.username}
                                onChange={handleAutocompleteChange}
                                value={updateFilteredUsers}
                                renderOption={(props, option, { selected }) => (
                                  <li {...props}>
                                    <Checkbox
                                      icon={icon}
                                      checkedIcon={checkedIcon}
                                      style={{ marginRight: 8 }}
                                      checked={selected}
                                    />
                                    {option.username} ({option.departmentName})
                                  </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => <TextField {...params} label="User" />}
                              />
                            )}
                          </Grid>
                        </>
                      )}

                      <Grid display="flex" alignItems="center" gap="10px" item xs={12}>
                        <Typography>Priority: </Typography>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox checked={priority} onChange={handleChangePriority} />
                            }
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography mb={2}>Attach file: </Typography>
                        <Box mb={3} alignItems="center" gap="10px" display="flex">
                          {file.length > 0 &&
                            file.map((item, index) => (
                              <>
                                <Chip key={index} label={item.name} onDelete={handleDelete(item)} />
                              </>
                            ))}
                          {fileImage.filepreview.length > 0 &&
                            fileImage.filepreview.map((item, index) => (
                              <>
                                <img width="150px" height="100px" key={index} src={item} />
                                <IconButton>
                                  <ClearIcon onClick={() => handleDeleteImage(index)} />
                                </IconButton>
                              </>
                            ))}
                        </Box>
                        <input
                          id="customFileInput"
                          multiple
                          type="file"
                          accept=".docx,.pdf,.csv"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
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
                        <input
                          id="customInput"
                          multiple
                          onChange={(e) => handleInputImageChange(e)}
                          type="file"
                          accept=".jpg, .png"
                          style={{ display: 'none' }}
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
                        <Box sx={{ width: '100%', mt: 3 }}>
                          <LinearProgress value={progress} variant="determinate" />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary">{`${progress}%`}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Content: </Typography>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setContent(data)
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
                              value={setupTime}
                              onChange={(e) => setSetupTime(e)}
                              renderInput={(props) => (
                                <TextField sx={{ width: '100%' }} {...props} />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                      )}
                    </Grid>
                    <Grid display="flex" alignItems="center" gap="5px" item xs={7}>
                      <Typography>Save Draft: </Typography>
                      <Checkbox
                        checked={isSave}
                        onChange={handleSaveDraft}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
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
                  {isSave ? (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
                      Save
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: 'rgb(94, 53, 177)' }}>
                      Upload
                    </LoadingButton>
                  )}
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
