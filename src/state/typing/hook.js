import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import reducer, { initialState } from './reducer';

export const StoreContext = createContext({});

export const TypingContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (user) => {
    const userIndex = state.indexOf(user);
    if (userIndex < 0) {
      const newUsersList = state;
      newUsersList.push(user);
      dispatch({
        type: 'UPDATE_USERS',
        users: newUsersList,
      });
    }
  };

  // const debouncedRemove = debounce((users) => {
  //   dispatch({
  //     type: 'UPDATE_USERS',
  //     users,
  //   });
  // }, 1500);

  const removeUser = (user) => {
    const userIndex = state.indexOf(user);
    if (userIndex >= 0) {
      const newUsersList = state;
      newUsersList.splice(userIndex, 1);
      // debouncedRemove(newUsersList);
      dispatch({
        type: 'UPDATE_USERS',
        users: newUsersList,
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
