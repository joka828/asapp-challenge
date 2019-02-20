import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

import ChatBox from '../../components/ChatBox';
import MessageRow from '../../components/MessageRow';
import MessagesWrapper from '../../components/MessagesWrapper';

import useMessages from '../../state/messages/hook';
import useTyping from '../../state/typing/hook';

const NewMessagesNotification = styled.div`
  position: absolute;
  left:${({ left }) => (left || 0)}px;
  top: 32px;
  padding: 8px;
  transform: translate(-50%, 24px);
  background-color: #ffd0ad;
  border-radius: 8px;
  z-index: 1;
  animation: openMessage 0.4s;

  @keyframes openMessage {
    0% {transform: translate(-50%, 0); opacity 0;}
    100% {transform: translate(-50%, 24px)); opacity: 1;}
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  background-color: #ffd0ad;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  outline: none;
`;

const stopTyping = debounce(
  (user, removeTypingUser, forceUpdate) => { removeTypingUser(user); forceUpdate(); },
  1200,
  { trailing: true },
);


const ChatWindow = ({ user }) => {
  const [messages, messagesActions] = useMessages();
  const [typingUsers, typingActions] = useTyping();
  const [inputValue, setInputValue] = useState('');
  const [newMessages, setNewMessages] = useState(0);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [, forceUpdate] = useState();

  const onScroll = (e) => {
    const { target } = e;
    if (target.scrollTop === target.scrollHeight - target.getBoundingClientRect().height) {
      setScrolledToBottom(true);
      setNewMessages(0);
    } else if (scrolledToBottom) {
      setScrolledToBottom(false);
    }
  };

  useEffect(() => {
    // console.log('USE EFFECT', user, typingUsers);
  }, [typingUsers.length]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const wrapper = document.querySelector(`.messages-wrapper__${user}`);

    if (messages.length) {
      if (messages[messages.length - 1].user === user || scrolledToBottom) {
        console.log(user, 'KEEP SCROLLED', scrolledToBottom);
        wrapper.scrollTop = wrapper.scrollHeight - wrapper.getBoundingClientRect().height;
        setNewMessages(0);
      } else if (!scrolledToBottom) {
        setNewMessages(newMessages + 1);
        console.log('NEW MESSAGES', user, newMessages);
      }
    }
  }, [messages.length]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      setInputValue('');
      messagesActions.addMessage(e.target.value, user, new Date());
      typingActions.removeUser(user);
    } else {
      typingActions.addUser(user);
    }
  };

  const onKeyUp = (e) => {
    if (e.key !== 'Enter') stopTyping(user, typingActions.removeUser, forceUpdate);
    // typingActions.removeUser(user);
  };

  const usersAreTyping = typingUsers.length > 1
    || (typingUsers.length === 1 && typingUsers[0] !== user);

  // eslint-disable-next-line no-undef
  const chatWindow = document.querySelector(`.chat-window__${user}`);

  return (
    <ChatBox className={`chat-window__${user}`} key={user}>
      {!!newMessages && chatWindow && (
        <NewMessagesNotification left={chatWindow.getBoundingClientRect().width / 2}>
          {newMessages}
          {' '}
          new message
          {newMessages > 1 && 's'}
        </NewMessagesNotification>
      )}
      <ChatHeader>{user}</ChatHeader>
      <MessagesWrapper className={`messages-wrapper__${user}`} onScroll={onScroll}>
        {messages.map(
          message => (
            <MessageRow
              key={`${user}-${message.id}`}
              self={message.user === user}
            >
              {message.text}
            </MessageRow>
          ),
        )}
        {usersAreTyping && (<MessageRow key="typing" self={false}>Typing</MessageRow>)}
      </MessagesWrapper>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value); }}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        placeholder="Type your message..."
      />
    </ChatBox>
  );
};

export default ChatWindow;
