import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUsers } from '@/api/users'

export interface User {
  id: number
  name: string
}

export interface UsersState {
  data: User[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | undefined
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers()
  return response
})

const initialState: UsersState = {
  data: [],
  status: 'idle',
  error: ''
} satisfies UsersState

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'pending'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllUsers = (state: { users: UsersState }) => state.users.data

export default usersSlice.reducer
