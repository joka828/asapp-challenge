import React, { useEffect } from 'react';

import ChatWindow from '../ChatWindow';
import Chat from '../../components/Chat';

import useMessages from '../../state/messages/hook';

const ChatContainer = () => {
  const [, messagesActions] = useMessages();
  useEffect(() => {
    messagesActions.loadMessages();
  }, []);
  return (
    <Chat>
      <ChatWindow user="Rob" messagingUser="Laura" />
      <ChatWindow user="Laura" messagingUser="Rob" />
    </Chat>
  );
};

export default ChatContainer;
