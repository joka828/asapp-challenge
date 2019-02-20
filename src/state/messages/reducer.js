import uniqid from 'uniqid';

export const initialState = [];

// const mockMessage = id => ({
//   id,
//   text: 'asd',
//   time: new Date(),
//   user: 'Rob',
// });
//
// export const initialState = [
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
//   mockMessage(uniqid()),
// ];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const { text, user, time } = action;
      return [
        ...state,
        {
          id: uniqid(),
          text,
          user,
          time,
        },
      ];
    default:
      throw new Error('Invalid action type');
  }
};

export default reducer;
