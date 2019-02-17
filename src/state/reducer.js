export const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const { text, user, time } = action;
      return [
        ...state,
        { text, user, time },
      ];
    default:
      throw new Error('Invalid action type');
  }
};

export default reducer;
