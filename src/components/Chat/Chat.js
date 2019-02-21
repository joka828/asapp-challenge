import styled from 'styled-components';

const Chat = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #726259;
  box-sizing: border-box;
  padding: 16px 0;

  @media (max-width: 768px) {
    flex-direction: column;

    & > :last-child {
      margin-top: 16px;
    }
  }
`;

export default Chat;
