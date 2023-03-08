import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from '../Reducer/reducer'

export default configureStore({
  reducer: counterReducer ,
})