import axios from "axios"
import { createSlice } from '@reduxjs/toolkit'

export const YoutubeSlice = createSlice({
  name: 'youtubePlaylist',
  initialState: {
    value: []
  },
  reducers: {
    getMyYoutubePlaylists: (state, action) => {
      state.value = action.payload
    },
  }
})

// the outside "thunk creator" function
export const getYoutubePlaylists = () => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
      try {
        // make an async call in the thunk
        axios.get('http://localhost:5000/youtube/myPlaylists')
        .then(data => {
        //   setPopularSongs(data.data)
        return {
            // ...state,
            playlist: data
          }
          
        })

        // dispatch an action when we get the response back
        // dispatch(userLoaded(user))
      } catch (err) {
        // If something went wrong, handle it here
      }
    }
  }

  export const { getMyYoutubePlaylists } = YoutubeSlice.actions
  export default YoutubeSlice.reducer

  export const myYoutubePlaylists = (state) => state.youtubePlaylist.value