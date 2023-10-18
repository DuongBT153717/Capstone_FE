import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const AttendenceFrom = () => (
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
      <Grid item xs={5}>
        <Typography fontWeight="500">Position</Typography>
        <Select sx={{ width: '100%', height: '56px' }} displayEmpty>
          <MenuItem value="">
            <em>HR</em>
          </MenuItem>
          <MenuItem value={20}>Manager</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight="500">From</Typography>
        <TextField sx={{ width: '100%', height: '38px' }} type={'time'} />
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight="500">To</Typography>
        <TextField sx={{ width: '100%', height: '38px' }} type={'time'} />
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

const RoomRequestForm = () => {
  const [content, setContent] = useState('')
  console.log(content);
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

        <Grid item xs={6}>
          <Typography fontWeight="500">From</Typography>
          <TextField sx={{ width: '100%', height: '38px' }} type="time" />
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight="500">To</Typography>
          <TextField sx={{ width: '100%', height: '38px' }} type="time" />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight="500">Content</Typography>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData()
              setContent(data)
            }}
          />
        </Grid>
      </Grid>
      <Box pt={2} display="flex" alignItems="flex-end" justifyContent="flex-end">
        <Button variant="contained">Save</Button>
      </Box>

      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </Box>
  )
}

const OtRequest = () => (
  <Box p={3} pl={0}>
    Ot Request From
  </Box>
)

const DepartmentRequest = () => (
  <Box p={3} pl={0}>
    Department Request From
  </Box>
)

const LeaveRequest = () => <Box p={3}>Leave Request</Box>

export { AttendenceFrom, DepartmentRequest, LeaveRequest, OtRequest, RoomRequestForm }
