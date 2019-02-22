import localStorage from 'localStorage';

export const initialState = [];

const saveToLocalStorage = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const {
        text, user, time, id,
      } = action;
      const newState = [
        ...state,
        {
          id,
          text,
          user,
          time,
        },
      ];
      saveToLocalStorage(newState);
      return newState;

    case 'LOAD_MESSAGES':
      return JSON.parse(localStorage.getItem('messages') || []);

    case 'CLEAR_MESSAGES':
      localStorage.clear();
      return [];

    default:
      throw new Error('Invalid action type');
  }
};

export default reducer;
