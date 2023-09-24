import { Box } from '@mui/material'
import AccountPopover from './AccountPopover'
import NotificationsPopover from './NotificationsPopover'
const Topbar = () => {
  return (
    <Box display="flex" justifyContent="flex-end" px={2} height="65px" bgcolor="#fff">
      <Box display="flex" gap="10px">
        <NotificationsPopover />
        <AccountPopover />
      </Box>
    </Box>
  )
}

export default Topbar
