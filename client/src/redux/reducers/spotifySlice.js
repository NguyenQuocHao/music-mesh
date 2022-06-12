import { createSlice } from '@reduxjs/toolkit'

export const SpotifySlice = createSlice({
  name: 'spotifyPlaylist',
  initialState: {
    value: null
  },
  reducers: {
    getMySpotifyPlaylists: (state, action) => {
      state.value = action.payload
    },
    clearMySpotifyPlaylists: (state) => {
      state.value = null
    },
  }
})

  export const { getMySpotifyPlaylists, clearMySpotifyPlaylists } = SpotifySlice.actions;
  export default SpotifySlice.reducer;

  export const mySpotifyPlaylists = (state) => state.spotifyPlaylist.value;