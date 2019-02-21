export const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      console.log('REDUCER', action.users);
      return action.users;
    default:
      throw new Error('Invalid action type');
  }
};

export default reducer;
