import axios from 'axios'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice'

import { toast } from 'react-toastify'
import { BASE_URL } from './constraint'

const authApi = {
  loginUser: async (data, dispatch, navigate) => {
    dispatch(loginStart())
    try {
      const response = await axios.post(`${BASE_URL}/login`, data)
      dispatch(loginSuccess(response.data))
      localStorage.setItem('token', response.data.jwtToken)
      if (response.data.role === 'admin') {
        navigate('/admin')
      } else if (response.data.role === 'director') {
        navigate('/director')
      } else if (response.data.role === 'hr') {
        navigate('/manage-user')
      }else if (response.data.role === 'employee') {
        navigate('/check-attendance')
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Password wrong, please try again!')
        dispatch(loginFailed())
      }
    }
  },
  resetPassword: async (data) => {
    try {
      await axios.post(`${BASE_URL}/resetPassword`, data)
      toast.success('Your new password will be sent your gmail!')
    } catch (error) {
      console.log(error);
    }
  },
}

export default authApi
