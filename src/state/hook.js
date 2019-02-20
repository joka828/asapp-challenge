import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from './messages/reducer';

export const StoreContext = createContext({});

export const MessagesContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMessage = (text, user, time) => {
    dispatch({
      type: 'ADD_MESSAGE',
      text,
      user,
      time,
    });
  };

  return (
    <StoreContext.Provider
      value={[
        state,
        {
          addMessage,
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
