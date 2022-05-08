import { createSlice } from '@reduxjs/toolkit';

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    value: []
  },
  reducers: {
    addTrack: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
    removeTrackByIndex: (state, action) => {
      state.value = state.value.filter((_, index) => index != action.payload)
    },
  }
})

  export const { addTrack, removeTrackByIndex } = queueSlice.actions
  export default queueSlice.reducer

  export const myQueue = (state) => state.queue.value