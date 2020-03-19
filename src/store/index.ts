import { configureStore } from '@reduxjs/toolkit';
import { downloadReducer, DownloadSate } from './download';
import { persistMiddleware, persistConfig } from './middlewares';

export type State = {
  download: DownloadSate;
};

export default configureStore({
  reducer: { download: downloadReducer },
  middleware: [persistMiddleware],
  preloadedState: JSON.parse(localStorage.getItem(persistConfig.key) || '{}'),
});
