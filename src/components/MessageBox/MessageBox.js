import styled from 'styled-components';

const ChatBox = styled.div`
  display: flex;
  justify-content: flex-${({ self }) => (self ? 'end' : 'start')};
`;

export default ChatBox;
