import { configureStore } from '@reduxjs/toolkit';
import { downloadReducer, DownloadSate } from './download';

export type State = {
  download: DownloadSate;
};

export default configureStore({ reducer: { download: downloadReducer } });
