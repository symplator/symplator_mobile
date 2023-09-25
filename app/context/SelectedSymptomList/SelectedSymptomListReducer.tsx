export const selectedSymptomsReducer = (
  state: SelectedSymptomList | undefined,
  action: SelectedSymptomListAction,
): SelectedSymptomList => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_DATA':
      return undefined;
    default:
      return state;
  }
};
