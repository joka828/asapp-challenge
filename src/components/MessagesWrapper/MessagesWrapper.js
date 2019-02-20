import styled from 'styled-components';

const MessagesWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  & >:last-child {
    margin-bottom: 8px
  }
`;

export default MessagesWrapper;
