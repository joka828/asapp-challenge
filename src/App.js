import React from 'react';
import ChatWindow from './containers/ChatWindow';
import Chat from './components/Chat';
import { MessagesContext } from './state/hook';

const App = () => (
  <MessagesContext>
    <Chat>
      <ChatWindow user="Rob" />
      <ChatWindow user="Laura" />
    </Chat>
  </MessagesContext>
);

export default App;
