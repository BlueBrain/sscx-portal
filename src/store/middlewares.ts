import { Store, Dispatch, Action } from '@reduxjs/toolkit';

/**
 * Add more actions and their matching reducer names below.
 * One way this can be improved is by match wild cards, like:
 * 'download/*'
 **/
export const persistConfig = {
  key: 'sscx_portal',
  actions: {
    'download/add_item': ['download'],
    'download/remove_item': ['download'],
    'download/clear_items': ['download'],
  },
};

/**
 * A very simple persist middleware
 **/
export const persistMiddleware = (store: Store) => (next: Dispatch) => (
  action: Action,
) => {
  const result = next(action);
  const shouldPersist = persistConfig.actions[action.type];

  if (shouldPersist) {
    const appState = store.getState();
    shouldPersist.forEach(reducerName => {
      const stateToPersist = appState[reducerName];
      const prevSaveState = JSON.parse(
        localStorage.getItem(persistConfig.key) || '{}',
      );
      const nextSaveState = { ...prevSaveState, [reducerName]: stateToPersist };
      localStorage.setItem(persistConfig.key, JSON.stringify(nextSaveState));
    });
  }

  return result;
};
