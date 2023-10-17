import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const RequireAuth = ({ allowedRoles }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  if (currentUser) {
    const role = currentUser.role;
    const token = currentUser.jwtToken;
    if (!token) {
      return <Navigate to="/login" />;
    } else if (allowedRoles.includes(role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }
};

export default RequireAuth
