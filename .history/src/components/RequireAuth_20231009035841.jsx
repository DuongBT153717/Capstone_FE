import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const RequireAuth = ({ allowedRoles }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  if (currentUser) {
    const role = currentUser.role
    const token = currentUser.jwtToken
    return !token ? (
      <Navigate to="/login" />
    ) : role === allowedRoles ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" />
    )
  }
}

export default RequireAuth
