import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import GuestSidebar from "./GuestSidebar";
import GuestTopbar from "./GuestTopbar";



const GuestLayout = () => {
  return (
    <>
    <Box display="flex" height="100vh" bgcolor="rgb(238, 242, 246)">
      <GuestSidebar />
      <Box flex={1} sx={{overflowX: 'hidden'}}>
        <GuestTopbar />
        <Box pl={2} pt={2} pr={2}  sx={{borderRadius: '12px 12px 0px 0px'}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  </>
  )
}

export default GuestLayout