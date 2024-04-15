import { createSlice } from '@reduxjs/toolkit'

export interface User {
  id: string
  name: string
}

export interface UsersState {
  data: User[]
}

const initialState: UsersState = {
  data: [
    { id: '1', name: 'Jane Doe' },
    { id: '2', name: 'John Doe' },
    { id: '3', name: 'Jane Smith' }
  ]
}
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const selectAllUsers = (state: { users: UsersState }) => state.users.data

export default usersSlice.reducer
