import useAuth from "../../../hooks/useAuth"


const AdminDashboard = () => {
  const { auth } = useAuth()
  console.log(auth);
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard