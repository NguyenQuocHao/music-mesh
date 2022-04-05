import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from '../redux/slice'

export default configureStore({
  reducer: {
    playlist: playlistReducer
  },
})