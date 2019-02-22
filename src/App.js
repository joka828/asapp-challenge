import React from 'react';
import Chat from './containers/Chat';
import { MessagesContext } from './state/messages/hook';
import { TypingContext } from './state/typing/hook';

const App = () => (
  <TypingContext>
    <MessagesContext>
      <Chat />
    </MessagesContext>
  </TypingContext>
);

export default App;
