import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from './reducers/youtubeSlice'

export default configureStore({
  reducer: {
    playlist: playlistReducer
  },
})