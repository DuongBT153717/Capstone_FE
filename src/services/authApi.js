import axios from 'axios'
import { Base64 } from 'js-base64'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice'
import axiosClient from '../utils/axios-config'
import { BASE_URL } from './constraint'
import { toast } from 'react-toastify'
import { changePaswordFailed, changePaswordStart, changePaswordSuccess } from '../redux/userSlice'

const authApi = {
  changePassword: async (data, dispatch) => {
    dispatch(changePaswordStart()) 
    try {
      await axiosClient.post(`${BASE_URL}/changePassword`, data)
      changePaswordSuccess()
      toast.success('Change password sucessfully!')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Password wrong, please try again!')
        changePaswordFailed(false)
      }
      if (error.response.status === 403) {
        toast.error('Your account has been blocked')
        changePaswordFailed(false)
      }
    }
  },
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
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Password wrong, please try again!')
        dispatch(loginFailed())
      }
    }
  }
}

export default authApi
