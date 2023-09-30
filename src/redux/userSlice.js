import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    changePasword: {
      isFetching: false,
      error: false
    },
  },
  reducers: {
    changePaswordStart: (state) => {
      state.changePasword.isFetching = true
    },
    changePaswordSuccess: (state) => {
      state.changePasword.isFetching = false
      state.changePasword.error = false
    },
    changePaswordFailed: (state) => {
      state.changePasword.isFetching = false
      state.changePasword.error = true
    }
  }
})

export const { changePaswordStart, changePaswordSuccess, changePaswordFailed } = userSlice.actions

export default userSlice.reducer
