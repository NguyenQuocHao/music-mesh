import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux"; 
import youtubeReducer from './reducers/youtubeSlice';
import spotifyReducer from './reducers/spotifySlice';
import queueReducer from './reducers/queue';
import userReducer from './reducers/userSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducers = combineReducers({
  youtubePlaylist: youtubeReducer,
  spotifyPlaylist: spotifyReducer,
  queue: queueReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);
 
export default configureStore({
  reducer: persistedReducer,
})