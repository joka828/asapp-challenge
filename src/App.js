import React from 'react';
import uniqid from 'uniqid';
import ChatWindow from './containers/ChatWindow';
import Chat from './components/Chat';
import { MessagesContext } from './state/messages/hook';
import { TypingContext } from './state/typing/hook';

const App = () => (
  <TypingContext>
    <MessagesContext>
      <Chat>
        <ChatWindow user="Rob" key={uniqid()} />
        <ChatWindow user="Laura" key={uniqid()} />
      </Chat>
    </MessagesContext>
  </TypingContext>
);

export default App;
