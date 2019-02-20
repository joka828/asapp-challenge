import React from 'react';
import ChatWindow from './containers/ChatWindow';
import Chat from './components/Chat';
import { MessagesContext } from './state/messages/hook';
import { TypingContext } from './state/typing/hook';

const App = () => (
  <TypingContext>
    <MessagesContext>
      <Chat>
        <ChatWindow user="Rob" messagingUser="Laura" />
        <ChatWindow user="Laura" messagingUser="Rob" />
      </Chat>
    </MessagesContext>
  </TypingContext>
);

export default App;
