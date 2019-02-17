import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ChatBox from '../../components/ChatBox';
import MessageBox from '../../components/MessageBox';
import useMessages from '../../state/hook';

const ChatHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
`;

const ChatWindow = ({ user }) => {
  const [messages, messagesActions] = useMessages();
  const [inputValue, setInputValue] = useState('');

  const onInputEnter = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      setInputValue('');
      messagesActions.addMessage(e.target.value, user, new Date());
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <ChatBox>
      <ChatHeader>{user}</ChatHeader>
      {messages.map(message => (<MessageBox self={message.user === user}>{message.text}</MessageBox>))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value); }}
        onKeyDown={onInputEnter}
      />
    </ChatBox>
  );
};

export default ChatWindow;
