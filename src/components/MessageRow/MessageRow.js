import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: flex-${({ self }) => (self ? 'end' : 'start')};
  margin: 8px 24px;
  margin-bottom: 0;

  animation: openMessage 0.3s;

  @keyframes openMessage {
    0% {transform: scaleY(0); opacity 0;}
    100% {transform: scaleY(1); opacity 1;}
  }
`;

const MessageBox = styled.span`
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ self }) => (self ? '#fccba6' : '#ffe4d1')};
`;

const MessageBoxLine = styled.span`
  display: block;
`;

const MessageAuthor = styled(MessageBoxLine)`
  font-size: 8px;
`;

const MessageText = styled(MessageBoxLine)`
  margin-top: 2px;
  word-break: break-all;
`;

const MessageTime = styled(MessageBoxLine)`
  font-size: 8px;
  color: #ea6507;
  margin-top: 3px;
`;

const MessageRow = ({
  children, self, user, time,
}) => (
  <Row self={self}>
    <MessageBox self={self}>
      <MessageAuthor>{self ? 'Me' : user}</MessageAuthor>
      <MessageText>{children}</MessageText>
      <MessageTime>{time}</MessageTime>
    </MessageBox>
  </Row>
);

export default MessageRow;
