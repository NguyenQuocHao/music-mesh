import { createSlice } from '@reduxjs/toolkit'

export const YoutubeSlice = createSlice({
  name: 'youtubePlaylist',
  initialState: {
    value: null
  },
  reducers: {
    getMyYoutubePlaylists: (state, action) => {
      state.value = action.payload
    },
    clearMyYoutubePlaylists: (state) => {
      state.value = null
    },
  }
})

export const { getMyYoutubePlaylists, clearMyYoutubePlaylists } = YoutubeSlice.actions
export default YoutubeSlice.reducer

export const myYoutubePlaylists = (state) => state.youtubePlaylist.value