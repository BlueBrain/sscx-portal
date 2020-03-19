import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

export type DownloadItem = {
  '@type': 'Resource' | 'File';
  resourceId: string;
  rev?: number;
  path?: string;
};

export type DownloadSate = {
  items: DownloadItem[];
};

const initialState: DownloadSate = {
  items: [],
};

/**
 * Actions
 */
export const addItem = createAction<DownloadItem>('download/add_item');
export const removeItem = createAction<DownloadItem>('download/remove_item');
export const clearItems = createAction('download/clear_items');

/**
 * Reducer
 */
export const downloadReducer = createReducer(initialState, {
  [addItem.type]: (state, action: PayloadAction<DownloadItem>) => ({
    ...state,
    items: state.items.find(
      item => JSON.stringify(item) === JSON.stringify(action.payload),
    )
      ? state.items
      : [...state.items, action.payload],
  }),
  [removeItem.type]: (state, action: PayloadAction<DownloadItem>) => ({
    ...state,
    items: state.items.filter(
      item => JSON.stringify(item) === JSON.stringify(action.payload),
    ),
  }),
  [clearItems.type]: state => ({
    ...state,
    items: [],
  }),
});
