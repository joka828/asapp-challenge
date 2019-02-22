import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

import useDebouncedCallback from 'use-debounce/lib/callback';

import ChatBox from '../../components/ChatBox';
import ChatHeader from '../../components/ChatHeader';
import MessageRow from '../../components/MessageRow';
import MessagesWrapper from '../../components/MessagesWrapper';

import useMessages from '../../state/messages/hook';
import useTyping from '../../state/typing/hook';

const NewMessagesNotification = styled.div`
  position: absolute;
  cursor: pointer;
  left:${({ left }) => (left || 0)}px;
  top: 32px;
  padding: 8px;
  transform: translate(-50%, 24px);
  background-color: #ffd0ad;
  border-radius: 8px;
  z-index: 1;
  animation: openNotification 0.4s;

  @keyframes openNotification {
    0% {transform: translate(-50%, 0); opacity 0;}
    100% {transform: translate(-50%, 24px)); opacity: 1;}
  }
`;

const ClearChatsButton = styled.button`
  background-color: #e57137;
  border: 0;
  border-radius: 12px;
  margin-right: 6px;
  outline: none;
  cursor: pointer;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  outline: none;
`;

const ChatWindow = ({ user, messagingUser }) => {
  const [messages, messagesActions] = useMessages();
  const [typingUsers, typingActions] = useTyping();
  const [inputValue, setInputValue] = useState('');
  const [newMessages, setNewMessages] = useState(0);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);


  const scrollToBottom = () => {
    const wrapper = document.querySelector(`.messages-wrapper__${user}`); // eslint-disable-line no-undef
    wrapper.scrollTop = wrapper.scrollHeight - wrapper.getBoundingClientRect().height;
    setNewMessages(0);
  };

  const stopTyping = useDebouncedCallback(() => {
    typingActions.removeUser(user);
  }, 700);

  const usersAreTyping = typingUsers.length > 1
    || (typingUsers.length === 1 && typingUsers[0] !== user);

  useEffect(() => {
    if (messages && messages.length) {
      if (messages[messages.length - 1].user === user || scrolledToBottom) {
        scrollToBottom();
      } else if (!scrolledToBottom) {
        setNewMessages(newMessages + 1);
      }
    }
  }, [messages.length]);

  useEffect(() => {
    if (usersAreTyping && scrolledToBottom) scrollToBottom();
  }, [typingUsers.length]);

  const onClearChatClick = () => {
    messagesActions.clearMessages();
  };

  const onMessagesScroll = (e) => {
    const { target } = e;
    if (target.scrollTop >= target.scrollHeight - target.getBoundingClientRect().height - 20) {
      // ReactDOM.unstable_batchedUpdates(() => {
      //   setScrolledToBottom(true);
      //   setNewMessages(0);
      // });
      setScrolledToBottom(true);
      setNewMessages(0);
    } else if (scrolledToBottom) {
      setScrolledToBottom(false);
    }
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      setInputValue('');
      messagesActions.addMessage(e.target.value, user, new Date().toISOString());
      typingActions.removeUser(user);
    } else if (e.key !== 'space') {
      typingActions.addUser(user);
      scrollToBottom();
    }
  };

  const onInputKeyUp = (e) => {
    if (e.key !== 'Enter') {
      stopTyping();
    }
  };

  const chatWindow = document.querySelector(`.chat-window__${user}`); // eslint-disable-line no-undef

  return (
    <ChatBox className={`chat-window__${user}`} key={user}>
      {!!newMessages && (
        <NewMessagesNotification
          onClick={scrollToBottom}
          left={chatWindow.getBoundingClientRect().width / 2}
        >
          {newMessages}
          {' '}
          new message
          {newMessages > 1 && 's'}
        </NewMessagesNotification>
      )}
      <ChatHeader>
        <ClearChatsButton onClick={onClearChatClick}>Clear Chats</ClearChatsButton>
        {messagingUser}
      </ChatHeader>
      <MessagesWrapper className={`messages-wrapper__${user}`} onScroll={onMessagesScroll}>
        {messages.map(
          message => (
            <MessageRow
              key={`${user}-${message.id}`}
              self={message.user === user}
              user={message.user}
              time={moment(message.time).calendar()}
            >
              {message.text}
            </MessageRow>
          ),
        )}
        {usersAreTyping && (<MessageRow key="typing" self={false}>Typing...</MessageRow>)}
      </MessagesWrapper>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        onKeyUp={onInputKeyUp}
        placeholder="Type your message..."
      />
    </ChatBox>
  );
};

ChatWindow.propTypes = {
  user: PropTypes.string.isRequired,
  messagingUser: PropTypes.string.isRequired,
};

export default ChatWindow;
