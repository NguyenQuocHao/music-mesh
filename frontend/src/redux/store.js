import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from './youtubeSlice'

export default configureStore({
  reducer: {
    playlist: playlistReducer
  },
})