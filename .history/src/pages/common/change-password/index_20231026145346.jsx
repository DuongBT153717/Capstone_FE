import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header'
import userApi from '../../../services/userApi'
import { useFormik } from "formik";
import * as Yup from "yup";
const AdminChanagePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const isLoading = useSelector((state) => state.user.changePassword?.isFetching)
  const accountId = useSelector((state) => state.auth.login?.currentUser?.accountId)
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  console.log(accountId)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      accountId: accountId,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    userApi.changePassword(data, dispatch)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Password must be minimum eight characters, at least one letter and one number"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8081/authenticate", {
          username: values.email,
          password: values.password,
        });
        const token = response.data.jwttoken;
        const role = response.data.role;
        const userid = response.data.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userid", userid);
        console.log(response.data);
        // Redirect to dashboard or any page
        if(token === null){
          toast.error("Username or Password is incorrect")
        }else{
          if (role === "ROLE_ADMIN") {
            navigate("/list_question");
            toast.success("Login succesfully")
          } else {
            navigate("/home");
            toast.success("Login succesfully")
          }
        }       
      } catch (error) {
        console.error(error);
        formik.setErrors({ email: "Username or password is incorrect" });
      }
    },  
  });
  return (
    <Box height="100vh" bgcolor="seashell">
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
                  <Header title="Change Password" subtitle="Update Password" />
                  <Box sx={{ mb: 1 }}>
                    <Grid item container spacing={3}>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Old Password"
                          type='password'
                          onChange={(e) => setOldPassword(e.target.value)}
                          name="oldPassword"
                          value={oldPassword}
                          required
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="New Password"
                          type='password'
                          onChange={(e) => setNewPassword(e.target.value)}
                          value={newPassword}
                          name="newPassword"
                          required
                        />
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          type='password'
                          name="confirmPassword"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={handleSubmit}
                    loading={isLoading}
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

export default AdminChanagePassword
