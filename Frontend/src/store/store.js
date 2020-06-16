import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import login from './login'
import post from './post'
import users from './users'

const reducers = combineReducers({
  login,
  posts: post,
  users
})

export const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
  devTools: true
})
