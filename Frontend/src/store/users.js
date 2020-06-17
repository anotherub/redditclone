import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, get } from '../libs/requests'

const initialState = {
  otherUsers: []
}

export const getOtherUsers = createAsyncThunk('UsersStore/getOtherUsers', async (formData, { rejectWithValue }) => {
  try {
    const result = await get('/api/v1/users', JSON.stringify(formData))
    return result
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response)
  }
})
export const searchUserById = createAsyncThunk('UsersStore/searchUserById', async (id, { rejectWithValue }) => {
  try {
    const result = await get(`/api/v1/users/${id}`)
    return result
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response)
  }
})

const Users = createSlice({
  name: 'UsersStore',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(
      getOtherUsers.fulfilled,
      (
        state,
        {
          payload: {
            data: { status, users }
          }
        }
      ) => {
        if (status) {
          state.otherUsers = users
        }
      }
    )

    builder.addCase(getOtherUsers.rejected, (state, action) => {
      console.log('signup ERROR', action)
    })
    builder.addCase(searchUserById.fulfilled, (state, { payload: { data, status } }) => {
      console.log('serach results are ', data)
    })

    builder.addCase(searchUserById.rejected, (state, action) => {
      console.log('signup ERROR', action)
    })
  }
})
export const {} = Users.actions

export default Users.reducer
