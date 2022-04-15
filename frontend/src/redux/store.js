import { configureStore } from '@reduxjs/toolkit'
import youtubeReducer from './reducers/youtubeSlice'
import spotifyReducer from './reducers/spotifySlice'

export default configureStore({
  reducer: {
    youtubePlaylist: youtubeReducer,
    spotifyPlaylist: spotifyReducer
  },
})