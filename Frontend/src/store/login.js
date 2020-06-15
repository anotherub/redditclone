import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post } from '../libs/requests'

const initialState = {
  isAuthenticated: null,
  userInfo: {}
}

export const signup = createAsyncThunk('loginStore/signup', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await post('/api/v1/users/register', formData)
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})
export const signin = createAsyncThunk('loginStore/signin', async (formData, { rejectWithValue }) => {
  try {
    const result = await post('/api/v1/users/authenticate', formData)
    return result
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response)
  }
})

const Login = createSlice({
  name: 'loginStore',
  initialState,

  reducers: {
    testAction: (state, { payload }) => {
      console.log(`${Date.now()} - TEST ACTION: `, payload.msg)
    },
    signout: (state, { payload }) => {
      localStorage.setItem('isLoggedIn', 'false')
      localStorage.removeItem('username')
    }
  },

  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, { payload }) => {})

    builder.addCase(signup.rejected, (state, action) => {
      console.log('signup ERROR', action)
    })
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      const { data, status } = payload
      if (status) {
        state.isAuthenticated = true
        state.userInfo = data
        localStorage.setItem('username', data.data.username)
      } else state.isAuthenticated = false
    })

    builder.addCase(signin.rejected, (state, action) => {
      console.dir('signin ERROR occured', action)
    })
  }
})

export const { testAction, signout } = Login.actions

export default Login.reducer
