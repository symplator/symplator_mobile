export const userSettingsReducer = (
  state: UserSettings,
  action: UserSettingsAction,
): UserSettings => {
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
