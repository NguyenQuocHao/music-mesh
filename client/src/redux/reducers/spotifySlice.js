import { createSlice } from '@reduxjs/toolkit'

export const SpotifySlice = createSlice({
  name: 'spotifyPlaylist',
  initialState: {
    value: []
  },
  reducers: {
    getMySpotifyPlaylists: (state, action) => {
      state.value = action.payload
    },
    clearMySpotifyPlaylists: (state, action) => {
      state.value = []
    },
  }
})

// // the outside "thunk creator" function
// export const getSpotifyPlaylists = () => {
//     // the inside "thunk function"
//     return async (dispatch, getState) => {
//       try {
//         // make an async call in the thunk
//         axios.get('http://localhost:5000/youtube/myPlaylists')
//         .then(data => {
//         //   setPopularSongs(data.data)
//         return {
//             // ...state,
//             playlist: data
//           }
          
//         })

//         // dispatch an action when we get the response back
//         // dispatch(userLoaded(user))
//       } catch (err) {
//         // If something went wrong, handle it here
//       }
//     }
//   }

  export const { getMySpotifyPlaylists, clearMySpotifyPlaylists } = SpotifySlice.actions
  export default SpotifySlice.reducer

  export const mySpotifyPlaylists = (state) => state.spotifyPlaylist.value