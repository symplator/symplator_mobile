export const reducer = (state: UserSettings, action: Action): UserSettings => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
