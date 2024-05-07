import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import { ILogin, UserDataDto } from './types'

interface IUserState {
  user_id: string | undefined | null
  user: UserDataDto | null
  token: string | null
  expiresAt: string | null | undefined
  isAuthenticated: boolean | null
  error: string | null
  message: string | null
  status: string | null | undefined
}

const initialState: IUserState = {
  user_id: null,
  token: null,
  status: null,
  expiresAt: null,
  isAuthenticated: false,
  error: null,
  message: null,
  user: {
    firstname: '',
    lastname: '',
    email: '',
    role: {
      id: null,
      roleEnum: '',
    },
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ILogin>) => {
      state.user_id = action.payload.user_id
      state.token = action.payload.token
      state.expiresAt = action.payload.expiresAt
      state.status = action.payload.status
      if (state.token) {
        state.isAuthenticated = true
      }
    },
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.token = null
      state.expiresAt = null
      state.isAuthenticated = false
      state.user = null
    },
  },
})

const reducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['user_id', 'token', 'isAuthenticated', 'user', 'expiresAt'],
  },
  authSlice.reducer
)

export const { setToken, setUserData, logout, setError } = authSlice.actions
export default reducer
