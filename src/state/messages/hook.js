import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import uniqid from 'uniqid';

import reducer, { initialState } from './reducer';

export const StoreContext = createContext({});

export const MessagesContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMessage = (text, user, time) => {
    dispatch({
      type: 'ADD_MESSAGE',
      id: uniqid(),
      text,
      user,
      time,
    });
  };

  const loadMessages = () => {
    dispatch({
      type: 'LOAD_MESSAGES',
    });
  };

  const clearMessages = () => {
    dispatch({
      type: 'CLEAR_MESSAGES',
    });
  };

  return (
    <StoreContext.Provider
      value={[
        state,
        {
          addMessage,
          loadMessages,
          clearMessages,
        },
      ]}
    >
      {children}
    </StoreContext.Provider>
  );
};
MessagesContext.propTypes = {
  children: PropTypes.node.isRequired,
};

const useMessages = () => {
  const messages = useContext(StoreContext);
  return messages;
};

export default useMessages;
