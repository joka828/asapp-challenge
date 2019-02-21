import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from './reducer';

export const StoreContext = createContext({});

export const TypingContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (user) => {
    const userIndex = state.indexOf(user);
    if (userIndex < 0) {
      dispatch({
        type: 'UPDATE_USERS',
        users: state.concat(user),
      });
    }
  };

  const removeUser = (user) => {
    const userIndex = state.indexOf(user);
    if (userIndex >= 0) {
      dispatch({
        type: 'UPDATE_USERS',
        users: state.filter(s => s !== user),
      });
    }
  };

  return (
    <StoreContext.Provider
      value={[
        state,
        {
          addUser,
          removeUser,
        },
      ]}
    >
      {children}
    </StoreContext.Provider>
  );
};
TypingContext.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTyping = () => {
  const typing = useContext(StoreContext);
  return typing;
};

export default useTyping;
