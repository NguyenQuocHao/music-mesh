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
    clearQueue: (state) => {
      state.value = []
    },
  }
})

export const currentTrackIndexSlice = createSlice({
  name: 'currentTrackIndex',
  initialState: {
    value: 0
  },
  reducers: {
    setCurrentTrackIndex: (state, action) => {
      state.value = action.payload
    },
  }
})

export default queueSlice.reducer
export const { addTrack, removeTrackByIndex, clearQueue } = queueSlice.actions
export const myQueue = (state) => state.queue.value
export const currentTrackIndexReducer = currentTrackIndexSlice.reducer
export const { setCurrentTrackIndex } = currentTrackIndexSlice.actions
export const currentTrackIndex = (state) => state.currentTrackIndex.value