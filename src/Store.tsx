import React from 'react';

type State = {};

type Action = { type: '' };

const initialState: State = {};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}

export const Store = React.createContext(null);

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
