import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const AttendenceFrom = () => {
  const [from, setFrom] = useState(dayjs('00:00'))
  const [to, setTo] = useState('')
  return (
    <Box p={3} pl={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight="700" fontSize="18px">
            Request details{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="500">Title</Typography>
          <TextField sx={{ width: '100%' }} size="small" placeholder="Enter the request title" />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="500">Position</Typography>
          <Select sx={{ width: '100%', height: '56px' }} displayEmpty>
            <MenuItem value="">HR</MenuItem>
            <MenuItem value={20}>Manager</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} mb={2}>
          <Typography fontWeight="500">From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={from}
              onChange={(e) => setFrom(e)}
              renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} mb={2}>
          <Typography fontWeight="500">From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={to}
              onChange={(e) => setTo(e)}
              renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="500">Content</Typography>
          <CKEditor editor={ClassicEditor} onInit={() => {}} />
        </Grid>
      </Grid>
      <Box pt={2} display="flex" alignItems="flex-end" justifyContent="flex-end">
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  )
}

const RoomRequestForm = () => {
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  console.log(date.format('DD/MM/YYYY HH:mm'))
  return (
    <Box p={3} pl={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight="700" fontSize="20px">
            Room Request
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="500">Title</Typography>
          <TextField sx={{ width: '100%' }} size="small" placeholder="Enter the request title" />
        </Grid>

        <Grid item xs={6} mb={2}>
          <Typography fontWeight="500">From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={date}
              onChange={(e) => setDate(e)}
              renderInput={(props) => <TextField sx={{ width: '100%' }} {...props} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6} mb={2}>
          <Typography fontWeight="500">To</Typography>
          <TextField sx={{ width: '100%', height: '38px' }} type="time" />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="500">Content</Typography>
          <CKEditor
            editor={ClassicEditor}
            onChange={(editor) => {
              const data = editor.getData()
              setContent(data)
            }}
          />
        </Grid>
      </Grid>
      <Box pt={2} display="flex" alignItems="flex-end" justifyContent="flex-end">
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  )
}

const OtRequest = () => <Box p={3}>Ot Request From</Box>

const DepartmentRequest = () => <Box p={3}>Department Request From</Box>

const LeaveRequest = () => <Box p={3}>Leave Request</Box>

export { AttendenceFrom, DepartmentRequest, LeaveRequest, OtRequest, RoomRequestForm }
